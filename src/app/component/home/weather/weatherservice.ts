import { Injectable } from '@angular/core';
import {PublicService} from '../../../services/public.service';
import {HttpClient, HttpParams, HttpHandler, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import set = Reflect.set;

@Injectable()
export class WeatherService {

  constructor(private http:HttpClient,private sev:PublicService) { }
  headers = new HttpHeaders().set("Accept", "*/*");
  options={headers:this.headers,contentType:'application/x-www-form-urlencoded'};
  getData(){
    return this.http.post(`${this.sev.path}/fbs/foreignForC/weather`,'',this.options).toPromise();
  }
  getWeatherDetailData(id){
    let info =new HttpParams().set('company_id',id);
    return this.http.post(`${this.sev.path}/fbs/foreignForC/weather`,info,this.options).toPromise();
  }
  getPages(page,total_number,start_time,end_time,bool,id){
    if(!bool){
      let info=new HttpParams().set('page',page).set('total_number',total_number).set('company_id',id).set('start_time',start_time).set('end_time',end_time);
      // let obj={'page':`${page}`,'total._number':`${total_number}`,'start_time':`${start_time}`,'end_time':`${end_time}`};
      return this.http.post(`${this.sev.path}/fbs/foreignForC/weatherAll`,info,this.options).toPromise();
    }else{
      // let obj={'page':page,'total._number':total_number,'start_time':start_time,'end_time':end_time}
      let info=new HttpParams().set('page',page).set('total_number',total_number).set('start_time',start_time).set('end_time',end_time);
      return this.http.post(`${this.sev.path}/fbs/foreignForC/weatherAll`,info,this.options).toPromise();
    }
  }
  dateFormat(date,type){
   return  this.sev.dateFormat(date,type);
  }
  // exports(){
  //   let info =new HttpParams().set('start_time','2018-01-01').set('end_time','2018-01-31')
  //   return this.http.post(`${this.sev.path}/fbs/foreignForC/exportWeather`,info,this.options).toPromise();
  // }

}

