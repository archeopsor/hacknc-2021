import requests, nltk
from nltk.corpus import wordnet as wn

# NLTK dependencies
nltk.download("wordnet")
nltk.download("punkt")
nltk.download("averaged_perceptron_tagger")
nltk.download("universal_tagset")
print(nltk.pos_tag(nltk.word_tokenize("The big dog jumped over the lazy cat"),tagset="universal"))