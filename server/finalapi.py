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

@app.route("/getverifiedSentimentDetails/",methods=['POST'])
def getverifiedSentimentDetails():
    try:
        data=request.json
        print("VSA: ",data)
        filterquery=getFilters(data,"user.screen_name")
        modelquery = urllib.parse.quote(data["query"])
        inurl = 'http://18.222.170.193:8983/solr/PROJ4_2/select?defType=edismax&stopwords=true&qf=tweet_text%20translated&q='+ modelquery +'&wt=json&fq=verified%3Atrue&fq=tweet_date%3A%5B2019-09-01T00%3A00%3A00Z%20TO%202019-09-15T00%3A00%3A00Z%7D&facet=on&rows=0'+ '&json.facet=%20{%20month_sentiment:{%20type:%20terms,%20field:%20daymonth_str,%20facet:{%20sentimentcount:%20{%20type%20:%20terms,%20field:%20sentiment%20}%20}%20}%20}' +filterquery
        print(inurl)
        data = urllib.request.urlopen(inurl).read()
        docs = JSON.loads(data.decode('utf-8'))['facets']['month_sentiment']['buckets']
        sentiments={}
        for i in docs:
            sentiments[i['val']]=[]
            month={}
            for j in i['sentimentcount']['buckets']:
                month[j['val']]=j['count']
            if('positive' not in month):
                month['positive']=0
            if('negative' not in month):
                month['negative']=0
            if('neutral' not in month):
                month['neutral']=0
            sentiments[i['val']].append(month)
            # seniments - array of maps(Month) if map --> i--> map of val
        sentimentsorderd=sentiments
        #        for i in dayorder:
        #            if(i in sentiments):
        #                sentimentsorderd[i]=sentiments[i]
        docs={}
        print(sentimentsorderd)
        docs['data']=sentimentsorderd
        docs= JSON.loads(JSON.dumps(docs))
        docs['status']=0
        print(docs)
        response = jsonify(docs)
        print(response)
        return response
    except:
        data=  {"status":500, "data":[]}
        response = jsonify(data)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@app.route("/getPOIDetails/",methods=['POST'])
def getPOIDetails():
    try:
        data=request.json
        print("POI DATA",data)
        filterquery=getFilters(data,"poi_name")
        modelquery = urllib.parse.quote(data["query"])
        inurl = 'http://18.222.170.193:8983/solr/PROJ4_2/select?defType=edismax&stopwords=true&qf=tweet_text%20translated&q='+ modelquery +'&wt=json&fq=tweet_date%3A%5B2019-09-01T00%3A00%3A00Z%20TO%202019-09-15T00%3A00%3A00Z%7D&json.facet=%20{%20poi_sentimentss:{%20type:%20terms,%20field:%20daymonth_str,%20facet:{%20sentimentcount:%20{%20type%20:%20terms,%20field:%20sentiment%20}%20}%20}%20}&facet=on&rows=0' +filterquery
        print(inurl)
        data = urllib.request.urlopen(inurl).read()
        poidocs= JSON.loads(data.decode('utf-8'))['facets']['poi_sentimentss']['buckets']
        poisentiment={}
        for i in poidocs:
            poisentiment[i['val']]=[]
            poi={}
            for j in i['sentimentcount']['buckets']:
                poi[j['val']]=j['count']
            if('positive' not in poi):
                poi['positive']=0
            if('negative' not in poi):
                poi['negative']=0
            if('neutral' not in poi):
                poi['neutral']=0
            poisentiment[i['val']].append(poi)
        docs={}
        docs['poidata']=poisentiment
        docs= JSON.loads(JSON.dumps(docs))
        docs['status']=0

        response = jsonify(docs)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        print(e)
        data=  {"status":500, "data":[]}
        response = jsonify(data)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response


