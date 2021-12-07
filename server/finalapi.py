    # -*- coding: utf-8 -*-
import textblob as tb
from nltk.corpus import stopwords
import os
import re
import string
try:
    import json as JSON
except ImportError:
    import simplejson as JSON

import urllib.request
import tweepy
from flask_cors import CORS
from flask import Flask,request,jsonify
from datetime import datetime, timedelta
from io import StringIO
from pandas import DataFrame
import pickle
import pandas as pd
from indexer import Indexer
from textblob import TextBlob
import numpy as np
from googletrans import Translator

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

CORS(app, resources=r'*', headers='Content-Type')

def getFilters(data,user):
    finalquerystr=""
    nlen=len(data["languages"])
    if(nlen!=0):
        langfilter="tweet_lang:( "
        for i in range(0,nlen):
            if(i!=nlen-1):
                langfilter+= data["languages"][i] + " or "
            else:
                langfilter+= data["languages"][i] + " )"
        finalquerystr+="&fq="+ urllib.parse.quote(langfilter)
    countrylen=len(data["countries"])
    if(countrylen!=0):
        countryfilter="country:( "
        for i in range(0,countrylen):
            if(i!=countrylen-1):
                countryfilter+= data["countries"][i] + " or "
            else:
                countryfilter+= data["countries"][i] + " )"
        finalquerystr+="&fq=" + urllib.parse.quote(countryfilter)
    hashtaglen=len(data["hashtags"])
    if(hashtaglen!=0):
        hashtagfilter="hashtags:( "
        for i in range(0,hashtaglen):
            if(i!=hashtaglen-1):
                hashtagfilter+= data["hashtags"][i] + " or "
            else:
                hashtagfilter+= data["hashtags"][i] + " )"
        finalquerystr+="&fq=" + urllib.parse.quote(hashtagfilter)
    
    indialen=len(data['IndiaTopics'])
    usalen=len(data['USATopics'])
    mexicolen=len(data['MexicoTopics'])
    if(not(indialen == 0 and usalen ==0 and mexicolen==0)):
        print("4")
        topicfilter="topic:("
        for i in range(indialen):
  
            topicfilter+= data['IndiaTopics'][i]+ " or"
        for i in range(usalen):
           
            topicfilter+= data['USATopics'][i]+ " or"
        for i in range(mexicolen):
            
            topicfilter+= data['MexicoTopics'][i]+ " or"
        topicfilter+= ")"
        finalquerystr+="&fq=" + urllib.parse.quote(topicfilter)
    
    poilen=len(data["POIUsername"])
    if(poilen!=0):
        pofilter=user+":( "
        for i in range(0,poilen):
            if(i!=poilen-1):
                pofilter+= data["POIUsername"][i] + " or "
            else:
                pofilter+= data["POIUsername"][i] + " )"
        finalquerystr+="&fq=" + urllib.parse.quote(pofilter)
    sentimentlen=len(data["sentiments"])
    if(sentimentlen!=0):
        sentimentfilter="sentiment:( "
        for i in range(0,sentimentlen):
            if(i!=sentimentlen-1):
                sentimentfilter+= data["sentiments"][i] + " or "
            else:
                sentimentfilter+= data["sentiments"][i] + " )"
        finalquerystr+="&fq=" + urllib.parse.quote(sentimentfilter)
    print(finalquerystr)
    return (finalquerystr)

