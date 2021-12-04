    # -*- coding: utf-8 -*-


try:
    import json as JSON
except ImportError:
    import simplejson as JSON

import urllib.request
import tweepy
from flask_cors import CORS
from flask import Flask,request,jsonify
#from flask_cors import CORS
from datetime import datetime, timedelta
from io import StringIO
from pandas import DataFrame
import pickle
import pandas as pd
from indexer import Indexer

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# cors = CORS(app, resources={r"*": {"origins": ""}})
CORS(app, resources=r'*', headers='Content-Type')

auth = tweepy.OAuthHandler("SvX1COY5LDLBSXgT0zFZ8Q5T3",
                                "25urRNXrihwPw9Z6kd1FnWj7KQasqG0u0GrHhznoH9bqVfCyU3")
auth.set_access_token("1433793212263682071-FsDVpYfUpf5Hd1nQYzkMEDOuJPvOO2",
                           "veLak9EPx6EyxVlM4w0LsEDKgPLejEPXkkivJs2DlM0Ss")
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)

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

@app.route("/",methods = ["POST"])
def hello():
    print (request.json)
    return "Hello World"

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
           print("Enter")
           modelquery=data["query"].strip()[0]
        modelquery = urllib.parse.quote(data["query"])
        # inurl = 'http://3.17.156.95:8983/solr/IRF21P1/select?defType=edismax&stopwords=true&qf=tweet_text%20translated&q='+ modelquery +'&+wt=json&rows=1000&fl=id%2Ctweet_text%2Ctweet_lang%2Csentiment%2Cpoi_name%2Cretweet_count%2Cuser.followers_count%2Ccountry%2Cverified%2Ccreated_at%2Cfavorite_count%2Cuser.name%2Cuser.screen_name%2Cuser.profile_image_url_https%2Ctopic%2Cdateformatted%2Ctranslated&facet.field=hashtags&f.hashtags.facet.limit=10&facet=on'+filterquery
        inurl='http://3.17.156.95:8983/solr/IRF21P1/select?q.op=OR&q=tweet_text%3A(' + modelquery + ')&+wt=json&rows=1000'

        print(inurl)
        data = urllib.request.urlopen(inurl).read()
        print("1: ")
        res = JSON.loads(data.decode('utf-8'))
        docs=res['response']
        print("4")
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
        inurl = 'http://3.17.156.95:8983/solr/IRF21P1/select?defType=edismax&stopwords=true&qf=tweet_text%20&q='+ modelquery +'&+wt=json&facet.field=tweet_lang&facet.field=country&facet.field=hashtags&f.hashtags.facet.limit=10&facet.field=verified&f.tweet_lang.facet.limit=3&facet.field=topic_str&facet=on&rows=0' +filterquery
        print("INURL:::::::   ",inurl)
        data = urllib.request.urlopen(inurl).read()
        docs = JSON.loads(data.decode('utf-8'))['facet_counts']['facet_fields']
        docs["status"]= JSON.loads(data.decode('utf-8'))['responseHeader']['status']
        response = jsonify(docs)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        print("RESPONSE:::::::::::::::::")
        print(response)
        return response
    except:
        data=  {"status":500, "data":[]}
        response = jsonify(data)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response


@app.route("/getSentimentDetails/",methods=['POST'])
def getSentimentDetails():
    try:
        data=request.json
        filterquery=getFilters(data,"user.screen_name")
        modelquery = urllib.parse.quote(data["query"])
        inurl = 'http://3.17.156.95:8983/solr/IRF21P1/select?defType=edismax&stopwords=true&qf=tweet_text%20translated&q='+ modelquery +'&wt=json&fq=tweet_date%3A%5B2019-09-01T00%3A00%3A00Z%20TO%202019-09-15T00%3A00%3A00Z%7D&facet=on&rows=0'+ '&json.facet=%20{%20month_sentiment:{%20type:%20terms,%20field:%20daymonth_str,%20facet:{%20sentimentcount:%20{%20type%20:%20terms,%20field:%20sentiment%20}%20}%20}%20}&json.facet=%20{%20country_sentiment:{%20type:%20terms,%20field:%20country,%20facet:{%20sentimentcount:%20{%20type%20:%20terms,%20field:%20sentiment%20}%20}%20}%20}&json.facet=%20{%20poi_sentiment:{%20type:%20terms,%20field:%20poi_name,%20facet:{%20sentimentcount:%20{%20type%20:%20terms,%20field:%20sentiment%20}%20}%20}%20}&json.facet=%20{%20country_hashtags:{%20type:%20terms,%20field:%20country,%20facet:{%20hashtagcount:%20{%20type%20:%20terms,%20field:%20hashtags,%20limit%20:%2010%20}%20}%20}%20}' +filterquery
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
        if('mexico' not in countryhashtags):
            countryhashtags['mexico']=[]
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

