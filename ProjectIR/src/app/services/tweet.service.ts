import {Injectable} from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Tweet} from 'src/app/models/tweet.model';
import {Observable} from'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { URLSearchParams } from '@angular/http';
import { Filter } from '../models/filter.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject }    from 'rxjs/Subject';


let urlSearchParams = new URLSearchParams();



const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    'Access-Control-Allow-Origin':'true'
     
    })
  };

let head = new Headers;
@Injectable()
export class TweetService {
    url:string = './assets/json/tweets.json';
    searchurl='http://127.0.0.1:5000/getDetails/'
    filterurl ='http://127.0.0.1:5000/getFilterDetails/'
    news_url:string = "http://127.0.0.1:5000/getNewsArticles/";
    SentimentDetailsurl ='http://127.0.0.1:5000/getSentimentDetails/'
    poiRepliesUrl='http://127.0.0.1:5000/getSentimentDetails/'
    poiTweetsUrl= 'http://127.0.0.1:5000/getverifiedSentimentDetails/'
    getPOIDetails = 'http://127.0.0.1:5000/getPOIDetails/'

    // searchurl='http://13.58.175.62/getDetails/'
    // filterurl ='http://13.58.175.62/getFilterDetails/'
    // news_url:string = "http://13.58.175.62/getNewsArticles/";
    // SentimentDetailsurl ='http://13.58.175.62/getSentimentDetails/'
    // poiRepliesUrl='http://13.58.175.62/getSentimentDetails/'
    // poiTweetsUrl= 'http://13.58.175.62/getverifiedSentimentDetails/'
    // getPOIDetails = 'http://13.58.175.62/getPOIDetails/'


    private val:any = undefined;
    private value = new Subject<any>(); 
    value$ = this.value.asObservable();
  
    private filterOpen = new Subject<boolean>();
    filterOpen$ = this.filterOpen.asObservable();

    tweets: Tweet[];
    constructor(private http: HttpClient) {
     }

     private homeReturnval = new Subject<any>();
    homeReturnval$ = this.homeReturnval.asObservable();
    
   getTweets():Observable<any>{
       return this.http.get(this.url);
   }

   postData(data:any):Observable<any>{
        return this.http.post(this.searchurl, data, httpOptions)
      }

   postFilterData(data:any):Observable<any>{   
    return this.http.post(this.filterurl, data, httpOptions)
}

getNewsData(poiname,mindate):Observable<any>{
    let obj =  {'q':poiname,'mindate': mindate};
    let obj1 = JSON.stringify(obj);
    return this.http.post(this.news_url,obj1,httpOptions)
}

addComment(body: any): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = httpOptions.headers // Create a request option
    console.log(bodyString);
     this.http.post("http://127.0.0.1:5000/", bodyString).subscribe(
        res => {
            console.log("1");
            return res;
        }
    
);
   return;     
} 
   
setData(val:any){
    this.val = val;
}

getData():any{
    return this.val;
}

setFilterStatus(val:boolean){
    this.filterOpen.next(val);
}

setHomeData(val:any){
    this.value.next(val);
}
       
getSentimentDetails(data:any):Observable<any>{   
    return this.http.post(this.SentimentDetailsurl, data, httpOptions)
}  
    
getpoiRepliesUrl(data:any):Observable<any>{   
    return this.http.post(this.poiRepliesUrl, data, httpOptions)
}
getpoiTweetsUrl(data:any):Observable<any>{   
    return this.http.post(this.poiTweetsUrl, data, httpOptions)
}
    
setHomeReturnData(val:any){
    this.homeReturnval.next(val);
}

getpoiDetailsUrl(data:any):Observable<any>{   
    return this.http.post(this.getPOIDetails, data, httpOptions)
}
}