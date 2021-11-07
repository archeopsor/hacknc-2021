import requests, nltk, os, sys, json
from flask import Flask, jsonify, request, render_template
from time import sleep
from flask_cors import CORS, cross_origin
from nltk.corpus import wordnet as wn

# NLTK dependencies
nltk.download("wordnet")
nltk.download("punkt")
nltk.download("averaged_perceptron_tagger")
nltk.download("universal_tagset")

# -- AssemblyAPI -- 
# Global constants for AssemblyAI
ass_headers = {
   "authorization": '808f03ac7cc247948dfcebbc9d8bdf77',
   "content-type": "application/json"
}
ass_transcript_endpoint = "https://api.assemblyai.com/v2/transcript"
ass_upload_endpoint = 'https://api.assemblyai.com/v2/upload'

# get data from file
def read_file(filename):
   with open(os.path.join(sys.path[0], filename), 'rb') as _file:
       while True:
           data = _file.read(5242880)
           if not data:
               break
           yield data

# Submits an AssemblyAI API request given a file and returns the outputted text
def ass(filename):
    # upload file
    upload_response = requests.post(
    ass_upload_endpoint,
    headers=ass_headers, data=read_file(filename)
    )

    # send a request to transcribe the audio file
    transcript_request = {'audio_url': upload_response.json()['upload_url']}
    transcript_response = requests.post(ass_transcript_endpoint, json=transcript_request, headers=ass_headers)
    # set up polling
    polling_response = requests.get(ass_transcript_endpoint+"/"+transcript_response.json()['id'], headers=ass_headers)
    filename = transcript_response.json()['id'] + '.txt'
    # if our status isn’t complete, sleep and then poll again
    while polling_response.json()['status'] != 'completed':
        sleep(0.5)
        polling_response = requests.get(ass_transcript_endpoint+"/"+transcript_response.json()['id'], headers=ass_headers)
        # print("File is", polling_response.json()['status'])
    # with open(filename, 'w') as f:
        # f.write(polling_response.json()['text'])
    return polling_response.json()['text']

# -- NLTK Processing --

# Select words in text that match the given parts of speech
def select_tag(text, tags):
    tagged_words = nltk.pos_tag(nltk.word_tokenize(text))
    return [wn.morphy(i[0]) if wn.morphy(i[0])!=None else i[0] for i in tagged_words if i[1] in tags]
    
def rHypo(hypo,depth):
    if(depth==0):
        return hypo
    for h in hypo:
        for h2 in h.hyponyms():
            if(not h2 in hypo):
                hypo.append(h2)
    return rHypo(hypo,depth-1)
    
# Get list of semantic distances between a repository of source words and a given synset given the type and threshold distance
def check_dist(synset,source_words,type,threshold):
    dist = []
    for word in source_words:
        match=0
        for spec_set in wn.synsets(word, pos=type):
            if(synset.pos()!=spec_set.pos()):
                break
            sim = wn.lch_similarity(synset,spec_set)
            match = max(sim,match) if sim>threshold else match
        dist.append(match)
    return dist

def getDescribed(text,num=20,threshold=0.1):
    nouns = select_tag(text, ['NN','NNS'])
    desc = select_tag(text, ['JJ'])
    # Removes adjectives commonly found as nouns
    for n in nouns:
        if(len(wn.synsets(n,pos=wn.ADJ))>1):
            nouns.remove(n)
            desc.append(n)

    verbs = select_tag(text, ['VB','VBP','VBZ'])
    matches = []
    noun = nouns[0]
    nouns = nouns[1:]
    for hyponym in rHypo(wn.synsets(noun, pos=wn.NOUN),3):
        dist = []
        # Finds matching parts of speech in definitions
        for a_definition in select_tag(hyponym.definition(),['JJ']):
            for a_def_set in wn.synsets(a_definition, pos=wn.ADJ):
                dist+=check_dist(a_def_set,desc,wn.ADJ,threshold)
        for n_definition in select_tag(hyponym.definition(),['NN','NNS']):
            for n_def_set in wn.synsets(n_definition, pos=wn.NOUN):
                dist+=check_dist(n_def_set,[n for n in nouns if n!=noun],wn.NOUN,threshold)
        for v_definition in select_tag(hyponym.definition(),['VB','VBP','VBZ']):
            for v_def_set in wn.synsets(v_definition, pos=wn.VERB):
                dist+=check_dist(v_def_set,verbs,wn.VERB,threshold)
        if(dist!=[]):
            avg = sum(dist)/len(dist)
            if(avg>0.1):
                matches.append((hyponym.lemma_names()[0], avg))
    return sorted(matches,key=lambda a: a[1],reverse=True)[:num]

def normalize(tuples):
    if(len(tuples)==0):
        return {}
    norm = 100/tuples[0][1]
    d = dict(tuples)
    for k in d:
        d[k]=(d[k]*norm)//1
    return d

# Flask app stuffs
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/process', methods=['GET','POST'])
@cross_origin()
def process():
    # POST request
    if request.method == 'POST':
        print(request.form['text'])
        return jsonify(normalize(getDescribed(request.form['text'])))
app.run(debug=True)