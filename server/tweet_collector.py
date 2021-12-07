# import tweepy
# import time
# import pandas as pd
# from tweepy import auth
# # import pickle5
# from tweet_preprocessor import TWPreprocessor
# from indexer import Indexer
#
# indexer = Indexer()
#
#
# class Twitter_Collector:
#
#     def _init_(self):
#         self.auth = tweepy.OAuthHandler(
#             'L1HOX68GZTkeuoylk5jgpJZhO', '1SxbIaFXKsLiUE3xhckgpuNX0P08PZhftn65mlkYNS9fG1fiqu')
#         self.auth.set_access_token('136698226-kzxHvwlbBDOgsPBithzGiUix19E1QKIBgkQySqtd',
#                                    'P9ZGUsmkBxwHIxAXNGGjqDtQshi7dExqEsKT7KbdgocwL')
#         self.api = tweepy.API(
#             self.auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
#
#     def get_poi_tweets(self, poi, key_word_flag):
#         with open('keywords.pkl', 'rb') as f:
#             print("here")
#             # e = pickle5.load(f)
#         #  e = pd.read_pickle("keywords.pkl")
#
#         raw_tweets = []
#         poiScreenName = poi['screen_name']
#         tweetCount = 300  # poi['count']
#         for tweet in tweepy.Cursor(self.api.user_timeline, id=poiScreenName, include_rts=False, tweet_mode="extended").items(tweetCount):
#             try:
#                 if key_word_flag:
#                     for i in range(len(e)):
#                         key_word = (e["name"][i])
#                         if key_word in tweet._json["full_text"]:
#                             # print(key_word)
#                             raw_tweets.append(tweet._json)
#                         else:
#                             TWPreprocessor.preprocess(tweet._json, 0, poi)
#                 else:
#                     raw_tweets.append(tweet._json)
#             except tweepy.TweepError as e1:
#                 print(e1.reason)
#                 print("hw")
#             except StopIteration:
#                 break
#         return raw_tweets
#
#     def get_keyword_lang_tweets(self, keyword):
#         raw_tweets = []
#         queryString = keyword['name']
#         tweetCount = 200  # keyword['count']
#         language = keyword['lang']
#         for tweet in tweepy.Cursor(self.api.search, q=queryString, lang=language, tweet_mode="extended").items(tweetCount):
#             try:
#                 # if not tweet._json['retweeted'] and 'RT @' not in tweet._json['full_text']:
#                 raw_tweets.append(tweet._json)
#             except tweepy.TweepError as e:
#                 print(e.reason)
#             except StopIteration:
#                 break
#         return raw_tweets
#
#     def get_tweets_by_poi_screen_name(self,poi_screenname):
#         '''
#         Use user_timeline api to fetch POI related tweets, some postprocessing may be required.
#         :return: List
#         '''
#         tweet_list = []
#         covid_tweet_list = []
#         oldest_id = None
#         tweet_count = 0
#         covid_tweet_count = 0
#         calls = 0
#         while tweet_count < 3000 or covid_tweet_count < 60:
#             tweet_timeline = self.api.user_timeline(poi_screenname,count = 2000, tweet_mode='extended',include_rts=False, max_id = oldest_id)
#             calls += 1
#             #oldest_id = tweet_timeline[-1].id
#
#             for tweet in tweet_timeline:
#                 if re.search("RT", tweet.full_text):
#                     continue
#                 if any(x in tweet.full_text for x in self.covid_keywords):
#                     covid_tweet_count += 1
#                     covid_tweet_list.append(tweet)
#                     #tweet_list.append(helper.parse_tweet_data(tweet._json))
#                 tweet_count += 1
#                 oldest_id = tweet.id
#                 tweet_list.append(helper.parse_tweet_data(tweet._json))
#             ##This break should be removed
#             #break;
#
#             if calls >= 20:
#                 break;
#         print("length")
#         print(len(covid_tweet_list))
#         return tweet_list , covid_tweet_list
#
#     def get_replies2(name,tweet_id,poi_reply_flag):
#         poi_reply_flag=1
#         items_count=200
#         total_replies_count=0
#         required_replies_count=2
#         if(poi_reply_flag==1):
#             items_count=70
#             required_replies_count=10
#         # name=ip_tweet.author.screen_name
#
#         replies=[]
#         for tweet in tweepy.Cursor(api.search,q='to:'+name, result_type='recent',tweet_mode="extended", timeout=999999).items(items_count):
#             if hasattr(tweet, 'in_reply_to_status_id_str') and total_replies_count<required_replies_count:
#                 # if (tweet.in_reply_to_status_id_str==tweet_id):
#                 #     replies.append(tweet.full_text)
#                 #     total_replies_count=total_replies_count+1
#                 for id in tweet_ids:
#                     if reply.in_reply_to_status_id_str == id:
#                         replies.append(reply._json)
#         print("# Replies Collected for name: ",name," are: ",len(replies))
#         return replies
#
#     def get_replies_keywords(self, name_id_list):
#         for name_id in name_id_list:
#             author = name_id["screen_name"]
#             tweet_id = name_id["tweet_id"]
#             replies = []
#             for reply in tweepy.Cursor(self.api.search, q='to:'+author, result_type='recent', tweet_mode="extended", timeout=999999).items(50):
#
#                 if reply.in_reply_to_status_id_str == tweet_id:
#                     print(name_id)
#                     replies.append(reply._json)
#
#         return replies
# # indexer.create_documents(TWPreprocessor.preprocess(reply._json, 2))
#
#
#
