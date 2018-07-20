import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {PublicService} from '../../services/public.service';
import * as $ from "jquery";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flag: boolean = false;
  menu: any;
  sid: any;
	year:any;
	
  constructor(private router: Router) {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((e) => {
        let url = e['url'];
        let list = document.querySelectorAll('.byclass');
        if (url == '/home/map') {
          this.ech(list,list[0]);
        }
        else if (url == '/home/weather') {
          this.ech(list,list[1]);
        }
        else if (url == '/home/forecast') {
          this.ech(list,list[2]);
        }
        else if (url == '/home/quality') {
          this.ech(list,list[3]);
        }
        else if (url == '/home/runing') {
          this.ech(list,list[4]);
        }
          else if (url == '/home/datadisplay') {
          this.ech(list,list[4]);
        }
            else if (url == '/home/tablestatc') {
          this.ech(list,list[4]);
        }
         else if (url == '/home/setting') {
          this.ech(list,list[5]);
        }
          else if (url == '/home/setting/station') {
          this.ech(list,list[5]);
        } else if (url == '/home/setting/equipment') {
          this.ech(list,list[5]);
        }
         else if (url == '/home/setting/area') {
          this.ech(list,list[5]);
        }
          else if (url == '/home/setting/user') {
          this.ech(list,list[5]);
        }
           else if (url == '/home/setting/role') {
          this.ech(list,list[5]);
        }
      });
  }
  ech(list,item){
    let vthis=this;
    for(var i=0;i<list.length;i++){
      if(list[i]==item){
        vthis.addClass(list[i],'acti');
      }else{
        vthis.removeClass(list[i],'acti');
        
      }
    }
  }
  ngOnInit() {
  	var date = new Date();
  	this.year = date.getFullYear();

  }

  onIf(id, e) {
    this.sid = id;
  }

  addClass(elements, cName) {
    if (!this.hasClass(elements, cName)) {
      elements.className += ' ' + cName;
    }
  };

  hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }

  removeClass(ele, cls) {
    if (this.hasClass(ele, cls)) {
      let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, ' ');
    }
  }
}