@app.route("/getSentimentDetails/",methods=['POST'])
def getSentimentDetails():
    try:
        data=request.json
        print("GSA DATA",data)
        filterquery=getFilters(data,"user.screen_name")
        modelquery = urllib.parse.quote(data["query"])
        inurl = 'http://18.222.170.193:8983/solr/PROJ4_2/select?defType=edismax&stopwords=true&qf=tweet_text%20translated&q='+ modelquery +'&wt=json&fq=tweet_date%3A%5B2019-09-01T00%3A00%3A00Z%20TO%202019-09-15T00%3A00%3A00Z%7D&facet=on&rows=0'+ '&json.facet=%20{%20month_sentiment:{%20type:%20terms,%20field:%20daymonth_str,%20facet:{%20sentimentcount:%20{%20type%20:%20terms,%20field:%20sentiment%20}%20}%20}%20}&json.facet=%20{%20country_sentiment:{%20type:%20terms,%20field:%20country,%20facet:{%20sentimentcount:%20{%20type%20:%20terms,%20field:%20sentiment%20}%20}%20}%20}&json.facet=%20{%20poi_sentiment:{%20type:%20terms,%20field:%20poi_name,%20facet:{%20sentimentcount:%20{%20type%20:%20terms,%20field:%20sentiment%20}%20}%20}%20}&json.facet=%20{%20country_hashtags:{%20type:%20terms,%20field:%20country,%20facet:{%20hashtagcount:%20{%20type%20:%20terms,%20field:%20hashtags,%20limit%20:%2010%20}%20}%20}%20}' +filterquery
        print(inurl)
        data = urllib.request.urlopen(inurl).read()
        docs = JSON.loads(data.decode('utf-8'))['facets']['month_sentiment']['buckets']
        sentiments={}
        for i in docs:
            sentiments[i['val']]=[]
            month={}
            for j in i['sentimentcount']['buckets']:
                month[j['val']]=j['count']
            if('positive' not in month):
                month['positive']=0
            if('negative' not in month):
                month['negative']=0
            if('neutral' not in month):
                month['neutral']=0
            sentiments[i['val']].append(month)
        sentimentsorderd=sentiments
        countrydocs= JSON.loads(data.decode('utf-8'))['facets']['country_sentiment']['buckets']
        countrysentiment={}
        for i in countrydocs:
            countrysentiment[i['val']]=[]
            country={}
            for j in i['sentimentcount']['buckets']:
                country[j['val']]=j['count']
            if('positive' not in country):
                country['positive']=0
            if('negative' not in country):
                country['negative']=0
            if('neutral' not in country):
                country['neutral']=0
            countrysentiment[i['val']].append(country)
        poidocs= JSON.loads(data.decode('utf-8'))['facets']['poi_sentiment']['buckets']
        poisentiment={}
        for i in poidocs:
            poisentiment[i['val']]=[]
            poi={}
            for j in i['sentimentcount']['buckets']:
                poi[j['val']]=j['count']
            if('positive' not in poi):
                poi['positive']=0
            if('negative' not in poi):
                poi['negative']=0
            if('neutral' not in poi):
                poi['neutral']=0
            poisentiment[i['val']].append(poi)
        hashtagsdocs= JSON.loads(data.decode('utf-8'))['facets']['country_hashtags']['buckets']
        countryhashtags={}
        for i in hashtagsdocs:
            countryhashtags[i['val']]=[]
            hashtag={}
            for j in i['hashtagcount']['buckets']:
                hashtag[j['val']]=j['count']
            countryhashtags[i['val']].append(hashtag)
        if('usa' not in countryhashtags):
            countryhashtags['usa']=[]
        if('brazil' not in countryhashtags):
            countryhashtags['brazil']=[]
        if('india' not in countryhashtags):
            countryhashtags['india']=[]
        docs={}
        docs['monthdata']=sentimentsorderd
        docs['countrydata']=countrysentiment
        docs['poidata']=poisentiment
        docs['countryhashtags']=countryhashtags
        docs= JSON.loads(JSON.dumps(docs))
        docs['status']=0
        response = jsonify(docs)
        return response
    except:
        data=  {"status":500, "data":[]}
        response = jsonify(data)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response


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
        inurl='http://18.219.230.238:8983/solr/IRF21P1/select?q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000'+filterquery
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
        inurl = 'http://18.219.230.238:8983/solr/IRF21P1/select?defType=edismax&stopwords=true&qf=tweet_text%20&q='+ modelquery +'&+wt=json&facet.field=tweet_lang&facet.field=country&facet.field=hashtags&f.hashtags.facet.limit=10&facet.field=verified&f.tweet_lang.facet.limit=3&facet.field=topic_str&facet=on&rows=0' +filterquery
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
        inurl='http://18.219.230.238:8983/solr/IRF21P1/select?q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000'
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