@app.route("/getverifiedSentimentDetails/",methods=['POST'])
def getverifiedSentimentDetails():
    try:
        data=request.json
        filterquery=getFilters(data,"user.screen_name")
        modelquery = urllib.parse.quote(data["query"])
        inurl = 'http://3.17.156.95:8983/solr/IRF21P1/select?defType=edismax&stopwords=true&qf=tweet_text%20translated&q='+ modelquery +'&wt=json&fq=verified%3Atrue&fq=tweet_date%3A%5B2019-09-01T00%3A00%3A00Z%20TO%202019-09-15T00%3A00%3A00Z%7D&facet=on&rows=0'+ '&json.facet=%20{%20month_sentiment:{%20type:%20terms,%20field:%20daymonth_str,%20facet:{%20sentimentcount:%20{%20type%20:%20terms,%20field:%20sentiment%20}%20}%20}%20}' +filterquery
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
        filterquery=getFilters(data,"poi_name")
        print("-----_>>>>>>>> ",filterquery)
        modelquery = urllib.parse.quote(data["query"])
        inurl = 'http://3.17.156.95:8983/solr/IRF21P1/select?defType=edismax&stopwords=true&qf=tweet_text%20translated&q='+ modelquery +'&wt=json&fq=tweet_date%3A%5B2019-09-01T00%3A00%3A00Z%20TO%202019-09-15T00%3A00%3A00Z%7D&json.facet=%20{%20poi_sentimentss:{%20type:%20terms,%20field:%20daymonth_str,%20facet:{%20sentimentcount:%20{%20type%20:%20terms,%20field:%20sentiment%20}%20}%20}%20}&facet=on&rows=0' +filterquery
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


#######################

def query_solr(query):
    print("--------------------------")
    print("query before querying solr:::::: ",query)
    print("--------------------------")
    # http://ec2-3-17-156-95.us-east-2.compute.amazonaws.com:8983/solr/#/IRF21P1/query?q=tweet_text:%20Modi%20Covid&q.op=OR
    if True:
        # inurl = 'http://localhost:8983/solr/' + 'IRF21P1' + '/select?fl=id%2Cscore&q=text_en%3A(' + query + ')%20or%20text_de%3A(' + query + ')%20or%20text_ru%3A(' + query + ')' + '&rows=20&wt=json'
        inurl='http://localhost:8983/solr/' + 'IRF21P1' +'/query?q=tweet_text:(' + query + ')'+ '&rows=20&wt=json'

    print("-----------------------------------------------URL-------------------------",inurl)
    query_conn= requests.get(inurl)
    return query_conn.json()

def read_config(i):
    data = []
    with open("../data/JSON/POI/poi"+str(i)+".json") as f:
        for line in f:
            data.append(JSON.loads(line))
    return data

def run_poi(i):
    for j in range(1):
        print("::::::--------->>>>>>>>>",(i))
        with open("/Users/surajbodapati/Desktop/University_at_Buffalo/SEM1/Information_Retreival/Assignments/p4/CSE-535-Project-4--master/data/POI/poi_"+str(i)+".pkl","rb") as input_file:
            new_dict = pickle.load(input_file)
            i=i+1
            data=JSON.dumps(JSON.loads(new_dict.to_json(orient="records")))

def run_keywords():
    i=1
    for j in range(80):
        with open("/Users/surajbodapati/Desktop/University_at_Buffalo/SEM1/Information_Retreival/Assignments/p4/CSE-535-Project-4--master/data/keywords/keywords_"+str(i)+".pkl","rb") as input_file:
            new_dict = pickle.load(input_file)
            new_dict=new_dict.replace("False", '"False"')
            new_dict.to_json('../data/JSON/keywords/keywords_'+str(i)+'.json', orient='records', lines=True)
            i=i+1

def index_poi(indexer):
    i=1
    for j in range(2):
        datas=read_config(i)
        for data in datas:
            data['tweet_id']=data['id']
            tweets = api.search(q=data['id'])
            for tweet in tweets:
                print(dir(tweet))
                #data['fav_count'] =
                data['profile_background_image_url'] = tweet._json['user']['profile_background_image_url']
                data['retweet_count'] = tweet._json['retweet_count']
                data['followers_count'] = tweet._json['user']['followers_count']
            indexer.create_documents(data)
        i+=1

def index(indexer):
    index_poi(indexer)


if __name__ == "__main__":
    indexer = Indexer()
    index(indexer)
    # app.run(host = "0.0.0.0",port = 9999)
