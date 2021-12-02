import { Component, OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Tweet} from 'src/app/models/tweet.model';
import {TweetService} from 'src/app/services/tweet.service';
import {AccordionModule} from 'primeng/accordion';
import { NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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
    //tweet:Tweet;
    docs:any = [];
    p = 1;
    homeObj:any;
    filterOpen:boolean = false;

    options: NgbModalOptions = {
        centered : false,
        //size: 'lg',
        keyboard : false,

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
            {this.homeObj = obj;
            this.tweetService.postData(this.homeObj).subscribe(tweets=>{
                this.docs = tweets.docs;
                console.log(this.docs);
                setTimeout(this.loadData(this.docs) , 3000)
            });
                
                
            });

        this.tweetService.filterOpen$.subscribe(status=>{
            this.filterOpen = status;
            console.log(this.filterOpen);
        })
    }

    ngOnInit() {
        
    }
    
    loadData(docs:any){
        this.tweets =[];
        let tweet = new Tweet();
        for (var i = 0; i < docs.length; i++){
                let tweet = new Tweet();
                tweet.country =  docs[i].country[0];
                tweet.created_at = docs[i].created_at[0],
                tweet.favorite_count  =  docs[i].favorite_count[0],
                tweet.followers  =  docs[i].followers[0],
                tweet.id  =  docs[i].id,
                tweet.poi_name = docs[i].poi_name[0],
                tweet.profileimage = docs[i].profileimage[0],
                tweet.retweet_count = docs[i].retweet_count[0],
                tweet.screen_name  = docs[i].screenname[0],
                tweet.sentiment = docs[i].sentiment[0],
                tweet.topic  = docs[i].topic,
                tweet.tweet_lang = docs[i].tweet_lang[0],
                tweet.tweet_text  = docs[i].tweet_text[0],
                tweet.username = docs[i].username[0],
                tweet.verified = docs[i].verified[0];
                this.tweets.push(tweet)
                            }
        console.log(this.tweets);
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
        // let dateString = '1968-11-16T00:00:00' 
        let newDate = new Date(tweet_date);
        for (var i = 0; i<this.poiNames.length; i++){
            if(this.poiNames[i].value == screenname){
                console.log(this.poiNames[i].key,tweet_date,'2019-09-07');
                this.tweetService.getNewsData(this.poiNames[i].key,tweet_date,'2019-09-07').subscribe(data=>{
                    console.log(data);
                })
                break;
            }
        }
        this.modalService.open(content, this.options);
    }
}