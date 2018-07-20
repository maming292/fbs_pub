import { Component, OnInit } from '@angular/core';
import {LoopService} from '../../../services/loop.service';
import {RuningService} from './runing.service';
import {HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as $ from 'jquery';
@Component({
  selector: 'app-runing',
  templateUrl: './runing.component.html',
  styleUrls: ['./runing.component.css']
})
export class RuningComponent implements OnInit {
  startdate:any;//日期
  ch:any;
  P:string='0'//有功功率
  lth:number=0;
  companyId:any;
  constructor(private route: Router,private loop:LoopService,private runSev:RuningService) { }
  url:string='/fbs/foreignForC/';//url前缀
  info =new HttpParams();//post参数
  leftData:electricModule={all:'0',companyNumber:'0',month:'0',day:'0'};
  topData:electricModule={all:'0',companyNumber:'0',month:'0',day:'0'};
  mapCompany:any;
  facList:any=[{},{},{},{}];
  centerData:Array<centerModule>=[{IA:'0',IB:'0',IC:'0',UA:'0',UB:'0',UC:'0',I_PV1:'0',I_PV2:'0',I_PV3:'0',I_PV4:'0',I_PV5:'0',I_PV6:'0',V_PV1:'0',V_PV2:'0',V_PV3:'0',V_PV4:'0',V_PV5:'0',V_PV6:'0',P:'0'}]
  ngOnInit() {
   this.loops();
    this.ch = {
      /** 每周第一天，0代表周日 */
      firstDayOfWeek: 0,
      /** 每周天数正常样式 */
      dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      /** 每周天数短样式（位置较小时显示） */
      dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      /** 每周天数最小样式 */
      dayNamesMin: ["日" , "一" , "二", "三", "四", "五", "六"],
      /** 每月月份正常样式 */
      monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      /** 每月月份短样式 */
      monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    };
    this.loop.getDom('slide',{number:'2'});
    this.getLeftData();//获取左侧数据
    this.getCenterTop();//获取中间顶部数据

  }
  loops() {
    let silds = $('.swiper-slide').width('10%').height('20%');
    silds.children('img').css({width: '100%', height: '100%'});
  }
  move(e){
    let parent=$('.swiper-wrapper');
    let M=Math.floor(parent.children().length/10);

    let tis=$(e.target);
    if(tis.attr('class')=='swiper-button-prev'){
        ++this.lth;
       if(this.lth>M){--this.lth; return false;}
        parent.animate({left:`-${this.lth*100}%`},500);
    }else{
      --this.lth;
      if(this.lth<0) {++this.lth;;return false;}
      parent.animate({left:`-${this.lth*100}%`},500);
    }
  }
  callbackI(e){
  /*DAY_EQ:1685.22
    MONTH_EQ:33363.15
    SUM_EQ:825200.24*/
    let obj={
      a:'1',
      b:'2',
      s:'3'
    }
  }
  Run(id){
    let url=this.url+'photovoltaic_facility';
    let inf= new HttpParams().set('page','1').set('total_number','10').set('company_id',`${id}`);
    this.runSev.getData(url,inf).then(data=>{
  
      if(data['code']==200){
          let datas=data;
          this.topData.all=datas['result']['SUM_EQ'];
          this.topData.month=datas['result']['MONTH_EQ'];
          this.topData.day=datas['result']['DAY_EQ'];
          this.P=datas['P'];
          this.facList=datas['result1']['list'];

          this.getC(this.facList['0']['FACILITY_NUMBER']);
      }else{
        swal(`返回代码~${data['code']}!`)
      }

    }).catch(err=>{

    })
  }
  getLeftData(){
    let url=this.url+'photovoltaic_left';
    this.runSev.getData(url,this.info).then(data=>{
          if(data['code']==200){
            this.leftData.all=data['map']['SUM_EQ'];
            this.leftData.companyNumber=data['companyCount'];
            this.leftData.month=data['map']['MONTH_EQ'];
            this.leftData.day=data['map']['DAY_EQ'];
          }else{
            swal(`返回代码${data['code']}！`);
          }
    }).catch(err=>{

    })
  }
  getCenterTop(){
    let url=this.url+'photovoltaic_companys';
    this.runSev.getData(url,this.info).then(data=>{
    	console.log(data)
    	
      if(data['code']==200){
//    	this.companyId = data['result']['0']['ID']
      	this.companyId = 141;
      	
        this.mapCompany=data['result'];
//      this.Run(data['result']['0']['ID'])
this.Run(141)
      }else{
        swal(`${data['code']}`);
      }
    }).catch(err=>{})
  }
  getC(number){
    let url=this.url+'photovoltaic_inverter';
    let inf= new HttpParams().set('facility_number',`${number}`).set('page','1').set('total_number',`4`);
    this.runSev.getData(url,inf).then(data=>{
          let datas=data;
          if(datas['code']==200){
            this.centerData=datas['result1']['list'];
          }else{
            swal(`${datas['code']}`);
          }
    }).catch(err=>{
          console.log(err);
    })
  }
  
  todis() {
  	this.route.navigateByUrl('/home/datadisplay');
  }
  tables() {
  	this.route.navigateByUrl('/home/tablestatc');
  }
}
class electricModule{
  public all:string //总电量
  public month:string//当月电量
  public day:string //当日电量
  public companyNumber:string //接入总数
}
class centerModule{
  public IA:string;
  public IB:string;
  public IC:string;
  public UA:string;
  public UB:string;
  public UC:string;
  public P:string;
  public I_PV1:string;
  public I_PV2:string;
  public I_PV3:string;
  public I_PV4:string;
  public I_PV5:string;
  public I_PV6:string;
  public V_PV1:string;
  public V_PV2:string;
  public V_PV3:string;
  public V_PV4:string;
  public V_PV5:string;
  public V_PV6:string;
}
