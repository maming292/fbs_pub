import { Component, OnInit } from '@angular/core';
import {PublicService} from '../../services/public.service';
import {HttpParams} from '@angular/common/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login=new Login('','');
  data:any;
  srcs:any;
  disabled:boolean=false;

  interval:any;
  constructor(private serve:PublicService,private route:Router) {}
  ngOnInit() {
    let index=0;
    this.srcs=[
      '../../../assets/img/bg1.png',
      '../../../assets/img/bg2.png',
      '../../../assets/img/bg3.png',
      '../../../assets/img/bg4.png'
    ];

    let imgs=document.getElementsByClassName('imgs');
    this.interval=setInterval(function(){
        if(index>3){
            index=0;
        }
        for(let i=0;i<imgs.length;i++){
          if(index==i){
              imgs[i]['style']['opacity']=1;
          }else{
              imgs[i]['style']['opacity']=0;
          }
        }
        index++;
    },3000)
  }
  ngOnDestroy(){
    clearInterval(this.interval);
  }
setcookie(){
	sessionStorage['name'] = this.login.username 
}
  onSubmit(url,e){
     let loginInfo= new HttpParams().set('username',this.login.username).set('password',this.login.password);
     this.serve.login('/fbs/foreignForC/webLogin',loginInfo).then((data)=>{
       console.log(data)
        if(data['result']==1){
          this.route.navigateByUrl(url);
        }else{
          swal(`${data['code']}`);
        }
     }).catch((error)=>{
        swal(`连接失败！`);
     })
  }
  newLogin(){
    this.login=new Login('','');
  }
}
class Login{
  constructor(
    public username:string,
    public password:string
  ){}
}
