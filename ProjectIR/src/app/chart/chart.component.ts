import { Component, OnInit } from '@angular/core';
import { Chart, MapChart } from 'angular-highcharts';
import { container } from '@angular/core/src/render3/instructions';
import { GoogleChartService } from  '../google-chart/service/google-chart.service';
import{Prop} from '../models/piechart.model'
import {TweetService} from 'src/app/services/tweet.service';
import {HttpClient} from '@angular/common/http';
import {Filter } from '../models/filter.model';
import {AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';
import * as Highcharts from 'highcharts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


declare var $: any;
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
let mapdataJSon = require('./../../assets/json/custom_world.geo.json')


Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  mapChart: MapChart;
  m = new MapChart();

  prop = new Prop();
  obj  =new Filter();

  months=['01-09','02-09','03-09','04-09','05-09','06-09','07-09','08-09','09-09'];
  languages=[{key:'English', value:'en'},{key:'Hindi', value:'hi'},{key:'Portuguese', value:'pt'}]
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
                {key:'Gleisi Hoffmann',value:'gleisi'},
                {key:'Shashi Tharoor', value:'shashitharoor'}
                ];
  state:any;
  data:any;
  url:string = './test.json';
  xaxis = [];
  yaxis = [];
  codechart= new Chart();
  searchText ='';
  filterdata_lang :any=[];
  filterdata_country :any=[];
  filterdata_hashtags:any=[];
  donutData:any = [];
  homeObj:any;
  docs:any = [];
  sentimentData:any=[];
  sentimentsInfo:any=[];
  columnChartOptions = new Chart( {});
  chart = new Chart({});
  chart_poiTweets = new Chart({});
  stackedBarChart = new Chart({});
  pieChartForCountries = new Chart( {});
  topicWiseChart = new Chart({});

  pie_India= new Chart({});
  pie_usa= new Chart({});
  pie_brazil= new Chart({});
  
  pie_India_hashtags= new Chart({});
  pie_usa_hashtags= new Chart({});
  pie_brazil_hashtags= new Chart({});

  
  options: any = {};
  count =0;
  wordData1: any = [];
  postFilterData_country =[];
  postFilterData_hashtags=[];
  postFilterData_sentiment=[];
  postFilterData_tweet_lang=[];
  postFilterData_verified=[];
  postFilterData_topic=[];
  wordData=new Array<AgWordCloudData>();
  
  getSentimentDetails_countrydata=[];
  getSentimentDetails_monthdata=[];
  filterOpen :boolean=false;
  wordoptions = {
    settings: {
    minFontSize: 10,
    maxFontSize: 100,
    },
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    },
    labels: false // false to hide hover labels
};
  getSentimentDetails_countryhashtags : any;
  getSentimentDetails_poidata :any;
  getpoiTweetsUrl_data :any;

  
  constructor(private tweetService: TweetService, private http: HttpClient){

    this.tweetService.filterOpen$.subscribe(status=>{
      this.filterOpen = status;
      console.log(this.filterOpen);
  })

    this.tweetService.value$.subscribe(obj=>
      {this.homeObj = obj;
      this.tweetService.postFilterData(this.homeObj).subscribe(tweets=>{
          this.docs = tweets.country;
          setTimeout(this.donutForHastags(), 5000);  //postfilter
          setTimeout(this.lineChartSentimentalAnalysis_poitweets(),3000) //getpoiTweetsUrl
          setTimeout(this.lineChartSentimentalAnalysis_poiReplies(),3000)  //getSentimentDetails
          setTimeout(this.getTweetReplies(),3000)
      });
          
          
      });
      
    if(this.searchText){
      this.obj.query= this.searchText;
    
  }

}

ngOnInit() {
let a=[]
let b=[]
setTimeout(this.donutForHastags(), 5000);  //postfilter
          setTimeout(this.lineChartSentimentalAnalysis_poitweets(),3000) //getpoiTweetsUrl
          setTimeout(this.lineChartSentimentalAnalysis_poiReplies(),3000)  //getSentimentDetails
          setTimeout(this.getTweetReplies(),3000)


} 


