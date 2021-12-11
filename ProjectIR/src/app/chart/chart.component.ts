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
  languages=[{key:'English', value:'en'},{key:'Hindi', value:'hi'},{key:'Spanish', value:'es'}]

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
  doughnut_senti_poi:any = [];
  doughnut_senti_poi_replies:any = [];
  doughnut_senti_vaccines:any = [];
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
  pie_mexico= new Chart({});

  pie_India_hashtags= new Chart({});
  pie_usa_hashtags= new Chart({});
  pie_mexico_hashtags= new Chart({});
  
  pie_poi_reply_subj= new Chart({});
  pie_poi_subj= new Chart({});
  pie_vacc_subj = new Chart({});

  loading_complete=true;

  options: any = {};
  count =0;
  wordData1: any = [];
  postFilterData_country =[];
  postFilterData_hashtags=[];
  postFilterData_tweet_lang=[];
  postFilterData_verified=[];
  postFilterData_topic = [];
  wordData=new Array<AgWordCloudData>();

  postFilterData_poiSentiment_neg;
  postFilterData_poiSentiment_neutral;
  postFilterData_poiSentiment_pos;

  postFilterData_poiSentiment_neg_rep;
  postFilterData_poiSentiment_neutral_rep;
  postFilterData_poiSentiment_pos_rep;

  country_metrics;
  lang_metrics;

  postFilterData_vaccSentiment_neg;
  postFilterData_vaccSentiment_neutral;
  postFilterData_vaccSentiment_pos;

  postFilterData_opinions_poi;
  postFilterData_facts_poi;
  postFilterData_opinions_poi_reply;
  postFilterData_facts_poi_reply;
  postFilterData_opinions_vac;
  postFilterData_facts_vac;

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
          setTimeout(this.donutDonut(), 5000);  //postfilter
      });
    });

    this.tweetService.value$.subscribe(obj=>
          {this.homeObj = obj;
          this.tweetService.postData(this.homeObj).subscribe(tweets=>{
            this.postFilterData_vaccSentiment_neg=tweets.vaccines_sentiment.negative_sentiment_count;
            this.postFilterData_vaccSentiment_pos=tweets.vaccines_sentiment.pos_sentiment_count;

            this.postFilterData_opinions_poi=tweets.subjectivity.opinions_poi;
            this.postFilterData_facts_poi=tweets.subjectivity.facts_poi;
            this.postFilterData_opinions_poi_reply=tweets.subjectivity.opinions_poi_reply;
            this.postFilterData_facts_poi_reply=tweets.subjectivity.facts_poi_reply;
            this.postFilterData_opinions_vac=tweets.subjectivity.opinions_vac;
            this.postFilterData_facts_vac=tweets.subjectivity.facts_vac;

            setTimeout(this.donutForSentimentVaccines_mine(), 5000);  //postfilter
            setTimeout(this.donutForSubjectivity_vacc_mine(), 5000);  //postfilter
            setTimeout(this.donutForSubjectivity_poi_mine(), 5000);  //postfilter
            setTimeout(this.donutForSubjectivity_poi_reply_mine(), 5000);  //postfilter
          });
    });

    if(this.searchText){
      this.obj.query= this.searchText;
  }

}

ngOnInit() {
let a=[]
let b=[]
setTimeout(this.donutForHastags(), 5000);
setTimeout(this.donutDonut(), 5000);
}


