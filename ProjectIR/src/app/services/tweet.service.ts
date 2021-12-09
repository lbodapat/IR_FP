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
//     searchurl='http://172.31.7.80:9999/getDetails/'
    searchurl='http://localhost:9999/getDetails/'
    filterurl ='http://localhost:9999/getFilterDetails/'
    news_url:string = "http://localhost:9999/getNewsArticles/";
    SentimentDetailsurl ='http://localhost:9999/getSentimentDetails1/'
    poiRepliesUrl='http://localhost:9999/getSentimentDetails/'
    poiTweetsUrl= 'http://localhost:9999/getverifiedSentimentDetails1/'
    getPOIDetails = 'http://localhost:9999/getPOIDetails/'
    sentiPoiUrl='http://localhost:9999/getSentimentDetails'

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

    postSentimentPoiData(data:any):Observable<any>{
    console.log("ostSentimentPoiData")
        return this.http.post(this.sentiPoiUrl, data, httpOptions)
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


setHomeReturnData(val:any){
    this.homeReturnval.next(val);
}

}