def convert_pkl_to_json(r):
    i=1
    for j in range(r):
        print("::::::--------->>>>>>>>>",(i))
        with open("../new_data/POI/poi_"+str(i)+".pkl","rb") as input_file:
            new_dict = pickle.load(input_file)
            new_dict=new_dict.replace("False", '"False"')
            new_dict.to_json('../new_data/JSON/POI/poi_'+str(i)+'.json', orient='records', lines=True)
            i=i+1

def convert_pkl_to_json_keywords(r):
    i=1
    for j in range(r):
        print("::::::--------->>>>>>>>>",(i))
        with open("../data/keywords/keywords_"+str(i)+".pkl","rb") as input_file:
            new_dict = pickle.load(input_file)
            new_dict=new_dict.replace("False", '"False"')
            new_dict.to_json('../new_data/JSON/keywords/keywords_'+str(i)+'.json', orient='records', lines=True)
            i=i+1

####################### INDEXING FROM JSON DATA ################################

def read_config_kw(i):
    data = []
    with open("../new_data/JSON/POI/poi_"+str(i)+".json") as f:
        for line in f:
            data.append(JSON.loads(line))
    return data

def index_kw(indexer):
    for i in range(109):
        datas=read_config_kw(i+1)
        print("Processing POI ",i+1)
        for data in datas:
            data=getSentiment_kw(data)
            indexer.create_documents(data)

def getSentiment_kw(data):
    text=translate_kw(data)
    polarity = TextBlob(text).polarity
    subjectivity = TextBlob(text).subjectivity
    data['translated_text']=text
    data['polarity']=polarity
    data['subjectivity']=subjectivity
    data['isKeyWord']=True
    return data

def translate_kw(tweet):
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


def read_config_main(i):
    data = []
    with open("../new_data/JSON/POI/poi_"+str(i)+".json") as f:
        for line in f:
            data.append(JSON.loads(line))
    return data

def index_main(indexer):
    for i in range(4,31):
        datas=read_config_main(i+1)
        print("Processing POI ",i+1)
        for data in datas:
            data=getSentiment_main(data)
            indexer.create_documents(data)

def getSentiment_main(data):
    text=translate_main(data)
    polarity = TextBlob(text).polarity
    subjectivity = TextBlob(text).subjectivity
    data['translated_text']=text
    data['polarity']=polarity
    data['subjectivity']=subjectivity
    data['isKeyWord']=False
    return data

def translate_main(tweet):
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

def read_config_replies(i):
    data = []
    with open("../new_data/JSON/POI/poireplies_"+str(i)+".json") as f:
        for line in f:
            data.append(JSON.loads(line))
    return data

def index_replies(indexer):
    for i in range(25):
        datas=read_config_replies(i+1)
        print("Processing POI ",i+1)
        for data in datas:
            data=getSentiment_replies(data)
            indexer.create_documents(data)

def getSentiment_replies(data):
    text=translate_replies(data)
    polarity = TextBlob(text).polarity
    subjectivity = TextBlob(text).subjectivity
    data['reply_translated']=text
    data['reply_polarity']=polarity
    data['reply_subjectivity']=subjectivity
    data['isKeyWord']=False
    return data

def translate_replies(tweet):
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

 ################################

# @app.route("/allDocs/",methods=['POST'])
def getAllDocs(indexer):
    # try:
    # inurl='http://18.219.230.238:8983/solr/IRF21P1/select?q.op=OR&q=*%3A*&rows=69455'
    inurl='http://18.219.230.238:8983/solr/IRF21P1/select?q.op=OR&q=*%3A*&rows=15000'
    print(inurl)
    data = urllib.request.urlopen(inurl).read()
    res = JSON.loads(data.decode('utf-8'))
    datas=res['response']
    new_datas=getSentiment2(datas)
    print(type(datas))
    for data in new_datas:
        indexer.create_documents(data)

    # response = jsonify(datas)
    # return response
    # except:
    #     data=  {"status":500, "data":[]}
    #     response = jsonify(data)
    #     return response

if __name__ == "__main__":
    # convert_pkl_to_json_keywords(110)
    indexer = Indexer()
    index_main(indexer)
    #index_replies(indexer)
    #index_kw(indexer)

#TODO: Index keywords xD