pie_CountriesWiseSentiments(){
  this.data = this.tweetService.getData();
  let temp =JSON.stringify(this.data);

  this.pie_India =new Chart({title: {text: 'India'}});
  this.pie_brazil =new Chart({title: {text: 'Brazil'}});
  this.pie_usa =new Chart({title: {text: 'USA'}});
  this.pie_India_hashtags =new Chart({title: {text: 'India'}});
  this.pie_brazil_hashtags =new Chart({title: {text: 'Brazil'}});
  this.pie_usa_hashtags =new Chart({title: {text: 'USA'}});
  this.topicWiseChart = new Chart({});
    
    this.filterdata_country = this.getSentimentDetails_countrydata;    
    this.data =this.filterdata_country;      
    let data =[];
    let res=[];    
    let data_pie=[];
    let india=[]
    let usa=[];
    let brazil=[];
    let index_india=-1;
    data_pie= this.filterdata_country;  
    let countries_array  = this.filterdata_country ?Object.keys(this.filterdata_country):[];

        index_india = countries_array.indexOf("india");
        if(countries_array.indexOf("india") !== -1){
          india.push({name:'POSITIVE',y:data_pie["india"][0].positive});
          india.push({name:'NEGATIVE',y:data_pie["india"][0].negative});
          india.push({name:'NEUTRAL',y:data_pie["india"][0].neutral});
        }
        else{
          india.push({name:'POSITIVE',y:0});
          india.push({name:'NEGATIVE',y:0});
          india.push({name:'NEUTRAL',y:0});

        }
        if(countries_array.indexOf("usa") !== -1){
          usa.push({name:'POSITIVE',y:data_pie["usa"][0].positive});
          usa.push({name:'NEGATIVE',y:data_pie["usa"][0].negative});
          usa.push({name:'NEUTRAL',y:data_pie["usa"][0].neutral});
        }
        else{
          usa.push({name:'POSITIVE',y:0});
          usa.push({name:'NEGATIVE',y:0});
          usa.push({name:'NEUTRAL',y:0});

        }

        if(countries_array.indexOf("brazil") !== -1){
          brazil.push({name:'POSITIVE',y:data_pie["brazil"][0].positive});
          brazil.push({name:'NEGATIVE',y:data_pie["brazil"][0].negative});
          brazil.push({name:'NEUTRAL',y:data_pie["brazil"][0].neutral});
        }
        else{
          brazil.push({name:'POSITIVE',y:0});
          brazil.push({name:'NEGATIVE',y:0});
          brazil.push({name:'NEUTRAL',y:0});

        }

      let countryList = this.getSentimentDetails_countryhashtags?Object.values(this.getSentimentDetails_countryhashtags):[];
      let india_hashtag =[]
      let brazil_hashtag=[];
      let usa_hashtag =[];
      let all_hashtags =[];
      let indiaHashtaglist =this.getSentimentDetails_countryhashtags.india.length>0  && JSON.stringify(this.getSentimentDetails_countryhashtags.india[0]) !== '{}'? Object.keys(this.getSentimentDetails_countryhashtags.india[0]):[];
      let brazilHashtaglist =this.getSentimentDetails_countryhashtags.brazil.length>0 && JSON.stringify(this.getSentimentDetails_countryhashtags.brazil[0]) !== '{}'? Object.keys(this.getSentimentDetails_countryhashtags.brazil[0]):[];
      let usaHashtaglist =this.getSentimentDetails_countryhashtags.usa.length>0 && JSON.stringify(this.getSentimentDetails_countryhashtags.usa[0]) !== '{}'? Object.keys(this.getSentimentDetails_countryhashtags.usa[0]):[];

      if(indiaHashtaglist.length ==0 && brazilHashtaglist.length==0 && usaHashtaglist.length==0){

      }
        for(let i=0;i<brazilHashtaglist.length;i++){
          if(Object.keys(this.getSentimentDetails_countryhashtags.brazil[0]).length> 0){
          let values = Object.values(this.getSentimentDetails_countryhashtags.brazil[0])
          brazil_hashtag.push({name:'#'+brazilHashtaglist[i],y:values[i],dataLabels: {  enabled: true  }});
          }
        }
        for(let i=0;i<indiaHashtaglist.length;i++){
          if(Object.keys(this.getSentimentDetails_countryhashtags.india[0]).length> 0){
            let values = Object.values(this.getSentimentDetails_countryhashtags.india[0])
          india_hashtag.push({name:'#'+indiaHashtaglist[i],y:values[i],dataLabels: {  enabled: true  }});
        }
      }
        for(let i=0;i<usaHashtaglist.length;i++){
          if(Object.keys(this.getSentimentDetails_countryhashtags.usa[0]).length> 0){
            let values = Object.values(this.getSentimentDetails_countryhashtags.usa[0])
          usa_hashtag.push({name:'#'+usaHashtaglist[i],y:values[i],dataLabels: {  enabled: true  }});
        }
      }
     
      if(countries_array.indexOf("india") !== -1){
      this.pie_India = new Chart( {
        chart: {
          renderTo: "container",
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        credits: {  enabled: false  },  
        title: {    text: "India" },
        subtitle: { text: "" },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            size: 160,
            cursor: "pointer",
            dataLabels: {
              enabled: true, color: "#000000", connectorColor: "#000000",          
            }
          }
        },
        colors: ['#3ED27D', '#010B05', '#1C83CD'],
        series: [
          {
            type: "pie", name: "",
            data: india
          }
        ]
      });}
    
      if(countries_array.indexOf("usa") !== -1){
      this.pie_usa = new Chart( {
        chart: {
          renderTo: "container",
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        credits: {  enabled: false  },
        title: {    text: "USA" },
        subtitle: { text: "" },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            size: 160,
            dataLabels: {
              enabled: true, color: "#000000", connectorColor: "#000000",          
            }
          }
        },
        colors: ['#3ED27D', '#010B05', '#1C83CD'],
        series: [
          {
            type: "pie", name: "",
            data: usa
          }
        ]
      });}

      if(countries_array.indexOf("brazil") !== -1){
      this.pie_brazil = new Chart( {
        chart: {
          renderTo: "container",
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        credits: {  enabled: false  },
        title: {    text: "Brazil" },
        subtitle: { text: "" },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            size: 160,
            cursor: "pointer",
            dataLabels: {
              enabled: true, color: "#000000", connectorColor: "#000000",          
            }
          }
        },
        colors: ['#3ED27D', '#010B05', '#1C83CD'],
        series: [
          {
            type: "pie", name: "",
            data: brazil
          }
        ]
      });}
    

