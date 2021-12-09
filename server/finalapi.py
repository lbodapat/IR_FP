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

@app.route("/getFilterDetails/",methods=['POST'])
def getFilterDetails():
    try:
        data=request.json
        print("FILTER IN ADATA ",data)
        filterquery=getFilters(data,"poi_name")
        print("------_>>>>>> ",filterquery)
        modelquery = urllib.parse.quote(data["query"])
        inurl = 'http://18.217.102.217:8983/solr/IRF21P4_f2/select?defType=edismax&stopwords=true&qf=tweet_text%20&q='+ modelquery +'&+wt=json&facet.field=tweet_lang&facet.field=country&facet.field=hashtags&f.hashtags.facet.limit=10&facet.field=verified&f.tweet_lang.facet.limit=3&facet.field=topic_str&facet=on&rows=0' +filterquery
        print(inurl)
        data = urllib.request.urlopen(inurl).read()
        docs = JSON.loads(data.decode('utf-8'))['facet_counts']['facet_fields']
        docs["status"]= JSON.loads(data.decode('utf-8'))['responseHeader']['status']
        docs['metrics']=sentimentMethodPoi(request)
        # docs['poi_sentiment_replies']=sentimentMethodPoiReplies(request)
        response = jsonify(docs)
        return response
    except:
        data=  {"status":500, "data":[]}
        response = jsonify(data)
        return response

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
        inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000'+filterquery
        print(inurl)
        data = urllib.request.urlopen(inurl).read()
        res = JSON.loads(data.decode('utf-8'))
        docs=res['response']
        docs['vaccines_sentiment']=sentimentMethodVaccines(request)
        docs['subjectivity']=getSubjectivity(request)
        response = jsonify(docs)
        print(type(response))
        return response
    except Exception as e:
        print(e)
        data=  {"status":500, "data":[]}
        response = jsonify(data)
        return response

def sentimentMethodPoi(request):
    print(request)
    print (request.json )
    data=request.json
    print("getting filter query")
    filterquery=getFilters(data,"user.screen_name")
    if(data["query"][0]=="#"):
        modelquery=data["query"].strip()[0]
    modelquery = urllib.parse.quote(data["query"])

    neg_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:false&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.polarity.facet.range.start=-1&facet.range.end=-0.2&facet.range.gap=1&facet.range=polarity&f.reply_polarity.facet.range.start=-1&facet.range.end=-0.2&facet.range.gap=1&facet.range=reply_polarity&facet.field=country&facet.field=tweet_lang'+filterquery
    print("NEG URL",neg_inurl)
    neg_data = urllib.request.urlopen(neg_inurl).read()
    neg_res = JSON.loads(neg_data.decode('utf-8'))
    neg_senti_count =neg_res['facet_counts']['facet_ranges']['polarity']['counts'][1]
    neg_senti_count_rep =neg_res['facet_counts']['facet_ranges']['reply_polarity']['counts'][1]
    country_metrics =neg_res['facet_counts']['facet_fields']['country']
    lang_metrics =neg_res['facet_counts']['facet_fields']['tweet_lang']
    keys=[]
    values=[]
    i=0
    while(i<len(country_metrics)):
        keys.append(country_metrics[i])
        values.append(country_metrics[i+1])
        i+=2

    country_metrics = dict(zip(keys, values))

    keys2=[]
    values2=[]
    i=0
    while(i<len(lang_metrics)):
        keys2.append(lang_metrics[i])
        values2.append(lang_metrics[i+1])
        i+=2
        # if(i==6):
        #     break
    lang_metrics = dict(zip(keys2, values2))

    neut_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:false&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.polarity.facet.range.start=-0.2&facet.range.end=0.2&facet.range.gap=1&facet.range=polarity&f.reply_polarity.facet.range.start=-0.2&facet.range.end=0.2&facet.range.gap=1&facet.range=reply_polarity'+filterquery
    print("Neut URL",neut_inurl)
    neut_data = urllib.request.urlopen(neut_inurl).read()
    neut_res = JSON.loads(neut_data.decode('utf-8'))
    neut_senti_count=neut_res['facet_counts']['facet_ranges']['polarity']['counts'][1]
    neut_senti_count_rep=neut_res['facet_counts']['facet_ranges']['reply_polarity']['counts'][1]

    pos_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:false&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.polarity.facet.range.start=0.2&facet.range.end=1&facet.range.gap=1&facet.range=polarity&f.reply_polarity.facet.range.start=0.2&facet.range.end=1&facet.range.gap=1&facet.range=reply_polarity'+filterquery
    print("Pos URL",pos_inurl)
    pos_data = urllib.request.urlopen(pos_inurl).read()
    pos_res = JSON.loads(pos_data.decode('utf-8'))
    pos_senti_count=pos_res['facet_counts']['facet_ranges']['polarity']['counts'][1]
    pos_senti_count_rep=pos_res['facet_counts']['facet_ranges']['reply_polarity']['counts'][1]

    response_poi = {}
    response_poi['negative_sentiment_count']=neg_senti_count
    response_poi['neutral_sentiment_count']=neut_senti_count
    response_poi['pos_sentiment_count']=pos_senti_count

    response_poi_replies = {}
    response_poi_replies['negative_sentiment_count']=neg_senti_count_rep
    response_poi_replies['neutral_sentiment_count']=neut_senti_count_rep
    response_poi_replies['pos_sentiment_count']=pos_senti_count_rep

    response={}
    response['poi_sentiment']=response_poi
    response['poi_sentiment_replies']=response_poi_replies
    response['country_metrics']=country_metrics
    response['lang_metrics']=lang_metrics

    print(response)
    return response

