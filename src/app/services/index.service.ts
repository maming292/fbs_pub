import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class IndexService {
//path="http://192.168.1.181:8081";
path="http://153.35.178.42:8081";

  headers = new HttpHeaders().set("Accept", "*/*");
  options={headers:this.headers,withCredentials:true};
  constructor(private route:Router,private http:HttpClient) { }
  getData(url,info){
    return this.http.post(this.path+url,info,this.options).toPromise();
  }
  noPathGetData(url){
    return this.http.get(this.path+url).toPromise();
  }
}