//Country wise hashtags    




  if(this.getSentimentDetails_countryhashtags.usa && this.getSentimentDetails_countryhashtags.usa.length> 0 && JSON.stringify(this.getSentimentDetails_countryhashtags.usa[0]) !='{}'){

this.pie_usa_hashtags = new Chart(
  {
    chart: {type: 'pie'	},
    title: {text: 'USA'},
    credits: {enabled:  false},
    plotOptions: {
          pie: {
            allowPointSelect: true,
            dataLabels: {	enabled: false},
            size: 150,
            innerSize: '40%',
            center: ['50%', '40%']
          }
        },
        series: [{
          type: undefined,
          innerSize: '50%',
          data:  usa_hashtag
      }]
        
  }
);}
if(this.getSentimentDetails_countryhashtags.brazil && this.getSentimentDetails_countryhashtags.brazil.length> 0 && JSON.stringify(this.getSentimentDetails_countryhashtags.brazil[0]) !='{}'){
this.pie_brazil_hashtags = new Chart(
  {
    chart: {type: 'pie'	},
    title: {text: 'Brazil'},
    credits: {enabled:  false},
    plotOptions: {
          pie: {
            allowPointSelect: true,
            dataLabels: {	enabled: false},
            size: 150,
            innerSize: '40%',
            center: ['50%', '40%']
          }
        },
        series: [{
          type: undefined,
          innerSize: '50%',
          data:  brazil_hashtag
      }]
        
  }
);}
if(this.getSentimentDetails_countryhashtags.india && this.getSentimentDetails_countryhashtags.india.length> 0 && JSON.stringify(this.getSentimentDetails_countryhashtags.india[0]) !='{}'){
this.pie_India_hashtags = new Chart(
  {
    chart: {type: 'pie'	},
    title: {text: 'India'},
    credits: {enabled:  false},
    plotOptions: {
          pie: {
            allowPointSelect: true,
            dataLabels: {	enabled: false},
            size: 150,
            innerSize: '40%',
            center: ['50%', '40%']
          }
        },
        series: [{
          type: undefined,
          innerSize: '50%',
          data:  india_hashtag
      }]
        
  }
);
}}

