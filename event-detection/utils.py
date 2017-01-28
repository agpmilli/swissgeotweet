import numpy as np
import pandas as pd

from nltk.corpus import stopwords
import string
import re
from ast import literal_eval

"""
Check if the longitude and latitude are set. 
If not, check for the place latitude and longitude and replace.
If not, drop the row
"""
def replace_position(row):
    if(np.isnan(row['longitude'])) and (not np.isnan(row['placeLongitude'])):
        row['longitude'] = row['placeLongitude']
    if(not(np.isnan(row['longitude'])) and np.isnan(row['latitude']) and (not np.isnan(row['placeLatitude']))):
        row['latitude'] = row['placeLatitude']
    return row

"""
Check if there are any words starting with # in the 'text' field.
if it is the case, we add it to a list that we return at the end
"""
def find_hashtags(texts):
    hashtags = []
    for i in range(0,len(texts)):
        if texts[i][0] in '#':
            hashtags.append(texts[i][1:])
    return hashtags

"""
Check if there are any words starting with # in the 'text' field.
if it is the case, replace it with the word without #
"""
def remove_hashtags(texts):
    nothashtags = []
    for i in range(0,len(texts)):
        if texts[i][0] not in '#':
            nothashtags.append(texts[i])
        else:
            nothashtags.append(texts[i][1:])
    return nothashtags

"""
Check the number of occurences of hashtags in a certain cluster.
Return a dictionnary containing the hashtags and the number of occurences.
"""
def dictionnary_from_hashtags(df, ncluster):
    d = {}
    for hashtags_ in df[df['cluster']==ncluster].hashtags:
        hashtags_ = literal_eval(hashtags_)
        if(hashtags_!=[]):
            for hashtag in hashtags_:
                if hashtag in d:
                    d[hashtag]+=1
                else:
                    d[hashtag]=1

    return d

"""
Check the number of occurences of words in a certain cluster.
Return a dictionnary containing the words and the number of occurences.
"""
def dictionnary_from_keywords(df, ncluster):
    d = {}
    for text_ in df[df['cluster']==ncluster].text:
        text_ = literal_eval(text_)
        for word in text_:
                if word in d:
                    d[word]+=1
                else:
                    d[word]=1
    return d

"""
Given a dictionnary, a fraction and a number of tweet it tests if the number of occurences of each key is larger than
the number of tweet * the fraction and return the dictionnary containing the elements that passed the check.
"""
def useful_(d, frac, ntweets):
    d1 = {}
    for elem in d:
        if(d[elem]>ntweets*frac):
            d1[elem] = d[elem]
    return d1


"""
From a cluster, we get a position by averaging the latitude/longitude of the given tweets
"""
def find_position(df, ncluster, ntweets):
    final_long = 0
    final_lat = 0
    for long in df[df['cluster']==ncluster].longitude:
        final_long += long
    for lat in df[df['cluster']==ncluster].latitude:
        final_lat += lat
    
    final_long /= ntweets
    final_lat /= ntweets
        
    return [final_long, final_lat]