@app.route("/getDetails/" ,methods=['POST'])
def getDetails():
    try:
        print(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
        print(request)
        print (request.json )
        data=request.json
        print("getting filter query")
        filterquery=getFilters(data,"user.screen_name")
        if(data["query"][0]=="#"):
           modelquery=data["query"].strip()[0]

        modelquery = urllib.parse.quote(data["query"])
        inurl='http://3.144.112.230:8983/solr/IRF21P1/select?q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000'+filterquery
        print(inurl)
        data = urllib.request.urlopen(inurl).read()
        res = JSON.loads(data.decode('utf-8'))
        docs=res['response']
        response = jsonify(docs)
        print(response)
        return response
    except Exception as e:
        print(e)
        data=  {"status":500, "data":[]}
        response = jsonify(data)
        return response

@app.route("/getFilterDetails/",methods=['POST'])
def getFilterDetails():
    try:
        data=request.json
        print("FILTER IN ADATA ",data)
        filterquery=getFilters(data,"poi_name")
        print("------_>>>>>> ",filterquery)
        modelquery = urllib.parse.quote(data["query"])
        inurl = 'http://3.144.112.230:8983/solr/IRF21P1/select?defType=edismax&stopwords=true&qf=tweet_text%20&q='+ modelquery +'&+wt=json&facet.field=tweet_lang&facet.field=country&facet.field=hashtags&f.hashtags.facet.limit=10&facet.field=verified&f.tweet_lang.facet.limit=3&facet.field=topic_str&facet=on&rows=0' +filterquery
        print(inurl)
        data = urllib.request.urlopen(inurl).read()
        docs = JSON.loads(data.decode('utf-8'))['facet_counts']['facet_fields']
        docs["status"]= JSON.loads(data.decode('utf-8'))['responseHeader']['status']
        response = jsonify(docs)
        print(dir(response))
        return response
    except:
        data=  {"status":500, "data":[]}
        response = jsonify(data)
        return response


@app.route("/getSentimentDetailsNew/",methods=['POST'])
def getSentimentDetails_new():
    try:
        print(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
        print(request)
        print (request.json )
        data=request.json
        print("getting filter query")
        filterquery=getFilters(data,"user.screen_name")
        if(data["query"][0]=="#"):
            print("Enter")
            modelquery=data["query"].strip()[0]
        modelquery = urllib.parse.quote(data["query"])
        inurl='http://3.144.112.230:8983/solr/IRF21P1/select?q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000'
        print(inurl)
        data = urllib.request.urlopen(inurl).read()
        res = JSON.loads(data.decode('utf-8'))
        docs=res['response']
        response = jsonify(docs)
        datas=getSentiment(response.json)
        print("datas type: ",type(datas))
        print("Resp dir: ",dir(response))
        response.set_data(str(datas))
        return response
    except Exception as e:
        print(e)
        data=  {"status":500, "data":[]}
        response = jsonify(data)
        return response

def getSentiment(datas):
    polarity_data=[]
    subjectivity_data=[]
    for data in datas['docs']:
        text=translate(data)
        polarity = TextBlob(text).polarity
        subjectivity = TextBlob(text).subjectivity
        polarity_data.append(polarity)
        subjectivity_data.append(subjectivity)
        data['translated_text']=text
        data['polarity']=polarity
        data['subjectivity']=subjectivity
    return datas

def translate(tweet):
    tr = Translator()
    lang = tweet['tweet_lang']
    text = tweet['tweet_text']
    if lang != 'en':
        try:
            translated_text = tr.translate(text, dest = 'en').text
            text = translated_text
        except:
            print('Not Translated')
    return text

def remove_noise(text, stop_words = ()):
    cleaned_text = ''

    for token, tag in text.pos_tags:
        token = re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", token)
        #token = re.sub("(@[A-Za-z0-9_]+)","", token)

        if tag.startswith("NN"):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'

        token = tb.Word(token).lemmatize(pos)

        if len(token) > 0 and token not in string.punctuation and token.lower() not in stop_words:
            cleaned_text += token.lower().strip() + ' '
    return tb.TextBlob(cleaned_text.strip())

#######################
def run_keywords():
    i=1
    for j in range(80):
        with open("/Users/surajbodapati/Desktop/University_at_Buffalo/SEM1/Information_Retreival/Assignments/p4/CSE-535-Project-4--master/data/keywords/keywords_"+str(i)+".pkl","rb") as input_file:
            new_dict = pickle.load(input_file)
            new_dict=new_dict.replace("False", '"False"')
            new_dict.to_json('../data/JSON/keywords/keywords_'+str(i)+'.json', orient='records', lines=True)
            i=i+1


def convert_pkl_to_json(i):
    for j in range(1):
        print("::::::--------->>>>>>>>>",(i))
        with open("../data/new_data/poi_"+str(i)+".pkl","rb") as input_file:
            new_dict = pickle.load(input_file)
            i=i+1
            # data=JSON.dumps(JSON.loads(new_dict.to_json(orient="records")))
            new_dict=new_dict.replace("False", '"False"')
            new_dict.to_json('../data/new_data/poi_'+str(i)+'.json', orient='records', lines=True)

def read_config(i):
    data = []
    with open("../data/JSON/POI/poi"+str(i)+".json") as f:
        for line in f:
            data.append(JSON.loads(line))
    return data

def index_poi(indexer):
    for i in range(40):
        datas=read_config(i)
        print("Processing POI ",i)
        for data in datas:
            print("Data: ", data)
            tweets = api.search(q=data['id'])
            for tweet in tweets:
                print(tweet._json)
                data['screen_name'] = tweet._json['user']['screen_name']
            indexer.create_documents(data) #data or tweet ??

def getSentiment2(datas):
    polarity_data=[]
    subjectivity_data=[]
    for data in datas['docs']:
        text=translate(data)
        polarity = TextBlob(text).polarity
        subjectivity = TextBlob(text).subjectivity
        polarity_data.append(polarity)
        subjectivity_data.append(subjectivity)
        data['translated_text']=text
        data['polarity']=polarity
        data['subjectivity']=subjectivity
    return datas

def translate2(tweet):
    tr = Translator()
    lang = tweet['tweet_lang']
    text = tweet['tweet_text']
    if lang != 'en':
        try:
            translated_text = tr.translate(text, dest = 'en').text
            text = translated_text
        except:
            print('Not Translated')
    return text

# @app.route("/allDocs/",methods=['POST'])
def getAllDocs(indexer):
    # try:
    inurl='http://3.144.112.230:8983/solr/IRF21P1/select?q.op=OR&q=*%3A*'
    print(inurl)
    data = urllib.request.urlopen(inurl).read()
    res = JSON.loads(data.decode('utf-8'))
    datas=res['response']
    datas=getSentiment2(datas)
    print(type(datas))
    indexer.create_documents(datas)
    # response = jsonify(datas)
    # return response
    # except:
    #     data=  {"status":500, "data":[]}
    #     response = jsonify(data)
    #     return response

if __name__ == "__main__":
    # convert_pkl_to_json(40)
    indexer = Indexer()
    # index_poi(indexer)
    getAllDocs(indexer)
    app.run(host = "0.0.0.0",port = 9999)