columnChartForCountries(){
  this.data = this.tweetService.getData();
      let temp =JSON.stringify(this.data);       
       this.filterdata_country = this.postFilterData_country;
        this.data =this.filterdata_country;      
        let data =[];
        let res=[];
        let  chartData=[];
        let prop : Prop;
        let result=[]; 
        let data_country=[]  
        data_country=   this.filterdata_country;
        if(data_country && data_country.length>0){
            this.data.forEach(function(d) {
              data.push(d);   
            });
          
           for (let i = 0; i < this.data.length; i+=2) {
            res.push({name:this.data[i],y:[this.data[i+1]]})
          }  
        }
    
          this.columnChartOptions = new Chart( {
            chart: {
              type: "column",
              renderTo: "container"
            },
            credits: { enabled: false  },
            title: {   text: " Column Title"    },
            subtitle: {text: ""    },
            xAxis: { categories: ["Distribution of Tweets"]    },
            yAxis: { min: 0,  title: {        text: "Number of tweets"      }    },
            legend: {
              layout: "vertical",
              backgroundColor: "#FFFFFF",
              align: "left",
              verticalAlign: "top",
              x: 50,
              y: 70,
              floating: true,
              shadow: true
            },
            tooltip: {    },
            plotOptions: {
              column: {
                pointPadding: 0.2,  borderWidth: 0  }
            },
            series: res
          });
        
        }

        lineChartSentimentalAnalysis_poitweets(){
          this.data = this.tweetService.getData();
      let temp =JSON.stringify(this.data);
      this.tweetService.getpoiTweetsUrl(temp).subscribe(tweets=>{
        this.getpoiTweetsUrl_data = tweets.date;
        this.sentimentData = tweets.data;
         this.count = tweets&& tweets.data?Object.keys(tweets.data).length:0;
        let res=[];
        let data_neutral =[];
        let data_negative =[];
        let data_positive=[];
        let months_str =[];
        let month_array  = tweets&& tweets.data?Object.keys(tweets.data):[];
        for(let i=0;i<this.months.length;i++){
              if((month_array.indexOf(this.months[i]))!== -1){
              let monthData = this.sentimentData[this.months[i]];
              
              data_neutral.push(monthData[0].neutral)
              data_negative.push(monthData[0].negative)
              data_positive.push(monthData[0].positive)
              }
              else{
                  if(this.count >0){
                  data_neutral.push(0)
                  data_negative.push(0)
                  data_positive.push(0)
                  }
                 }
                 for(let i=0;i<this.months.length;i++){
                  months_str.push(this.months[i]+'-2019')
                }
        }
        res.push({name:'NEUTRAL',data:data_neutral,type:"line"})
        res.push({name:'NEGATIVE',data:data_negative,type:"line"})
        res.push({name:'POSITIVE',data:data_positive,type:"line"})

      this.sentimentsInfo = res;
  
      this.chart_poiTweets = new Chart({
        chart: { type: 'line' },
        title: { text: 'TIME SERIES OF TWEETS' },
        credits: { enabled: false  },
        xAxis : {categories: months_str},
        series: this.sentimentsInfo
      });
        
    });
    setTimeout (() => {    }, 3000);
        }

