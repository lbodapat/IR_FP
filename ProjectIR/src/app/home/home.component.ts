import { Component, OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Tweet} from 'src/app/models/tweet.model';
import {TweetService} from 'src/app/services/tweet.service';
import {AccordionModule} from 'primeng/accordion';
import { NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { News } from 'src/app/models/news.model';

interface SelectItem{
  label:any;
  value:any;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    tweets: Tweet[] = [];
    docs:any = [];
    docsRetrieved: number;
    displayedResults : number;
    p = 1;
    homeObj:any;
    filterOpen:boolean = false;
    news:News[] = [];
    newsArticleCount: number;
    showSpinner:boolean = false;
    //showTranslation:boolean = false;
    options: NgbModalOptions = {
        centered : false,
        size: 'lg',
        keyboard : true,

      };

       poiNames = [{key:'PMO India',value:'PMOIndia'},
                        {key:'Narendra Modi',value:'narendramodi'},
                        {key:'Shashi Tharoor', value:'ShashiTharoor'},
                        {key:'Mansukh Mandviya',value:'mansukhmandviya'},
                        {key:'Ayushman NHA',value:'AyushmanNHA'},
                        {key:'Rahul Gandhi',value:'RahulGandhi'},
                        {key:'Enrique Peña Nieto',value:'EPN'},
                        {key:'Felipe Calderon',value:'FelipeCalderon'},
                        {key:'Andrés Manuel López Obrador',value:'lopezobrador_'},
                        {key:'Miguel Ángel Mancera',value:'ManceraMiguelMX'},
                        {key:'Claudia Shein',value:'Claudiashein'},
                        {key:'Joe Biden',value:'JoeBiden'},
                        {key:'POTUS',value:'POTUS'},
                        {key:'CDC gov',value:'CDCgov'},
                        {key:'Barack Obama',value:'BarackObama'},
                        {key:'Marcelo Ebrard',value:'m_ebrard'},
                        {key:'Ministry of Health India',value:'MoHFW_INDIA'},
                        {key:'U.S. Department of Health & Human Services',value:'HHSGov'},
                        {key:'Ted Cruz',value:'tedcruz'},
                        {key:'Marco Rubio',value:'marcorubio'},
                        {key:'Amit Shah',value:'AmitShah'},
                        {key:'World Health Organization',value:'WHO'},
                        {key:'CDC Global',value:'CDCGlobal'},
                        {key:'White House USA',value:'WhiteHouse'}];

    constructor(private tweetService: TweetService,private modalService: NgbModal) {
        this.tweetService.value$.subscribe(obj=>
            {
                this.tweets = [];
                this.showSpinner = true;
                this.homeObj = obj;
                this.tweetService.postData(this.homeObj).subscribe(tweets=>{
                this.docsRetrieved = tweets.numFound;
                if(this.docsRetrieved < 1000){
                    this.displayedResults = this.docsRetrieved;
                }
                else{
                    this.displayedResults = 1000;
                }
                this.docs = tweets.docs;
                console.log("SSSSS:::",this.docs);
                setTimeout(this.loadData(this.docs) , 100);
                this.showSpinner = false;
            });


            });

        this.tweetService.filterOpen$.subscribe(status=>{
            this.filterOpen = status;
        })
    }

    ngOnInit() {
        this.tweetService.homeReturnval$.subscribe(tweets=>{
            this.showSpinner = true;
            this.tweets = tweets[0];
            this.displayedResults = tweets[1];
            this.docsRetrieved = tweets[2];
            this.showSpinner = false;});
    }

    loadData(docs){
        this.tweets = [];
        console.log(docs);
        let tweet = new Tweet();
        for (var i = 0; i < docs.length; i++){
                let tweet = new Tweet();
                tweet.poi_name =  docs[i].poi_name;
                tweet.country = docs[i].country;
                tweet.poi_id  =  docs[i].poi_id;
                tweet.verified=docs[i].verified
                if(docs[i].retweet_count==null){
                  tweet.retweet_count=0
                } else{
                  tweet.retweet_count=docs[i].retweet_count;
                }

                if(docs[i].poi_name==null){
                  tweet.username='Twitter User';
                } else{
                  tweet.username=docs[i].poi_name;
                }

              tweet.translatedText=docs[i].translated_text;
              if(docs[i].profile_image_url_https!=null){
                 tweet.profileimage=docs[i].profile_image_url_https;
              }else{
                tweet.profileimage="assets/images/Twitter.png";
              }
              if(docs[i].favorite_count==null){
                    tweet.favorite_count=0;
               } else{
                   tweet.favorite_count=docs[i].favorite_count;
               }

              if(docs[i].tweet_lang!='en'){
                tweet.showTranslation=true;
                tweet.translationExists=true;
              }else{
                 tweet.showTranslation=false;
                 tweet.translationExists=false;
              }
                tweet.tweet_lang  =  docs[i].tweet_lang;
                tweet.tweet_text  =  docs[i].tweet_text;
                tweet.tweet_date = docs[i].tweet_date;
                tweet.tweet_urls = docs[i].tweet_urls;
                if(docs[i].polarity>=-1 && docs[i].polarity<-0.2){
                  tweet.sentiment="Negative";
                }else if(docs[i].polarity>=-0.2 && docs[i].polarity<0.2){
                  tweet.sentiment="Neutral";
                }else if(docs[i].polarity>0.2 && docs[i].polarity<=1){
                    tweet.sentiment="Positive";
                }

                if(docs[i].subjectivity>0.5 ){
                     tweet.subjectivity="Opinion";
                }else if(docs[i].subjectivity<=0.5 ) {
                      tweet.subjectivity="Fact";
                }

                tweet.id = docs[i].id;
                this.tweets.push(tweet)
             }
        this.tweetService.setHomeReturnData([this.tweets,this.displayedResults,this.docsRetrieved]);
        //console.log(this.tweets);
    }

    onTweetClick(screenname,id){
        let url = "https://twitter.com/" + screenname + "/status/" + id;
        window.open(url, "_blank");
    }

    sentimentStyle(sentiment): object {
        if (sentiment == 'Neutral'){
        return {"color":"lightblue"};
        }
        else if(sentiment == 'Positive'){
            return {"color":"green"};
        }
        else if (sentiment == 'Negative'){
            return {"color":"red"};
        }
      }

    opinionStyle(subjectivity): object {
        if (subjectivity == 'Opinion'){
        return {"color":"red"};
        }
        else if(subjectivity == 'Fact'){
            return {"color":"green"};
        }
      }

    onNews(content,screenname,tweet_date){
        let newDate = new Date(tweet_date);
        for (var i = 0; i<this.poiNames.length; i++){
            if(this.poiNames[i].value == screenname){
                console.log(this.poiNames[i].key,tweet_date);
                this.tweetService.getNewsData(this.poiNames[i].key,tweet_date).subscribe(data=>{
                    console.log(data);
                    this.newsArticleCount = data.articleCount;
                    this.news = data.articles;
                    this.modalService.open(content, this.options);
                })
                break;
            }
        }

    }

    openArticle(url){
        window.open(url, "_blank");
    }

    changeTranslateState(){
        //this.showTranslation = !this.showTranslation;
    }
}


//
// http://18.217.102.217:8983/solr/IRF21P4_f2/select?indent=on&q.op=OR&q=*:*&facet=true&f.polarity.facet.range.start=-1&facet.range.end=-0.2&facet.range.gap=1&facet.range=polarity
//
// http://18.217.102.217:8983/solr/IRF21P4_f2/select?indent=on&q.op=OR&q=*:*&facet=true&f.polarity.facet.range.start=-0.2&facet.range.end=0.2&facet.range.gap=1&facet.range=polarity
//
// http://18.217.102.217:8983/solr/IRF21P4_f2/select?indent=on&q.op=OR&q=*:*&facet=true&f.polarity.facet.range.start=0.3&facet.range.end=1&facet.range.gap=1&facet.range=polarity
//
