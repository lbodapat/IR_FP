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


      poiNames = [{key:'Barkha Dutt',value:'BDUTT'},
                {key:'Rajdeep Sardesai',value:'sardesairajdeep'},
                {key:'Sachin Pilot', value:'SachinPilot'},
                {key:'Narendra Modi',value:'narendramodi'},
                {key:'Piyush Goyal',value:'PiyushGoyal'},
                {key:'Bernie Sanders',value:'BernieSanders'},
                {key:'Cory Booker',value:'CoryBooker'},
                {key:'Kamala Harris',value:'KamalaHarris'},
                {key:'Ted Lieu',value:'tedlieu'},
                {key:'Elizabeth Warren',value:'ewarren'},
                {key:'Carlos Bolsonaro',value:'CarlosBolsonaro'},
                {key:'Jair Bolsonaro',value:'jairbolsonaro'},
                {key:'Lula',value:'LulaOficial'},
                {key:'Dilma Rousseff',value:'dilmabr'},
                {key:'Gleisi Hoffmann',value:'gleisi'}
                ];

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
                console.log(this.docs);
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
                tweet.tweet_lang  =  docs[i].tweet_lang;
                tweet.tweet_text  =  docs[i].tweet_text;
                tweet.tweet_date = docs[i].tweet_date;
                tweet.tweet_urls = docs[i].tweet_urls;
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