lineChartSentimentalAnalysis_poiReplies(){
  this.data = this.tweetService.getData();
      let temp =JSON.stringify(this.data);
      this.tweetService.getSentimentDetails(temp).subscribe(tweets=>{
      
      //this.tweetService.getpoiDetailsUrl(temp).subscribe(tweets=>{
        this.getSentimentDetails_countrydata = tweets.countrydata;
        this.getSentimentDetails_monthdata= tweets.monthdata;
        this.getSentimentDetails_countryhashtags = tweets.countryhashtags;
        this.getSentimentDetails_poidata = tweets.poidata;

        this.sentimentData = this.getSentimentDetails_monthdata
        this.count = tweets && tweets.monthdata?Object.keys(tweets.monthdata).length:0;
        let res=[];
        let data_neutral =[];
        let data_negative =[];
        let data_positive=[];
        let months_str=[];
        let month_array  = tweets && tweets.monthdata ?Object.keys(tweets.monthdata):[];
        for(let i=0;i<this.months.length;i++){
          if((month_array.indexOf(this.months[i]))!== -1){
          let monthData = this.sentimentData[this.months[i]];
          
          data_neutral.push(monthData[0].neutral)
          data_negative.push(monthData[0].negative)
          data_positive.push(monthData[0].positive)
          }
          else{
            if(this.count >0){
          data_neutral.push(0)
          data_negative.push(0)
          data_positive.push(0)
            }
          }
          for(let i=0;i<this.months.length;i++){
            months_str.push(this.months[i]+'-2019')
          }
        }
        res.push({name:'NEUTRAL',data:data_neutral,type:"line"})
        res.push({name:'NEGATIVE',data:data_negative,type:"line"})
        res.push({name:'POSITIVE',data:data_positive,type:"line"})

      this.sentimentsInfo = res;
  
      // this.chart = new Chart({
      //   chart: { type: 'line' },
      //   title: { text: 'TIME SERIES OF REPLIES TO POI TWEETS' },
      //   credits: { enabled: false  },
      //   xAxis : {categories: months_str},
      //   series: this.sentimentsInfo
      // });
        this.pie_CountriesWiseSentiments();
        this.poiSentiments();
        this.generateWorlMap();
        this.topicWiseCharts();
    });
    setTimeout (() => {    }, 3000);
}