def sentimentMethodVaccines(request):
    print(request)
    print (request.json )
    data=request.json
    print("getting filter query")
    filterquery=getFilters(data,"user.screen_name")
    if(data["query"][0]=="#"):
        modelquery=data["query"].strip()[0]
    modelquery = urllib.parse.quote(data["query"])

    neg_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:true&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.polarity.facet.range.start=-1&facet.range.end=0.01&facet.range.gap=1&facet.range=polarity'+filterquery
    print("NEG URL",neg_inurl)
    neg_data = urllib.request.urlopen(neg_inurl).read()
    neg_res = JSON.loads(neg_data.decode('utf-8'))
    neg_senti_count=neg_res['facet_counts']['facet_ranges']['polarity']['counts'][1]

    neut_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:true&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.polarity.facet.range.start=0.01&facet.range.end=0.02&facet.range.gap=1&facet.range=polarity'+filterquery
    print("Neut URL",neut_inurl)
    neut_data = urllib.request.urlopen(neut_inurl).read()
    neut_res = JSON.loads(neut_data.decode('utf-8'))
    neut_senti_count=neut_res['facet_counts']['facet_ranges']['polarity']['counts'][1]

    pos_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:true&q.&op=ORq=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.polarity.facet.range.start=0.02&facet.range.end=1&facet.range.gap=1&facet.range=polarity'+filterquery
    print("Pos URL",pos_inurl)
    pos_data = urllib.request.urlopen(pos_inurl).read()
    pos_res = JSON.loads(pos_data.decode('utf-8'))
    pos_senti_count=pos_res['facet_counts']['facet_ranges']['polarity']['counts'][1]

    response = {}
    response['negative_sentiment_count']=neg_senti_count
    response['neutral_sentiment_count']=pos_senti_count
    response['pos_sentiment_count']=neut_senti_count
    # print(response)
    return response

def getSubjectivity(request):
    print(request)
    print (request.json )
    data=request.json
    print("getting filter query")
    filterquery=getFilters(data,"user.screen_name")
    if(data["query"][0]=="#"):
        modelquery=data["query"].strip()[0]
    modelquery = urllib.parse.quote(data["query"])

    op_inurl_poi='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:false&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.subjectivity.facet.range.start=0.496&facet.range.end=1&facet.range.gap=0.6&facet.range=subjectivity&f.reply_subjectivity.facet.range.start=0.496&facet.range.end=1&facet.range.gap=0.6&facet.range=reply_subjectivity'+filterquery
    op_data = urllib.request.urlopen(op_inurl_poi).read()
    op_res = JSON.loads(op_data.decode('utf-8'))
    op_count=op_res['facet_counts']['facet_ranges']['subjectivity']['counts'][1]
    op_count_reply=op_res['facet_counts']['facet_ranges']['reply_subjectivity']['counts'][1]

    fact_inurl_poi='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:false&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.subjectivity.facet.range.start=0&facet.range.end=0.495&facet.range.gap=0.5&facet.range=subjectivity&f.reply_subjectivity.facet.range.start=0&facet.range.end=0.495&facet.range.gap=0.6&facet.range=reply_subjectivity'+filterquery
    print("JSJJ ",fact_inurl_poi)
    fact_data = urllib.request.urlopen(fact_inurl_poi).read()
    fact_res = JSON.loads(fact_data.decode('utf-8'))
    fact_count=fact_res['facet_counts']['facet_ranges']['subjectivity']['counts'][1]
    print(fact_count)
    fact_count_reply=fact_res['facet_counts']['facet_ranges']['reply_subjectivity']['counts'][1]
    print(fact_count_reply)


    op_inurl_vac='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:true&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.subjectivity.facet.range.start=0.496&facet.range.end=1&facet.range.gap=0.6&facet.range=subjectivity'+filterquery
    op_data_vac = urllib.request.urlopen(op_inurl_vac).read()
    op_res_vac = JSON.loads(op_data_vac.decode('utf-8'))
    op_count_vac=op_res_vac['facet_counts']['facet_ranges']['subjectivity']['counts'][1]

    fact_inurl_vac='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:true&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.subjectivity.facet.range.start=0&facet.range.end=0.495&facet.range.gap=0.5&facet.range=subjectivity'+filterquery
    print("JSJJ ",fact_inurl_vac)
    fact_data_vac = urllib.request.urlopen(fact_inurl_vac).read()
    fact_res_vac = JSON.loads(fact_data_vac.decode('utf-8'))
    fact_count_vac=fact_res_vac['facet_counts']['facet_ranges']['subjectivity']['counts'][1]

    response = {}
    response['opinions_poi']=op_count
    response['facts_poi']=fact_count
    response['opinions_poi_reply']=op_count_reply
    response['facts_poi_reply']=fact_count_reply
    response['opinions_vac']=op_count_vac
    response['facts_vac']=fact_count_vac
    return response


