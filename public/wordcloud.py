import requests, nltk, os, sys
from time import sleep
from nltk.corpus import wordnet as wn

# NLTK dependencies
nltk.download("wordnet")
nltk.download("punkt")
nltk.download("averaged_perceptron_tagger")
nltk.download("universal_tagset")

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

def tts(filename):

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