getTweetReplies(){
  this.data = this.tweetService.getData();
      let temp =JSON.stringify(this.data);
      
      
      this.tweetService.getpoiDetailsUrl(temp).subscribe(tweets=>{
      
        //this.getSentimentDetails_poidata = tweets.poidata;
        this.getSentimentDetails_monthdata= tweets.poidata;

        this.sentimentData = this.getSentimentDetails_monthdata
        this.count = tweets && tweets.poidata?Object.keys(tweets.poidata).length:0;
        let res=[];
        let data_neutral =[];
        let data_negative =[];
        let data_positive=[];
        let months_str=[];
        let month_array  = tweets && tweets.poidata ?Object.keys(tweets.poidata):[];
        for(let i=0;i<this.months.length;i++){
          if((month_array.indexOf(this.months[i]))!== -1){
          let monthData = this.sentimentData[this.months[i]];
          
          data_neutral.push(monthData[0].neutral)
          data_negative.push(monthData[0].negative)
          data_positive.push(monthData[0].positive)
          }
          else{
            if(this.count >0){
          data_neutral.push(0)
          data_negative.push(0)
          data_positive.push(0)
            }
          }
          for(let i=0;i<this.months.length;i++){
            months_str.push(this.months[i]+'-2019')
          }
        }
        res.push({name:'NEUTRAL',data:data_neutral,type:"line"})
        res.push({name:'NEGATIVE',data:data_negative,type:"line"})
        res.push({name:'POSITIVE',data:data_positive,type:"line"})

      this.sentimentsInfo = res;
  
      this.chart = new Chart({
        chart: { type: 'line' },
        title: { text: 'TIME SERIES OF REPLIES TO POI TWEETS' },
        credits: { enabled: false  },
        xAxis : {categories: months_str},
        series: this.sentimentsInfo
      });
        
    });
    setTimeout (() => {    }, 3000);
}


    donutForHastags(){
      this.data = this.tweetService.getData();
      let temp =JSON.stringify(this.data);
      
      this.tweetService.postFilterData(temp).subscribe(tweets=>{
        
        let data_hastags=[];
        let data =[];
        let res=[];
        let  chartData=[];
        let prop : Prop;
        let result=[]
        this.filterdata_hashtags = tweets.hashtags;
        this.filterdata_country = tweets.country;
        this.filterdata_lang = tweets.tweet_lang; 

        this.postFilterData_country =tweets.country;
        this.postFilterData_hashtags=tweets.hashtags;
        this.postFilterData_sentiment=tweets.sentiment;
        this.postFilterData_tweet_lang=tweets.tweet_lang;
        this.postFilterData_verified=tweets.verified;
        this.postFilterData_topic = tweets.topic_str;
        
        
        data_hastags =this.postFilterData_hashtags;
      
      if(data_hastags && data_hastags.length>0){
           data_hastags.forEach(function(d) {
            data.push(d);   
           });
      } 
      if(this.postFilterData_hashtags && this.postFilterData_hashtags.length >0){
           for (let i = 0; i < this.postFilterData_hashtags.length; i+=2) {
             if(data[i+1]>0){
              this.prop = new Prop();
              this.prop.name= '#'+data[i];
              this.prop.y = data[i+1];
              chartData.push(this.prop)
             }
          }
        
          for(let i=0;i<chartData.length;i++){
              res.push({name:chartData[i].name,y:chartData[i].y,dataLabels: {  enabled: true  }})
           }
        }
    
      this.donutData = res;  
      this.doughnut = new Chart(
        {
          chart: {type: 'pie'	},
          title: {text: ''},
          credits: {enabled:  false},
          plotOptions: {
                pie: {
                  allowPointSelect: true,
                  dataLabels: {	enabled: false},
                  size: 250,
                  innerSize: '40%',
                  center: ['50%', '40%']
                }
              },
              series: [{
                type: undefined,
                innerSize: '50%',
                data:  this.donutData
            }]
              
        }
      );
      this.donutForLanguage();
      this.donutForCountries();
      this.columnChartForCountries();
      
    });
    setTimeout (() => {    }, 3000);   

    }
  
    donutForLanguage(){
      this.data = this.tweetService.getData();
      let temp =JSON.stringify(this.data);
       this.filterdata_lang = this.postFilterData_tweet_lang;
        this.data =this.filterdata_lang;
      
      let data =[];
      let res=[];
      let  chartData=[];
      let prop : Prop;
      let result=[]
      let data_lang=[];
      data_lang =this.filterdata_lang;
      if(data_lang && data_lang.length>0){
            this.data.forEach(function(d) {
              data.push(d);   
            });
          }
           
          let key=[];
          let val=[];
          let poiNamesList=[];
          for(let i=0;i <3;i++){ key.push(this.languages[i].key);val.push(this.languages[i].value.toLowerCase());}
      
          if(this.postFilterData_tweet_lang && this.postFilterData_tweet_lang.length >0){
           for (let i = 0; i < this.postFilterData_tweet_lang.length; i+=2) {
             if(data[i+1]>0){
              this.prop = new Prop();
              this.prop.name= data[i];
              this.prop.y = data[i+1];
              chartData.push(this.prop)
             }
          }
          for(let i=0;i<chartData.length;i++){
              res.push({name:key[val.indexOf(chartData[i].name)],y:chartData[i].y,dataLabels: {  enabled: true  }})
           }
          }
      //return res;
      this.donutData = res;
  
      this.doughnut_lang = new Chart(
        {
          chart: {type: 'pie'	},
          title: {text: ''},
          credits: {enabled:  false},
          plotOptions: {
                pie: {
                  allowPointSelect: true,
                  dataLabels: {	enabled: false},
                  size: 300,
                  innerSize: '50%',
                  center: ['50%', '40%']
                }
              },
              series: [{
                type: undefined,
                innerSize: '50%',
                data:  this.donutData
            }]
              
        }
      );
        
    }

    donutForCountries(){
      this.data = this.tweetService.getData();
      let temp =JSON.stringify(this.data);
      this.filterdata_country = this.postFilterData_country;
      this.data =this.filterdata_country;     
      let data =[];
      let res=[];
      let  chartData=[];
      let prop : Prop;
      let result=[]
      let data_c = this.filterdata_country;     
      if(data_c&& data_c.length>0){
           this.data.forEach(function(d) {
            data.push(d);   
           });
          }
           
           for (let i = 0; i < this.postFilterData_country.length; i+=2) {
             if(data[i+1]>0){
              this.prop = new Prop();
              this.prop.name= data[i];
              this.prop.y = data[i+1];
              chartData.push(this.prop)
             }
          }
          for(let i=0;i<chartData.length;i++){
              res.push({name:chartData[i].name,y:chartData[i].y,dataLabels: {  enabled: true  }})
           }
      //return res;
      this.donutData = res;
  
      this.doughnut_country = new Chart(
        {
          chart: {type: 'pie'	},
          title: {text: ''},
          credits: {enabled:  false},
          plotOptions: {
                pie: {
                  allowPointSelect: true,
                  dataLabels: {	enabled: false},
                  size: 300,
                  innerSize: '50%',
                  center: ['50%', '40%']
                }
              },
              series: [{
                type: undefined,
                innerSize: '50%',
                data:  this.donutData
            }]
              
        }
      );
        
    }

  pieChartOptions = new Chart( {
    chart: {
      renderTo: "container",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: "Título Pie"
    },
    subtitle: {
      text: "Subtítulo Pie"
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          color: "#000000",
          connectorColor: "#000000",          
        }
      }
    },
    series: [
      {
        type: "pie", name: "",
        data: [
          { name: 'A', y: 10 },
          { name: 'D', y: 130 },
          { name: 'LOL', y: 10 },
          { name: 'S', y: 10 },
          { name: 'W', y: 30 },
          { name: 'W', y: 70 },
        ]
      }
    ]
  });

