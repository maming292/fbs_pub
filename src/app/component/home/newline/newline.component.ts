import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../services/public.service';
import * as $ from "jquery";
declare var AMap: any;
declare var AMapUI: any;
declare var window;
declare var echarts: any;
@Component({
	selector: 'app-newline',
	templateUrl: './newline.component.html',
	styleUrls: ['./newline.component.css']
})
export class NewlineComponent implements OnInit {
	isHideEc2:any = false;
	text: any;
	lnglats: any;
	details: any;
	list: any;
	ydatas: any;
	ecmsg: any;
	marked: any;
	team: any;
	nameshow: any = false;
	lineshow: any = false;
	// 临时	
	stationNumber: any;
	warnNumber: any;
	energy: any;
	area: any = '';
	standtype: any = '';
	companyname: any = '';
	url = '/fbs/foreignForC/synthesize';
	secarea: any = '';
	sectype: any = '';
	lister: any;
	map: any;
	lineData:any;
	totleO2:any; // 减排
	day:any; //日发电
	year:any; //年发电
	power:any; //功率
	constructor(private route: Router, private serve: IndexService, private http: HttpClient) {}
	ngOnInit() {
		this.get();
		this.getEchartsData();
		this.getalertdata();
		var a = [{ //路径
			name: '路线0',
			path: [
				[120.233417, 31.515241],
				[120.270325, 31.527331],
				[120.277402, 31.536001],
				[120.321519, 31.509954]
			],
		}, {
			name: '路线1',
			path: [
				[120.23523, 31.479644],
				[120.300633, 31.480156],
				[120.323982, 31.500725],
				[120.325978, 31.483937]
			],
		}]

		this.ecmsg = [
			['无锡2广盈实业有限公司', [5, 20, 36, 10, 10, 20, 5, 20, 36, 10]],
			['AA广盈实业有限公司', [50, 12, 38, 5, 7, 22, 15, 90, 63, 100]],
			['BB广盈实业有限公司', [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]],
			['CC广盈实业有限公司', [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]]
		]
		var ecmsg = this.ecmsg;
		var i = 0;
		this.details = [
			[
				['广盈实业', '光伏电站', '1000'],
				['XX实业', '变电站', '1000'],
				['XX实业', '其他', '1000'],
				['XX实业', '光伏电站', '1000']
			],
			[
				['广盈实业', '光伏电站', '1000'],
				['XX实业', '变电站', '1000'],
				['XX实业', '其他', '1000'],
				['XX实业', '光伏电站', '1000']
			]
		];
		var lnglats = [];

		/*
		 把创建点标记(new AMap.Marker) 写在创建信息窗体内 
		 以下为创建信息窗体
		 */
//		var setEc = this.setEc;
	}
	backMap() {
		this.route.navigateByUrl('/home/map');
	}
	closes() {
		$('#line').hide();
	}
	setEc(xdata,ydata,_id,titleText,xAxisName) {
		$('#box').removeAttr('_echarts_instance_');
		var myChart = echarts.init(document.getElementById(_id));
		var option = { 
			title: {
				text: titleText,
				show: true, //标题显示隐藏
				left: 'center',
				top: '20',
				textStyle: { //样式
					color: '#666',
					fontWeight: '400'
				}
			},
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				name:xAxisName,
				nameLocation:"center",
				nameGap:30,
				boundaryGap: false,
				splitLine: {
					show: true,
					lineStyle: {
						color: '#C9C9C9',
						width: 1
					}
				},
				axisLabel: {
					show: true,
//					showMaxLabel: true,
//					rotate: 70
				},
				data: xdata,
			},
			yAxis: {
				name: '%',
				splitLine: {
					show: true,
					lineStyle: {
						color: '#C9C9C9',
						width: 1
					}
				}
			},
			series: [{
				type: 'line',
				areaStyle: { //折线以下样式
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
									offset: 0,
									color: '#5CD2BF'
								},
								{
									offset: 1,
									color: '#fff'
								}
							]
						)
					}
				},
				itemStyle: {
					normal: {
						color: '#12C1A8',
						lineStyle: {
							color: '#12C1A8'
						}
					}
				},
				data: ydata
			}]
		};
		myChart.setOption(option);
		document.getElementById('line').style.display = 'block';
	}


	
	setteam(team) {
		this.team = team + 1;
	}
	cl(e) {
		e.stopPropagation();
		this.lineshow = !this.lineshow;
		this.nameshow = false;
	}


	cloline() {
		this.lineshow = false;
	}
	p() {
		this.nameshow = !this.nameshow;
	}
	/* 获取折线数据 */
	getEchartsData(){
		this.serve.noPathGetData('/fbs/Predict/curve').then(data => {
			this.lineData = data;
		})
	}
	
	showliner1() {
		this.setEc(this.lineData.curve2.XList,this.lineData.curve2.YList,"ec",this.lineData.curve2.name,"电压标幺值");
		this.setEc(this.lineData.curve3.XList,this.lineData.curve3.YList,"ec2",this.lineData.curve3.name,"");
		this.isHideEc2 = true;
		document.getElementById('line').style.display = 'block';
		document.getElementById('ec2').style.display = 'block';
	}
	showliner2() {
		this.setEc(this.lineData.curve1.XList,this.lineData.curve1.YList,"ec",this.lineData.curve1.name,"三相不平衡度");
		this.isHideEc2 = false;
		document.getElementById('line').style.display = 'block';
		document.getElementById('ec2').style.display = 'none';
	}
		showliner3() {
		this.setEc(this.lineData.curve4.XList,this.lineData.curve4.YList,"ec",this.lineData.curve4.name,"有功标幺值");
		this.isHideEc2 = false;
		document.getElementById('line').style.display = 'block';
		document.getElementById('ec2').style.display = 'none';
	}
	// 临时
	get() {
		let info = new HttpParams().set('page', '1').set('total_number', '10000').set('area', this.area).set('stand_type', this.standtype).set('company_name', this.companyname);
		this.serve.getData(this.url, info).then(data => {
			if(data['code'] == 200) {
				this.secarea = data['areaAll'];
				this.sectype = data['standtype'];
				this.lister = data['company']['list'];
				this.stationNumber = data['facilityCount'];
				this.warnNumber = data['warnCount'];
				this.energy = data['energy'];
				this.map = data['start']
			} else {
				swal(`~~~@${data['code']}`);
			}
		}).catch(err => {
			console.log(err);
		})
	}

	getalertdata() {
		let info = new HttpParams().set('company_id', '141');
		this.serve.getData('/fbs/Predict/probabilityInfluence', info).then(data => {
			this.totleO2 = data['result']['totleO2']; // 减排
			this.day = data['result']['day']; //日发电
			this.year = data['result']['year']; //年发电
			this.power = data['result']['p']; //功率
		}).catch(err => {
			console.log(err);
		})
	}
/**/
	onClick(ystpow, now, all, companyname, fin_number, type, stand_type) {
		this.route.navigate(['home/map_detail'], {
			queryParams: {
				'ystpow': ystpow,
				'now': now,
				'all': all,
				'companyname': companyname,
				'fin_number': fin_number,
				'type': type,
				'stand_type': stand_type,
			}
		});
	}
}