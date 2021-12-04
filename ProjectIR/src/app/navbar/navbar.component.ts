import { Component } from '@angular/core';
import {Filter } from '../models/filter.model';
import {TweetService} from 'src/app/services/tweet.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

   model = new Filter();
    country=[];
    lang=[];
    obj  =new Filter();
    result_obj :any;
    selectedUSTopics=[]
    selectedMexicoTopics =[];
    selectedIndiaTopics=[];
    result :any;
    searchText : string = '';
    from_model;
    to_model;
    filterOpen = false;
    showLanguages: boolean = false;
    showCountries:boolean = false;
    showTopics:boolean = false;
    showTopicsUS:boolean = false;
    showTopicsIndia:boolean = false;
    showTopicsMexico:boolean = false;
    showSentiments:boolean = false;
    showHashtags:boolean = false;
    selectedUS: boolean = false;
    selectedIndia: boolean = false;
    selectedMexico: boolean = false;
    selectedLang:boolean =false;
    showPois: boolean = false;
    homeObj= new Filter();

    languages=[{key:'English', value:'en',status:false},
        {key:'Hindi', value:'hi',status:false},{key:'Spanish', value:'es',status:false}]

    countries = [{key:'USA',status:false},{key:'India',status:false},{key:'Mexico',status:false}];

    topics = {
        India:['Happy Birthday Modi','Politics','ISRO','Railway','Development Policies'],
        US: ['Health Care','Gun control','Climate Change','Election Campaign',"Trump's Policies",'Minimum wage and taxes'],
        Mexico:['Government policies','Presidential candidate','Corruption','Justice for Lula','Democracy']
    }
    sentiments =[
        {key:'Positive', value:'Positive',status:false},
        {key:'Negative', value:'Negative',status:false},
        {key:'Neutral', value:'Neutral',status:false}
    ]
    poiNames = [{key:'PMO India',value:'PMOIndia',status:false},
                {key:'Narendra Modi',value:'narendramodi',status:false},
                {key:'Shashi Tharoor', value:'ShashiTharoor',status:false},
                {key:'Mansukh Mandviya',value:'mansukhmandviya',status:false},
                {key:'Ayushman NHA',value:'AyushmanNHA',status:false},
                {key:'Rahul Gandhi',value:'RahulGandhi',status:false},
                {key:'Enrique Peña Nieto',value:'EPN',status:false},
                {key:'Felipe Calderon',value:'FelipeCalderon',status:false},
                {key:'Andrés Manuel López Obrador',value:'lopezobrador_',status:false},
                {key:'Miguel Ángel Mancera',value:'ManceraMiguelMX',status:false},
                {key:'Claudia Shein',value:'Claudiashein',status:false},
                {key:'Joe Biden',value:'JoeBiden',status:false},
                {key:'POTUS',value:'POTUS',status:false},
                {key:'CDC gov',value:'CDCgov',status:false},
                {key:'Barack Obama',value:'BarackObama',status:false},
                {key:'Marcelo Ebrard',value:'m_ebrard',status:false},
                {key:'Ministry of Health India',value:'MoHFW_INDIA',status:false},
                {key:'U.S. Department of Health & Human Services',value:'HHSGov',status:false},
                {key:'Ted Cruz',value:'tedcruz',status:false},
                {key:'Marco Rubio',value:'marcorubio',status:false},
                {key:'Amit Shah',value:'AmitShah',status:false},
                {key:'World Health Organization',value:'WHO',status:false},
                {key:'CDC Global',value:'CDCGlobal',status:false},
                {key:'White House USA',value:'WhiteHouse',status:false}
                ];

    hashtags = [{key:'isro',status:false},
                {key:'chandrayaan2',status:false},
                {key:'lulalivre',status:false},
                {key:'showdopalocci',status:false},
                {key:'vikramlander',status:false},
                {key:'euconfioembolsonaro',status:false},
                {key:'bolsonaropresidenteate2026',status:false},
                {key:'trump2020',status:false},
                {key:'euapoioopresidente',status:false},
                {key:'proudofisro',status:false}];

    checkedHashtags = [];

        constructor(private tweetService: TweetService, private http: HttpClient,private router: Router) {}
        ngOnInit() {
        }

        openNav(filterOpen) {
            this.tweetService.setFilterStatus(filterOpen);
        }

    closeNav(filterOpen) {
        this.tweetService.setFilterStatus(filterOpen);
    }

     Initialize(){
        this.selectedUS = false;
        this.selectedIndia  =false;
        this.selectedMexico = false;

        for (var i = 0; i < this.languages.length; i++) {
            this.languages[i].status = false;
        }
        for (var i = 0; i < this.countries.length; i++) {
            this.countries[i].status = false;
        }
        for (var i = 0; i < this.poiNames.length; i++) {
            this.poiNames[i].status = false;
        }
        for (var i = 0; i < this.sentiments.length; i++) {
            this.sentiments[i].status = false;
        }
        for (var i = 0; i < this.hashtags.length; i++) {
            this.hashtags[i].status = false;
        }
        this.checkedHashtags = [];
        this.obj = new Filter();
        }

     onSearch(this){
		this.obj.hashtags = [];
		for (var i = 0; i < this.hashtags.length; i++) {
            this.hashtags[i].status = false;
        }
        this.checkedHashtags = [];
        if(this.searchText){
            this.obj.query= this.searchText;
            console.log("OBJEDT QUERY",this.obj.query);
        }
        let temp =JSON.stringify(this.obj);
        this.tweetService.setHomeData(this.obj);
        this.tweetService.postData(temp).subscribe(a=> console.log("Here: ",a));
        this.tweetService.setData(this.obj);
        this.homeObj = JSON.parse(JSON.stringify(this.obj));
        this.tweetService.postFilterData(this.homeObj).subscribe(data=>{
            setTimeout(this.loadHashtags(data.hashtags),500)
        })
        }

        loadHashtags(data){
            this.hashtags = [];
            for(var i = 0; i < data.length; i= i+2){
                this.hashtags.push({key:data[i],status:false});
            }
            if (this.checkedHashtags.length != 0){
                console.log(this.checkedHashtags);
                for(var i = 0;i < this.checkedHashtags.length; i++){
                    for (var j = 0; j < this.hashtags.length; j++){
                        if(this.hashtags[j].key == this.checkedHashtags[i]){
                            this.hashtags[j].status = true;
                            break;
                        }
                    }
                }
            }

         }
     //Form Submit
     onSubmit(this){

        if(this.searchText){
            console.log('searchText: ',this.searchText)
            this.obj.query= this.searchText;
        }
        console.log('ABCDS: ',this.obj)
        let temp =JSON.stringify(this.obj);
        this.homeObj = JSON.parse(JSON.stringify(this.obj));
        this.tweetService.setHomeData(this.obj);
        this.tweetService.postData(temp).subscribe(a=> console.log(a));
        this.tweetService.setData(this.obj);
		this.tweetService.postFilterData(this.homeObj).subscribe(data=>{
            setTimeout(this.loadHashtags(data.hashtags),500)
        })
      }

      onLanguageSelect(event){
        for(var i = 0;i < this.languages.length; i++){
            if(event.target.name == this.languages[i].value){
                  this.languages[i].status = !this.languages[i].status;
            }
        }
          if(this.obj.languages && this.obj.languages.length >=0){
            if (this.obj.languages.indexOf(event.target.name)==-1){
                this.obj.languages.push(event.target.name);
              }
              else{
                this.obj.languages.splice( this.obj.languages.indexOf(event.target.name),1);
              }
          }
      }

      onCountrySelect(event){
        for(var i = 0;i < this.countries.length; i++){
            if(event.target.name == this.countries[i].key){
                  this.countries[i].status = !this.countries[i].status;
            }
        }
          if(this.obj.countries && this.obj.countries.length >=0){
            if (this.obj.countries.indexOf(event.target.name)==-1){
                this.obj.countries.push(event.target.name);
              }
              else{
                this.obj.countries.splice( this.obj.countries.indexOf(event.target.name),1);
              }
          }
      }
        //For individual US Topic
      onCheckUS(event){
        let index;

        if(this.obj.USATopics && this.obj.countries &&this.obj.countries.length >=0 && this.obj.USATopics.length >=0 ){
             index =this.obj.USATopics.indexOf(event.target.name);

        }
             if (index ==-1){
                if (!this.obj.countries.includes("USA")){
                    this.obj.countries.push('USA');
                } this.obj.USATopics.push(event.target.name);
              }
              else{ this.obj.USATopics.splice(index,1);
                if(this.obj.USATopics.length == 0){
                    this.obj.countries.splice(this.obj.countries.indexOf("USA"),1);
                    this.selectedUS = false;
                }
              }

      }
      onCheckMexico(event){
        let index;
        let index_US
        if(this.obj.MexicoTopics && this.obj.countries &&this.obj.countries.length >=0 && this.obj.MexicoTopics.length >=0 ){
             index =this.obj.MexicoTopics.indexOf(event.target.name);
                     }
             if (index ==-1){
                 if (!this.obj.countries.includes("Mexico")){
                    this.obj.countries.push('Mexico');
                }
                this.obj.MexicoTopics.push(event.target.name);
              }
              else{
                this.obj.MexicoTopics.splice(index,1);
                if(this.obj.MexicoTopics.length == 0){
                    this.obj.countries.splice(this.obj.countries.indexOf("Mexico"),1);
                    this.selectedMexico = false;
                }
            }


      }
      onCheckIndia(event){
        let index;

        if(this.obj.IndiaTopics && this.obj.countries &&this.obj.countries.length >=0 && this.obj.IndiaTopics.length >=0 ){
             index =this.obj.IndiaTopics.indexOf(event.target.name);

        }
             if (index ==-1){
                if (!this.obj.countries.includes("India")){
                    this.obj.countries.push('India');
                }

                this.obj.IndiaTopics.push(event.target.name);
              }
              else{
                this.obj.IndiaTopics.splice(index,1);
                if(this.obj.IndiaTopics.length == 0){
                    this.obj.countries.splice(this.obj.countries.indexOf("India"),1);
                    this.selectedIndia = false;
                }
              }

      }
    onCheckOfAllUSTopics(event){

         if(this.obj.USATopics.length <= this.topics.US.length && this.obj.USATopics.length > 0)
        {
            this.obj.USATopics =[]
            //let index =this.obj.countries.indexOf("USA");
            //this.obj.countries.splice(index,1);
        }
        else
        {
        this.obj.USATopics = JSON.parse(JSON.stringify(this.topics.US));
        //this.obj.countries.push('USA');
         }

    }
    onCheckOfAllMexicoTopics(event){
        if(this.obj.MexicoTopics.length <= this.topics.US.length && this.obj.MexicoTopics.length > 0)
       {this.obj.MexicoTopics =[]
        //    let index =this.obj.countries.indexOf("Brazil");
        //    this.obj.countries.splice(index,1);
       }
       else
       {
        this.obj.MexicoTopics = JSON.parse(JSON.stringify(this.topics.Mexico));
        //this.obj.countries.push('Mexico');
       }

   }
   onCheckOfAllIndiaTopics(event){
    if(this.obj.IndiaTopics.length <= this.topics.US.length && this.obj.IndiaTopics.length > 0)
   {this.obj.IndiaTopics =[]
    //    let index =this.obj.countries.indexOf("India");
    //    this.obj.countries.splice(index,1);
   }
   else
   {
    this.obj.IndiaTopics = JSON.parse(JSON.stringify(this.topics.India));
    //this.obj.countries.push('India');
    }

}