// ------------------------------------------------------------------------------------------------------------
// DONUT AND PIE Chart
// ------------------------------------------------------------------------------------------------------------

  
doughnut = new Chart(
  {
    chart: {type: 'pie'	},
    title: {text: ''},
    credits: {enabled:  false},
		plotOptions: {
					pie: {
            allowPointSelect: true,
						dataLabels: {	enabled: false},
						size: 300,
						innerSize: '50%',
						center: ['50%', '40%']
					}
        },
        series: [{
          type: undefined,
          innerSize: '50%',
          data:  this.donutData
      }]
				
  }
);
doughnut_lang = new Chart(
  {
    chart: {type: 'pie'	},
    title: {text: ''},
    credits: {enabled:  false},
		plotOptions: {
					pie: {
            allowPointSelect: true,
						dataLabels: {	enabled: false},
						size: 300,
						innerSize: '50%',
						center: ['50%', '40%']
					}
        },
        series: [{
          type: undefined,
          innerSize: '50%',
          data:  this.donutData
      }]
				
  }
);
doughnut_country = new Chart(
  {
    chart: {type: 'pie'	},
    title: {text: ''},
    credits: {enabled:  false},
		plotOptions: {
					pie: {
            allowPointSelect: true,
						dataLabels: {	enabled: false},
						size: 300,
						innerSize: '50%',
						center: ['50%', '40%']
					}
        },
        series: [{
          type: undefined,
          innerSize: '50%',
          data:  this.donutData
      }]
				
  }
);
// ------------------------------------------------------------------------------------------------------------

// verified = 100
// non_verified = 90

// doughnut_for_verified = new Chart(
//   {
//     chart: {
// 					renderTo: 'photoUploadChart',
// 					type: 'pie'
// 				},
// 				title: {
// 					text: 'Donut Chart'
// 				},

// 				credits: {                                 
// 					enabled:  false                          
// 				},
// 				plotOptions: {
// 					pie: {
//             allowPointSelect: true,
// 						dataLabels: {
// 							enabled: false
// 						},
// 						size: 200,
// 						innerSize: '50%',
// 						center: ['50%', '40%']
// 					}
//         },
//         series: [{
//           type: 'pie',
//           name: 'Browser share',
//           innerSize: '50%',
//           data: [
//               ['VERIFIED', this.verified],
//               ['NOT-VERIFIED', this.non_verified],
              
//               {
//                   name: 'Other',
//                   y: 200-this.non_verified-this.verified,
//                   dataLabels: {
//                       enabled: false
//                   }
//               }
//           ]
//       }]
				
//   }
// );
  

