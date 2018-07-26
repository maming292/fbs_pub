import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient,HttpParams} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
@Injectable()
export class PublicService {
path="http://192.168.1.181:8088";
//path="http://192.168.20.95:8080";
  headers = new HttpHeaders().set("Accept", "*/*");
  options={headers:this.headers,withCredentials:true};
  constructor(private http:HttpClient,private route:Router) { }
  login(url,info){
   return this.http.post(this.path+url,info,this.options).toPromise();
  }
  // getUrl(){
  //   // let _self=this;
  //   // let set=setInterval(function () {
  //   //   let ax=document.getElementById('title');
  //   //   let index=0;
  //   //   if(ax){
  //   //     index=ax.innerText=='气象信息'?1:(ax.innerText=='电量预测'?2:(ax.innerText=='数据质量'?3:(ax.innerText=='配网运行'?4:0)));
  //   //   }
  //   //   let dom=document.getElementsByClassName('byclass');
  //   //   for(let i=0;i<dom.length;i++){
  //   //     if(index==i){
  //   //       _self.addClass(dom[i],'acti');
  //   //       clearInterval(set);
  //   //     }else{
  //   //       _self.removeClass(dom[i],'acti');
  //   //     }
  //   //   }
  //   // },50)
  // }


  dateFormat(date,type){
      let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(type)) type = type.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o)
        if (new RegExp("(" + k + ")").test(type)) type = type.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return type;
  }

  addClass( elements,cName ){
    if( !this.hasClass( elements,cName ) ){
      elements.className += " " + cName;
    }
  };

  hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  }

  removeClass(ele,cls) {
    if (this.hasClass(ele,cls)) {
      let reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      ele.className=ele.className.replace(reg,' ');
    }
  }
}