pie_CountriesWiseSentiments(){
  this.data = this.tweetService.getData();
  let temp =JSON.stringify(this.data);

  this.pie_India =new Chart({title: {text: 'India'}});
  this.pie_mexico =new Chart({title: {text: 'Mexico'}});
  this.pie_usa =new Chart({title: {text: 'USA'}});
  this.pie_India_hashtags =new Chart({title: {text: 'India'}});
  this.pie_mexico_hashtags =new Chart({title: {text: 'Mexico'}});
  this.pie_usa_hashtags =new Chart({title: {text: 'USA'}});
  this.topicWiseChart = new Chart({});

    this.filterdata_country = this.getSentimentDetails_countrydata;
    this.data =this.filterdata_country;
    let data =[];
    let res=[];
    let data_pie=[];
    let india=[]
    let usa=[];
    let mexico=[];
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

        if(countries_array.indexOf("mexico") !== -1){
          mexico.push({name:'POSITIVE',y:data_pie["mexico"][0].positive});
          mexico.push({name:'NEGATIVE',y:data_pie["mexico"][0].negative});
          mexico.push({name:'NEUTRAL',y:data_pie["mexico"][0].neutral});
        }
        else{
          mexico.push({name:'POSITIVE',y:0});
          mexico.push({name:'NEGATIVE',y:0});
          mexico.push({name:'NEUTRAL',y:0});

        }

      let countryList = this.getSentimentDetails_countryhashtags?Object.values(this.getSentimentDetails_countryhashtags):[];
      let india_hashtag =[]
      let mexico_hashtag=[];
      let usa_hashtag =[];
      let all_hashtags =[];
      let indiaHashtaglist =this.getSentimentDetails_countryhashtags.india.length>0  && JSON.stringify(this.getSentimentDetails_countryhashtags.india[0]) !== '{}'? Object.keys(this.getSentimentDetails_countryhashtags.india[0]):[];
      let mexicoHashtaglist =this.getSentimentDetails_countryhashtags.mexico.length>0 && JSON.stringify(this.getSentimentDetails_countryhashtags.mexico[0]) !== '{}'? Object.keys(this.getSentimentDetails_countryhashtags.mexico[0]):[];
      let usaHashtaglist =this.getSentimentDetails_countryhashtags.usa.length>0 && JSON.stringify(this.getSentimentDetails_countryhashtags.usa[0]) !== '{}'? Object.keys(this.getSentimentDetails_countryhashtags.usa[0]):[];

      if(indiaHashtaglist.length ==0 && mexicoHashtaglist.length==0 && usaHashtaglist.length==0){

      }
        for(let i=0;i<mexicoHashtaglist.length;i++){
          if(Object.keys(this.getSentimentDetails_countryhashtags.mexico[0]).length> 0){
          let values = Object.values(this.getSentimentDetails_countryhashtags.mexico[0])
          mexico_hashtag.push({name:'#'+mexicoHashtaglist[i],y:values[i],dataLabels: {  enabled: true  }});
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

      if(countries_array.indexOf("mexico") !== -1){
      this.pie_mexico = new Chart( {
        chart: {
          renderTo: "container",
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        credits: {  enabled: false  },
        title: {    text: "Mexico" },
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
            data: mexico
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
if(this.getSentimentDetails_countryhashtags.mexico && this.getSentimentDetails_countryhashtags.mexico.length> 0 && JSON.stringify(this.getSentimentDetails_countryhashtags.mexico[0]) !='{}'){
this.pie_mexico_hashtags = new Chart(
  {
    chart: {type: 'pie'	},
    title: {text: 'Mexico'},
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
          data:  mexico_hashtag
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

    donutDonut(){
          this.data = this.tweetService.getData();
          let temp =JSON.stringify(this.data);

          this.tweetService.postData(temp).subscribe(tweets=>{

          this.postFilterData_vaccSentiment_neg=tweets.vaccines_sentiment.negative_sentiment_count;
          this.postFilterData_vaccSentiment_pos=tweets.vaccines_sentiment.pos_sentiment_count;

            this.postFilterData_opinions_poi=tweets.subjectivity.opinions_poi;
            this.postFilterData_facts_poi=tweets.subjectivity.facts_poi;
            this.postFilterData_opinions_poi_reply=tweets.subjectivity.opinions_poi_reply;
            this.postFilterData_facts_poi_reply=tweets.subjectivity.facts_poi_reply;
            this.postFilterData_opinions_vac=tweets.subjectivity.opinions_vac;
            this.postFilterData_facts_vac=tweets.subjectivity.facts_vac;

          this.donutForSentimentVaccines_mine();
            setTimeout(this.donutForSubjectivity_vacc_mine(), 5000);  //postfilter
            setTimeout(this.donutForSubjectivity_poi_mine(), 5000);  //postfilter
            setTimeout(this.donutForSubjectivity_poi_reply_mine(), 5000);  //postfilter
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
        this.postFilterData_tweet_lang=tweets.tweet_lang;
        this.postFilterData_verified=tweets.verified;
        this.postFilterData_topic = tweets.topic_str;

        this.postFilterData_poiSentiment_neg=tweets.metrics.poi_sentiment.negative_sentiment_count;
        this.postFilterData_poiSentiment_neutral=tweets.metrics.poi_sentiment.neutral_sentiment_count;
        this.postFilterData_poiSentiment_pos=tweets.metrics.poi_sentiment.pos_sentiment_count;

        this.postFilterData_poiSentiment_neg_rep=tweets.metrics.poi_sentiment_replies.negative_sentiment_count;
        this.postFilterData_poiSentiment_neutral_rep=tweets.metrics.poi_sentiment_replies.neutral_sentiment_count;
        this.postFilterData_poiSentiment_pos_rep=tweets.metrics.poi_sentiment_replies.pos_sentiment_count;

        this.country_metrics=tweets.country_metrics;
        this.lang_metrics=tweets.lang_metrics;

        data_hastags =this.postFilterData_hashtags;

      console.log("...............................Data Update ???...................................")
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
      console.log("THIS DONUT DATA: ",this.donutData)
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
      this.donutForSentimentPoi_mine();
      this.donutForSentimentPoi_replies_mine();
    });
    setTimeout (() => {    }, 3000);

    }

//---------------------ATP

  donutForSentimentPoi_mine(){
      let  chartData=[];
      let res=[];
      let prop : Prop;

      this.prop = new Prop();
      this.prop.name= "Negative";
      this.prop.y = this.postFilterData_poiSentiment_neg;
      chartData.push(this.prop)

      this.prop = new Prop();
      this.prop.name= "Neutral";
      this.prop.y = this.postFilterData_poiSentiment_neutral;
      chartData.push(this.prop)

      this.prop = new Prop();
      this.prop.name= "Positive";
      this.prop.y = this.postFilterData_poiSentiment_pos;
      chartData.push(this.prop)

      for(let i=0;i<chartData.length;i++){
          res.push({name:chartData[i].name,y:chartData[i].y,dataLabels: {  enabled: true  }})
       }

      this.donutData = res;

      this.doughnut_senti_poi = new Chart(
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

  donutForSentimentPoi_replies_mine(){
      //CHECK1
      let  chartData=[];
      let res=[];
      let prop : Prop;

      this.prop = new Prop();
      this.prop.name= "Negative";
      this.prop.y = this.postFilterData_poiSentiment_neg_rep;
      chartData.push(this.prop)

      this.prop = new Prop();
      this.prop.name= "Neutral";
      this.prop.y = this.postFilterData_poiSentiment_neutral_rep;
      chartData.push(this.prop)

      this.prop = new Prop();
      this.prop.name= "Positive";
      this.prop.y = this.postFilterData_poiSentiment_pos_rep;
      chartData.push(this.prop)

      for(let i=0;i<chartData.length;i++){
          res.push({name:chartData[i].name,y:chartData[i].y,dataLabels: {  enabled: true  }})
       }

      this.donutData = res;

      this.doughnut_senti_poi_replies = new Chart(
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

  donutForSentimentVaccines_mine(){
      //CHECK1
      let  chartData=[];
      let res=[];
      let prop : Prop;

      this.prop = new Prop();
      this.prop.name= "Anti-Vaccine";
      this.prop.y = this.postFilterData_vaccSentiment_neg;
      chartData.push(this.prop)

//       this.prop = new Prop();
//       this.prop.name= "Neutral";
//       this.prop.y = this.postFilterData_vaccSentiment_neutral;
//       chartData.push(this.prop)

      this.prop = new Prop();
      this.prop.name= "Pro-Vaccine";
      this.prop.y = this.postFilterData_vaccSentiment_pos;
      chartData.push(this.prop)

      for(let i=0;i<chartData.length;i++){
          res.push({name:chartData[i].name,y:chartData[i].y,dataLabels: {  enabled: true  }})
       }

      this.donutData = res;

      this.doughnut_senti_vaccines = new Chart(
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


    donutForSubjectivity_poi_mine(){
          //CHECK1
          let  chartData_poi=[];
          let res_poi=[];
          let prop : Prop;

          this.prop = new Prop();
          this.prop.name= "Facts";
          this.prop.y = this.postFilterData_facts_poi;
          chartData_poi.push(this.prop)

          this.prop = new Prop();
          this.prop.name= "Opinions";
          this.prop.y = this.postFilterData_opinions_poi;
          chartData_poi.push(this.prop)

          for(let i=0;i<chartData_poi.length;i++){
              res_poi.push({name:chartData_poi[i].name,y:chartData_poi[i].y,dataLabels: {  enabled: true  }})
           }

          this.donutData = res_poi;

          this.pie_poi_subj = new Chart(
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

donutForSubjectivity_poi_reply_mine(){
          //CHECK1


          let  chartData_poi_reply=[];
          let res_poi_reply=[];
          let prop : Prop;


      this.prop = new Prop();
      this.prop.name= "Facts";
      this.prop.y = this.postFilterData_facts_poi_reply;
      chartData_poi_reply.push(this.prop)

      this.prop = new Prop();
      this.prop.name= "Opinions";
      this.prop.y = this.postFilterData_opinions_poi_reply;
      chartData_poi_reply.push(this.prop)

      for(let i=0;i<chartData_poi_reply.length;i++){
          res_poi_reply.push({name:chartData_poi_reply[i].name,y:chartData_poi_reply[i].y,dataLabels: {  enabled: true  }})
       }

      this.donutData = res_poi_reply;

      this.pie_poi_reply_subj = new Chart(
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

donutForSubjectivity_vacc_mine(){

           let  chartData_vacc=[];
           let res_vacc=[];
           let prop : Prop;

            this.prop = new Prop();
            this.prop.name= "Facts";
            this.prop.y = this.postFilterData_facts_poi_reply;
            chartData_vacc.push(this.prop)

            this.prop = new Prop();
            this.prop.name= "Opinions";
            this.prop.y = this.postFilterData_opinions_poi_reply;
            chartData_vacc.push(this.prop)

            for(let i=0;i<chartData_vacc.length;i++){
                res_vacc.push({name:chartData_vacc[i].name,y:chartData_vacc[i].y,dataLabels: {  enabled: true  }})
             }

            this.donutData = res_vacc;

            this.pie_vacc_subj = new Chart(
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
//--------------------//


    donutForLanguage(){
      //CHECK1
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