poiSentiments(){
let poiList =this.getSentimentDetails_poidata?Object.keys(this.getSentimentDetails_poidata):[];
let positive_data=[];
let negative_data =[];
let neutral_data =[];
let series_data =[];

let key=[];
let val=[];
let poiNamesList=[];
for(let i=0;i <16;i++){ key.push(this.poiNames[i].key);val.push(this.poiNames[i].value.toLowerCase())}
for(let i=0;i < poiList.length;i++){
  let index =val.indexOf(poiList[i]);
  poiNamesList.push(key[index]);
}


for(let i=0;i < poiList.length;i++){
    positive_data.push(this.getSentimentDetails_poidata[poiList[i]][0].positive);
    negative_data.push(this.getSentimentDetails_poidata[poiList[i]][0].negative);
    neutral_data.push(this.getSentimentDetails_poidata[poiList[i]][0].neutral);
}
series_data.push({name:'NEUTRAL',data:neutral_data,type:undefined});
series_data.push({name:'NEGATIVE',data:negative_data,type:undefined});
series_data.push({name:'POSITIVE',data:positive_data,type:undefined});

this.stackedBarChart =new Chart({
chart: {    type: 'bar'},
title: {    text: ''},
xAxis: {    categories: poiNamesList},
yAxis: {    min: 0,    title: {   text: 'Number of Tweets'    }},
legend: {    reversed: true},
plotOptions: {
    series: {        stacking: 'normal'    }
},
series: series_data
 });
}



generateWorlMap(){
let worldData = this.filterdata_country;
let count_brazil =0;
let count_usa =0;
let count_india =0;
let series_data =[];

if(this.filterdata_country && Object.keys(this.filterdata_country).length >0){

    if(this.filterdata_country && this.filterdata_country.brazil && this.filterdata_country.brazil[0]){
    count_brazil =this.filterdata_country.brazil[0].positive +this.filterdata_country.brazil[0].negative + this.filterdata_country.brazil[0].neutral;
    series_data.push(['br',count_brazil]);
    }
    if(this.filterdata_country && this.filterdata_country.usa && this.filterdata_country.usa[0]){
      count_usa =this.filterdata_country.usa[0].positive +this.filterdata_country.usa[0].negative + this.filterdata_country.usa[0].neutral;
      series_data.push(['us',count_usa]);
      }
    if(this.filterdata_country && this.filterdata_country.india && this.filterdata_country.india[0]){
      count_india =this.filterdata_country.india[0].positive +this.filterdata_country.india[0].negative + this.filterdata_country.india[0].neutral;
      series_data.push(['in',count_india]);
      }

    this.mapChart = new MapChart({
      chart: {
        map: mapdataJSon,  
        backgroundColor: '#B0D2F2',
          borderWidth: 1  },
      title: {    text: 'Distribution of Tweets'  },
      subtitle: {
        text: ''
      },
      legend: {    enabled: false  },

      mapNavigation: {    enabled: true,    buttonOptions: {      verticalAlign: 'bottom'    }  },

      series: [{
        type: undefined,
        name: 'Tweets',
        color: '#5A8CE8',
        enableMouseTracking: true,
       // data:[['br', count_brazil],['us',count_usa],['in',count_india]],
       data: series_data,
      states: {
        hover: {
            color: '#BADA55'
        }
    },
    dataLabels: {
      enabled: true
    }
      }]
    });
    }
}

topicWiseCharts(){
  let data =[];
  let chartData=[];
  let res=[];
  let data_hastags =this.postFilterData_topic;
      
      if(data_hastags && data_hastags.length>0){
           data_hastags.forEach(function(d) {
            data.push(d);   
           });
      } 
           for (let i = 0; i < this.postFilterData_topic.length; i+=2) {
             if(data[i+1]>0){
              this.prop = new Prop();
              this.prop.name= data[i];
              this.prop.y = data[i+1];
              chartData.push(this.prop)
             }
          }
          for(let i=0;i<chartData.length;i++){
              res.push({name:chartData[i].name,y:chartData[i].y, type: undefined,})
           }

  this.topicWiseChart =new Chart({
    chart: {    type: 'column'},
    title: {    text: ''},
    xAxis: {   type: 'category'},
    yAxis: {    min: 0,    title: {   text: 'Number of Tweets'    }},
    legend: {    reversed: true},
    plotOptions: {
        series: {                    
          borderWidth: 0,
          dataLabels: {
              enabled: true
          }
          }
    },
    series: [
      {
          name: "Tweet Topics",
          colorByPoint: true,
          type: undefined,
          data : res,
         
      }
  ]


     });

}
 
}