def sentimentMethodPoiReplies(request):
    print(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
    print(request)
    print (request.json )
    data=request.json
    print("getting filter query")
    filterquery=getFilters(data,"user.screen_name")
    if(data["query"][0]=="#"):
        modelquery=data["query"].strip()[0]
    modelquery = urllib.parse.quote(data["query"])

    neg_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?q.op=OR&q=reply_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.reply_polarity.facet.range.start=-1&facet.range.end=-0.2&facet.range.gap=1&facet.range=reply_polarity'+filterquery
    print("NEG URL",neg_inurl)
    neg_data = urllib.request.urlopen(neg_inurl).read()
    neg_res = JSON.loads(neg_data.decode('utf-8'))
    neg_senti_count=neg_res['facet_counts']['facet_ranges']['reply_polarity']['counts'][1]
    print(neg_senti_count)
    neut_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?q.op=OR&q=reply_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.reply_polarity.facet.range.start=-0.2&facet.range.end=0.2&facet.range.gap=1&facet.range=reply_polarity'+filterquery
    print("Neut URL",neut_inurl)
    neut_data = urllib.request.urlopen(neut_inurl).read()
    neut_res = JSON.loads(neut_data.decode('utf-8'))
    neut_senti_count=neut_res['facet_counts']['facet_ranges']['reply_polarity']['counts'][1]
    print(neut_senti_count)
    pos_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?q.op=OR&q=reply_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.reply_polarity.facet.range.start=0.2&facet.range.end=1&facet.range.gap=1&facet.range=reply_polarity'+filterquery
    print("Pos URL",pos_inurl)
    pos_data = urllib.request.urlopen(pos_inurl).read()
    pos_res = JSON.loads(pos_data.decode('utf-8'))
    pos_senti_count=pos_res['facet_counts']['facet_ranges']['reply_polarity']['counts'][1]
    print(pos_senti_count)
    response = {}
    response['negative_sentiment_count']=neg_senti_count
    response['neutral_sentiment_count']=neut_senti_count
    response['pos_sentiment_count']=pos_senti_count
    return response


@app.route("/getSentimentDetails/" ,methods=['POST'])
def sentimentPoi():
    print("snenti")
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

        neg_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:false&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.polarity.facet.range.start=-1&facet.range.end=-0.2&facet.range.gap=1&facet.range=polarity'+filterquery
        print("NEG URL",neg_inurl)
        neg_data = urllib.request.urlopen(neg_inurl).read()
        neg_res = JSON.loads(neg_data.decode('utf-8'))
        neg_senti_count=neg_res['facet_counts']['facet_ranges']['polarity']['counts'][1]

        neut_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:false&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.polarity.facet.range.start=-0.2&facet.range.end=0.2&facet.range.gap=1&facet.range=polarity'+filterquery
        print("Neut URL",neut_inurl)
        neut_data = urllib.request.urlopen(neut_inurl).read()
        neut_res = JSON.loads(neut_data.decode('utf-8'))
        neut_senti_count=neut_res['facet_counts']['facet_ranges']['polarity']['counts'][1]

        pos_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:false&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.polarity.facet.range.start=0.2&facet.range.end=1&facet.range.gap=1&facet.range=polarity'+filterquery
        print("Pos URL",pos_inurl)
        pos_data = urllib.request.urlopen(pos_inurl).read()
        pos_res = JSON.loads(pos_data.decode('utf-8'))
        pos_senti_count=pos_res['facet_counts']['facet_ranges']['polarity']['counts'][1]

        response = {}
        response['negative_sentiment_count']=neg_senti_count
        response['neutral_sentiment_count']=neut_senti_count
        response['pos_sentiment_count']=pos_senti_count
        print(response)
        return response
    except Exception as e:
        print(e)
        data=  {"status":500, "data":[]}
        response = jsonify(data)
        return response

@app.route("/sentimentVaccine/" ,methods=['POST'])
def sentimentVaccine():
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

        neg_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:true&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.polarity.facet.range.start=-1&facet.range.end=-0.2&facet.range.gap=1&facet.range=polarity'+filterquery
        print("NEG URL",neg_inurl)
        neg_data = urllib.request.urlopen(neg_inurl).read()
        neg_res = JSON.loads(neg_data.decode('utf-8'))
        neg_senti_count=neg_res['facet_counts']['facet_ranges']['polarity']['counts'][1]

        neut_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:true&q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.polarity.facet.range.start=-0.2&facet.range.end=0.2&facet.range.gap=1&facet.range=polarity'+filterquery
        print("Neut URL",neut_inurl)
        neut_data = urllib.request.urlopen(neut_inurl).read()
        neut_res = JSON.loads(neut_data.decode('utf-8'))
        neut_senti_count=neut_res['facet_counts']['facet_ranges']['polarity']['counts'][1]

        pos_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?fq=isKeyWord:true&q.&op=ORq=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.polarity.facet.range.start=0.2&facet.range.end=1&facet.range.gap=1&facet.range=polarity'+filterquery
        print("Pos URL",pos_inurl)
        pos_data = urllib.request.urlopen(pos_inurl).read()
        pos_res = JSON.loads(pos_data.decode('utf-8'))
        pos_senti_count=pos_res['facet_counts']['facet_ranges']['polarity']['counts'][1]

        response = {}
        response['negative_sentiment_count']=neg_senti_count
        response['neutral_sentiment_count']=neut_senti_count
        response['pos_sentiment_count']=pos_senti_count
        # print(response)
        return response
    except Exception as e:
        print(e)
        data=  {"status":500, "data":[]}
        response = jsonify(data)
        return response

@app.route("/sentimentReplies/" ,methods=['POST'])
def sentimentReplies():
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

        neg_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?q.op=OR&q=reply_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.reply_polarity.facet.range.start=-1&facet.range.end=-0.2&facet.range.gap=1&facet.range=reply_polarity'+filterquery
        print("NEG URL",neg_inurl)
        neg_data = urllib.request.urlopen(neg_inurl).read()
        neg_res = JSON.loads(neg_data.decode('utf-8'))
        neg_senti_count=neg_res['facet_counts']['facet_ranges']['reply_polarity']['counts'][1]
        print(neg_senti_count)
        neut_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?q.op=OR&q=reply_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.reply_polarity.facet.range.start=-0.2&facet.range.end=0.2&facet.range.gap=1&facet.range=reply_polarity'+filterquery
        print("Neut URL",neut_inurl)
        neut_data = urllib.request.urlopen(neut_inurl).read()
        neut_res = JSON.loads(neut_data.decode('utf-8'))
        neut_senti_count=neut_res['facet_counts']['facet_ranges']['reply_polarity']['counts'][1]
        print(neut_senti_count)
        pos_inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?q.op=OR&q=reply_text%3A(' + modelquery + ')&+wt=json&rows=1000&facet=true&f.reply_polarity.facet.range.start=0.2&facet.range.end=1&facet.range.gap=1&facet.range=reply_polarity'+filterquery
        print("Pos URL",pos_inurl)
        pos_data = urllib.request.urlopen(pos_inurl).read()
        pos_res = JSON.loads(pos_data.decode('utf-8'))
        pos_senti_count=pos_res['facet_counts']['facet_ranges']['reply_polarity']['counts'][1]
        print(pos_senti_count)
        response = {}
        response['negative_sentiment_count']=neg_senti_count
        response['neutral_sentiment_count']=neut_senti_count
        response['pos_sentiment_count']=pos_senti_count
        # print(response)
        return response
    except Exception as e:
        print(e)
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
        inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000'
        print(inurl)
        data = urllib.request.urlopen(inurl).read()
        res = JSON.loads(data.decode('utf-8'))
        docs=res['response']
        response = jsonify(docs)
        datas=getSentiment(response.json)
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
    with open("../new_data/JSON/keywords/keywords_"+str(i)+".json") as f:
        for line in f:
            data.append(JSON.loads(line))
    return data

def index_kw(indexer):
    for i in range(50,109):
        datas=read_config_kw(i+1)
        print("Processing KW ",i+1)
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
    for i in range(23,31):
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
    for i in range(7,25):
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
    # inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?q.op=OR&q=*%3A*&rows=69455'
    inurl='http://18.217.102.217:8983/solr/IRF21P4_f2/select?q.op=OR&q=*%3A*&rows=15000'
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
    #
    #index_main(indexer)
<<<<<<< HEAD
    #index_replies(indexer)
    index_kw(indexer)

=======
    # index_replies(indexer)
    #index_kw(indexer)
    app.run(host = "0.0.0.0",port = 9999)
>>>>>>> 352e8b16f497b66b3b103b9b06b47873e2064ec2
#TODO: Index keywords xD