//For Individual POI
onPoiName(event){
    for(var i = 0;i < this.poiNames.length; i++){
        if(event.target.name == this.poiNames[i].value){
              this.poiNames[i].status = !this.poiNames[i].status;
        }
    }
    let index;

    if(this.obj.POIUsername &&  this.obj.POIUsername.length >=0 ){
         index =this.obj.POIUsername.indexOf(event.target.name);

    }
         if (index ==-1){
            this.obj.POIUsername.push(event.target.name);
          }
          else{ this.obj.POIUsername.splice(index,1);
          }

  }


  //For Sentiments
  onSentimentSelect(event){
    for(var i = 0;i < this.sentiments.length; i++){
        if(event.target.name == this.sentiments[i].value){
              this.sentiments[i].status = !this.sentiments[i].status;
        }
    }
    if(this.obj.sentiments && this.obj.sentiments.length >=0){
      if (this.obj.sentiments.indexOf(event.target.name)==-1){
          this.obj.sentiments.push(event.target.name);
        }
        else{
          this.obj.sentiments.splice( this.obj.sentiments.indexOf(event.target.name),1);
        }
    }

}
onHashtagSelect(event){
    for(var i = 0;i < this.hashtags.length; i++){
        if(event.target.name == this.hashtags[i].key){
              this.hashtags[i].status = !this.hashtags[i].status;
              if(this.hashtags[i].status == true){
                this.checkedHashtags.push(this.hashtags[i].key);
            }
        }
    }
    if(this.obj.hashtags && this.obj.hashtags.length >= 0){
        if(this.obj.hashtags.indexOf(event.target.name)==-1){
            this.obj.hashtags.push(event.target.name);
        }
        else{
            this.obj.hashtags.splice(this.obj.hashtags.indexOf(event.target.name),1);
        }
    }
}

openHome(){
    this.tweetService.setHomeData(this.homeObj);
    this.tweetService.setFilterStatus(this.filterOpen)
}

openChart(){
    this.tweetService.setHomeData(this.homeObj);
}

}
