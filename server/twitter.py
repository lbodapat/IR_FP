'''
@author: Souvik Das
Institute: University at Buffalo
'''

import tweepy
import helper
import re
from TwitterAPI import TwitterAPI, TwitterOAuth, TwitterRequestError, TwitterConnectionError, TwitterPager
import pandas as pd

class Twitter:
    def __init__(self):
        self.auth = tweepy.OAuthHandler("XeReo6qFPTBbCOg7ipQe0hGhU", "I0tNlARldhUe6CDgD77wRti98cweQUAUqxHgl88iAPcUa0dQ9l")
        self.auth.set_access_token("2520933552-Z77QJPBJWDwyMZCZHlOYtq7hk9OxkQDMpw15l2r", "EVVsns68rgCFY7KUoylCB6NcxRO5OuLa1449m7IRdfRE6")
        self.api = tweepy.API(self.auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
        consumer_key= "w2b8rSpcIJdX4xa6gJBmy0UGV"
        consumer_secret= "9MNJPwYh2v7kwgTy3CaoCh67o5Vad3aKnr7mddiBN8QwH8uTEC"
        access_token_key= "2520933552-GLnDnXrnuxlgX7rjY3BNaJBwLk7DsCKbux4kvZ8"
        access_token_secret= "GKpCcguc9x20bgkqaYhm3lgBhz0LgraYv1gAfx13AjCDR"
        self.twitter_api = TwitterAPI(consumer_key, consumer_secret, access_token_key, access_token_secret, api_version='2')
        self.covid_keywords = [
        "quarentena",
        "hospital",
        "covidresources",
        "rt-pcr",
        "वैश्विकमहामारी",
        "oxygen",
        "सुरक्षित रहें",
        "stayhomestaysafe",
        "covid19",
        "quarantine",
        "मास्क",
        "face mask",
        "covidsecondwaveinindia",
        "flattenthecurve",
        "corona virus",
        "wuhan",
        "cierredeemergencia",
        "autoaislamiento",
        "sintomas",
        "covid positive",
        "casos",
        "कोविड मृत्यु",
        "स्वयं चुना एकांत",
        "stay safe",
        "#deltavariant",
        "covid symptoms",
        "sarscov2",
        "covidiots",
        "brote",
        "alcohol en gel",
        "asintomático",
        "टीकाकरण",
        "encierro",
        "covidiot",
        "covidappropriatebehaviour",
        "fever",
        "pandemia de covid-19",
        "wearamask",
        "flatten the curve",
        "oxígeno",
        "desinfectante",
        "super-spreader",
        "coronawarriors",
        "quedate en casa",
        "mascaras",
        "mascara facial",
        "trabajar desde casa",
        "संगरोध",
        "immunity",
        "स्वयं संगरोध",
        "डेल्टा संस्करण",
        "mask mandate",
        "health",
        "dogajkidoori",
        "travelban",
        "cilindro de oxígeno",
        "covid",
        "staysafe",
        "variant",
        "yomequedoencasa",
        "doctor",
        "एंटीबॉडी",
        "दूसरी लहर",
        "distancia social",
        "मुखौटा",
        "covid test",
        "अस्पताल",
        "covid deaths",
        "कोविड19",
        "muvariant",
        "susanadistancia",
        "personal protective equipment",
        "remdisivir",
        "quedateencasa",
        "asymptomatic",
        "social distancing",
        "distanciamiento social",
        "cdc",
        "transmission",
        "epidemic",
        "social distance",
        "herd immunity",
        "transmisión",
        "सैनिटाइज़र",
        "indiafightscorona",
        "surgical mask",
        "facemask",
        "desinfectar",
        "वायरस",
        "संक्रमण",
        "symptoms",
        "सामाजिक दूरी",
        "covid cases",
        "ppe",
        "sars",
        "autocuarentena",
        "प्रक्षालक",
        "breakthechain",
        "stayhomesavelives",
        "coronavirusupdates",
        "sanitize",
        "covidinquirynow",
        "कोरोना",
        "workfromhome",
        "outbreak",
        "flu",
        "sanitizer",
        "distanciamientosocial",
        "variante",
        "कोविड 19",
        "कोविड-19",
        "covid pneumonia",
        "कोविड",
        "pandemic",
        "icu",
        "वाइरस",
        "contagios",
        "वेंटिलेटर",
        "washyourhands",
        "n95",
        "stayhome",
        "lavadodemanos",
        "fauci",
        "रोग प्रतिरोधक शक्ति",
        "maskmandate",
        "डेल्टा",
        "कोविड महामारी",
        "third wave",
        "epidemia",
        "fiebre",
        "मौत",
        "travel ban",
        "फ़्लू",
        "muerte",
        "स्वच्छ",
        "washhands",
        "enfermedad",
        "contagio",
        "infección",
        "faceshield",
        "self-quarantine",
        "remdesivir",
        "oxygen cylinder",
        "mypandemicsurvivalplan",
        "कोविड के केस",
        "delta variant",
        "wuhan virus",
        "लक्षण",
        "corona",
        "maskup",
        "gocoronago",
        "death",
        "curfew",
        "socialdistance",
        "second wave",
        "máscara",
        "stayathome",
        "positive",
        "lockdown",
        "propagación en la comunidad",
        "तीसरी लहर",
        "aislamiento",
        "rtpcr",
        "coronavirus",
        "variante delta",
        "distanciasocial",
        "cubrebocas",
        "घर पर रहें",
        "socialdistancing",
        "covidwarriors",
        "प्रकोप",
        "covid-19",
        "stay home",
        "संक्रमित",
        "jantacurfew",
        "cowin",
        "कोरोनावाइरस",
        "virus",
        "distanciamiento",
        "cuarentena",
        "indiafightscovid19",
        "healthcare",
        "natocorona",
        "मास्क पहनें",
        "delta",
        "ऑक्सीजन",
        "wearmask",
        "कोरोनावायरस",
        "ventilator",
        "pneumonia",
        "maskupindia",
        "ppe kit",
        "sars-cov-2",
        "testing",
        "fightagainstcovid19",
        "महामारी",
        "नियंत्रण क्षेत्र",
        "mask",
        "pandemia",
        "deltavariant",
        "वैश्विक महामारी",
        "रोग",
        "síntomas",
        "work from home",
        "antibodies",
        "masks",
        "confinamiento",
        "flattening the curve",
        "मुखौटा जनादेश",
        "thirdwave",
        "mascarilla",
        "usacubrebocas",
        "covidemergency",
        "inmunidad",
        "cierre de emergencia",
        "self-isolation",
        "स्वास्थ्य सेवा",
        "सोशल डिस्टन्सिंग",
        "isolation",
        "cases",
        "community spread",
        "unite2fightcorona",
        "oxygencrisis",
        "containment zones",
        "homequarantine",
        "स्पर्शोन्मुख",
        "लॉकडाउन",
        "hospitalización",
        "incubation period"
    ]

    def _meet_basic_tweet_requirements(self):
        '''
        Add basic tweet requirements logic, like language, country, covid type etc.
        :return: boolean
        '''
        raise NotImplementedError

    def get_tweets_by_poi_screen_name(self,poi_screenname):
        '''
        Use user_timeline api to fetch POI related tweets, some postprocessing may be required.
        :return: List
        '''
        tweet_list = []
        covid_tweet_list = []
        oldest_id = None
        tweet_count = 0
        covid_tweet_count = 0
        calls = 0
        while tweet_count < 3000 or covid_tweet_count < 60: 
            tweet_timeline = self.api.user_timeline(poi_screenname,count = 2000, tweet_mode='extended',include_rts=False, max_id = oldest_id)
            calls += 1 
            #oldest_id = tweet_timeline[-1].id
        
            for tweet in tweet_timeline:
                if re.search("RT", tweet.full_text):
                    continue
                if any(x in tweet.full_text for x in self.covid_keywords):
                    covid_tweet_count += 1
                    covid_tweet_list.append(tweet)
                    #tweet_list.append(helper.parse_tweet_data(tweet._json))
                tweet_count += 1
                oldest_id = tweet.id
                tweet_list.append(helper.parse_tweet_data(tweet._json))
            ##This break should be removed
            #break;
        
            if calls >= 20:
                break;
        print("length")
        print(len(covid_tweet_list))
        return tweet_list , covid_tweet_list
        
        ## CODE FOR QUERY OF TWEETS

        query = 'vaccine'
        #searched_tweets = [status for status in tweepy.Cursor(self.api.search, q=query).items(1000)]
        #print(searched_tweets[0])
        #print(len(searched_tweets))
        
        
        ##Code for twitter v2
        #print("USer :")
        #print(covid_tweet_list[0]._json.get('user').get('id'))
        #print(covid_tweet_list[0]._json.get('id'))
        print("length of covid tweets")
        print(len(covid_tweet_list))
        covid_tweet_processed = 0

        for tweet in covid_tweet_list:
            print(tweet._json.get('id'))
            TWEET_ID = tweet._json.get('id')
            TWEET_FIELDS = 'conversation_id'
            r = self.twitter_api.request(f'tweets/:{TWEET_ID}', {'tweet.fields': TWEET_FIELDS})
            #print(r)
            conv_ids = []
            for item in r:
                #print("length of conv ids")
                #print(len(item))
                conv_ids.append(item['conversation_id'])
                print(item['conversation_id'])
            conv_id = conv_ids[0]
            res = self.twitter_api.request(f'tweets/:{conv_id}',
                        {
                            'tweet.fields': 'author_id,conversation_id,created_at,in_reply_to_user_id'
                        })
        
            for item in res:
                root = TreeNode(item)

            pager = TwitterPager(self.twitter_api, 'tweets/search/recent',
                             {
                                 'query': f'conversation_id:{conv_id}',
                                 'tweet.fields': 'context_annotations,entities,author_id,conversation_id,created_at,in_reply_to_user_id'
                             })

            orphans = []
            i = 0
            replies = 0
            for item in pager.get_iterator(wait=2):
                #print(item['in_reply_to_screen_name'])
                #print(item)
                #print("Item detail")
                #print(item)
                if int(item['in_reply_to_user_id'])==int(tweet._json.get('user').get('id')):
                    #print("here")
                    replies+=1
                    tweet_list.append(helper.parse_tweet_reply_data(item,tweet._json))
                ##node = TreeNode(item)
                #print(f'{node.id()} => {node.reply_to()}')
                # COLLECT ANY ORPHANS THAT ARE NODE'S CHILD
                ##orphans = [orphan for orphan in orphans if not node.find_parent_of(orphan)]
                # IF NODE CANNOT BE PLACED IN TREE, ORPHAN IT UNTIL ITS PARENT IS FOUND
                ##if not root.find_parent_of(node):
                ##    orphans.append(node)
                if replies > 15:
                    break;
                i+=1
                ##conv_id, child_id, text, data_list = root.list_l1()
                if i >200:
                    print("less than 10 replies")
                    break;
                ##conv_id, child_id, text, data_list = root.list_l1()
                ##print("********")
                ##print(len(data_list))
                ##print(data_list)
                ##for dl in data_list:
                ##    tweet_list.append(helper.parse_tweet_reply_data(dl,tweet._json))
            covid_tweet_processed +=1
            print(covid_tweet_processed)
            if covid_tweet_processed > 23:
                break
    
        return tweet_list

        ##**********************************************************
        c = 0
        oldest_id = None
        covid_tweets=[]
        tweet_timeline = []
        while c <60 :
            tweets = self.api.user_timeline(id =poi_screenname, count =500, max_id = oldest_id,tweet_mode='extended',)
            #print(len(tweets))
            for tweet in tweets:
                if re.search("COVID", tweet.full_text):
                    c =c+1
                    covid_tweets.append(tweet)
                tweetid =tweet.id
            tweet_timeline.append(tweets)
            oldest_id = tweetid
            
        print("covid",c)
        tweet_list = []
        for tweet in tweet_timeline:
            tweet_list.append(helper.parse_tweet_data(tweet))

        return tweet_list
        results=[]
        tweet_replies =[]
        for tweet in tweets:
            reply_max_id = tweet.id
            replies = self.get_replies("to:{}".format(poi_screenname), reply_max_id)
            replies_for_tweet=[]
            for reply in replies :
                if reply.in_reply_to_status_id == tweet.id:
                    replies_for_tweet.append(reply)
            tweet_replies.extend(replies_for_tweet)
            #reply_max_id = replies[-1].id
            replies.append(tweet)
            break
        results.extend(tweet_replies)
        print( "replies count ", len(tweet_replies))
        return results
        for tweet in tweepy.Cursor(self.api.search,q='to:'+screenname, result_type='recent', timeout=999999).items(1000):
            if hasattr(tweet, 'in_reply_to_status_id_str'):
                if (tweet.in_reply_to_status_id_str==tweet.id):
                    replies.append(tweet)
        return results

        tweet_timeline = self.api.user_timeline(poi['screen_name'],count = poi['count'], tweet_mode='extended',include_rts=True)
        print(tweet_timeline)
        tweet_list = []
        for tweet in tweet_timeline:
            tweet_list.append(helper.parse_tweet_data(tweet._json))
        print(tweet_list)
        return tweet_list

    def get_tweets_by_lang_and_keyword(self, name,language):
        '''
        Use search api to fetch keywords and language related tweets, use tweepy Cursor.
        :return: List
        '''
        tweet_list = []
        vaccine_tweet_list = []
        # lang = 'en'
        keyword=name+' -filter:retweets'
        #keyword = "to:{}".format(name) + " filter:replies"
        #for status in tweepy.Cursor(self.api.search, q=keyword, tweet_mode='extended', timeout=999999, monitor_rate_limit=True, wait_on_rate_limit=True).items(1000):   
        for status in tweepy.Cursor(self.api.search,q = keyword,tweet_mode='extended').items(500):
            if re.search("RT", status.full_text):
                continue
            vaccine_tweet_list.append(status)
            tweet_list.append(helper.parse_non_poi_tweet_data(status._json))
        
        return tweet_list, vaccine_tweet_list

        covid_tweet_processed = 0
        total_reply_tweets = 0
        for tweet in vaccine_tweet_list:
            print(tweet._json.get('id'))
            TWEET_ID = tweet._json.get('id')
            TWEET_FIELDS = 'conversation_id'
            r = self.twitter_api.request(f'tweets/:{TWEET_ID}', {'tweet.fields': TWEET_FIELDS})
            #print(r)
            conv_ids = []
            for item in r:
                #print("length of conv ids")
                #print(len(item))
                conv_ids.append(item['conversation_id'])
                print(item['conversation_id'])
            conv_id = conv_ids[0]
            res = self.twitter_api.request(f'tweets/:{conv_id}',
                        {
                            'tweet.fields': 'author_id,conversation_id,created_at,in_reply_to_user_id'
                        })

            for item in res:
                root = TreeNode(item)

            pager = TwitterPager(self.twitter_api, 'tweets/search/recent',
                             {
                                 'query': f'conversation_id:{conv_id}',
                                 'tweet.fields': 'context_annotations,entities,author_id,conversation_id,created_at,in_reply_to_user_id'
                             })

            orphans = []
            i = 0
            replies = 0
            for item in pager.get_iterator(wait=2):
                #print(item['in_reply_to_screen_name'])
                #print(item)
                #print("Item detail")
                #print(item)
                if int(item['in_reply_to_user_id'])==int(tweet._json.get('user').get('id')):
                    #print("here")
                    replies+=1
                    total_reply_tweets +=1
                    tweet_list.append(helper.parse_tweet_reply_data(item,tweet._json))
                ##node = TreeNode(item)
                #print(f'{node.id()} => {node.reply_to()}')
                # COLLECT ANY ORPHANS THAT ARE NODE'S CHILD
                ##orphans = [orphan for orphan in orphans if not node.find_parent_of(orphan)]
                # IF NODE CANNOT BE PLACED IN TREE, ORPHAN IT UNTIL ITS PARENT IS FOUND
                ##if not root.find_parent_of(node):
                ##    orphans.append(node)
                if replies > 1:
                    break;
                i+=1
                ##conv_id, child_id, text, data_list = root.list_l1()
                if i >10:
                    print("less than 1 replies")
                    break;
            covid_tweet_processed +=1
            print(covid_tweet_processed)
            if total_reply_tweets > 15:
                break
        return tweet_list
        raise NotImplementedError

    def get_replies(self, query, max_id ):
        '''
        Get replies for a particular tweet_id, use max_id and since_id.
        For more info: https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/guides/working-with-timelines
        :return: List
        '''
        replies = self.api.search(q= query, since_id =max_id, count =1000)
        return replies
        raise NotImplementedError

class TreeNode:
	def __init__(self, data):
		"""data is a tweet's json object"""
		self.data = data
		self.children = []

	def id(self):
		"""a node is identified by its author"""
		return self.data['author_id']

	def reply_to(self):
		"""the reply-to user is the parent of the node"""
		return self.data['in_reply_to_user_id']

	def find_parent_of(self, node):
		"""append a node to the children of it's reply-to user"""
		if node.reply_to() == self.id():
			self.children.append(node)
			return True
		for child in self.children:
			if child.find_parent_of(node):
				return True
		return False

	def print_tree(self, level):
		"""level 0 is the root node, then incremented for subsequent generations"""
		# print(f'{level*"_"}{level}: {self.id()}')
		level += 1
		for child in self.children:
			child.print_tree(level)

	def list_l1(self):
                conv_id = []
                child_id = []
                text = []
                data_list = []
		#print(self.data['id'])
                for child in self.children:
                        data_list.append(child.data)
                        conv_id.append(self.data['id'])
                        child_id.append(child.data['id'])
                        text.append(child.data['text'])
                return conv_id, child_id, text, data_list

