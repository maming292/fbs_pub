import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PublicService} from '../../../services/public.service';

@Injectable()
export class RuningService {
  headers = new HttpHeaders().set("Accept", "*/*");
  options={headers:this.headers,contentType:'application/x-www-form-urlencoded'};
  constructor(private sev:PublicService,private http:HttpClient) { }

  getData(url,info){
    return this.http.post(this.sev.path+url,info,this.options).toPromise();
  }
}
