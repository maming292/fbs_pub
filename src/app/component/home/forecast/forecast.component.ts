import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../services/public.service';
import * as $ from "jquery";
import set = Reflect.set;
@Component({
	selector: 'app-forecast',
	templateUrl: './forecast.component.html',
	styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
	option: any;
	startdate: Date;
	enddate: Date;
	ch: any;
	a: any;
	companylist: any; // 站点列表
	comid: number = 141; // 默认站点ID

	pagenum: any = 1; // 分页数据 以下
	prepage: any;
	nextpage: any;
	hasnextpage: any;
	hasprepage: any;
	pageArr = [10, 15, 20];
	//	firstdata: any;
	//	codes: any;
	allpages: any = 0;
	pageslist: any;
	pages: any = 1; // 分页数据 以上
	gflag: any;
	//  左数据
	sunmj: any; //热量  //总热量  
	sunmj_all: any; // 总辐射// 辐射
	suntime: any; // 日照
	zhimj: any; // 直辐射
	sanmj: any; //散辐射
	zhirl: any; //直热量
	sanr: any; // 散热量
	hd_em: any; // 湿度
	wind_dir: any; // 风向
	t_one: any; // 温度
	ap: any; // 气压
	t_em: any; // 环境温度
	zujian: any; // 组件温度
	windsped: any; // 风速 
	
	tall:any; // 今日实际
	yall:any; //昨日预测
	month: any; // 左侧搜索条件
	constructor(private route: Router, private serve: IndexService, private http: HttpClient, private service: PublicService) {}
	headers = new HttpHeaders().set("Accept", "*/*");
	options = {
		headers: this.headers,
		contentType: 'application/x-www-form-urlencoded'
	};
	ngOnInit() {
		var newdate = new Date();
		var nY = newdate.getFullYear() + '-';
		var nM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
		this.month = nY + nM;
		
		this.ch = {
			/** 每周第一天，0代表周日 */
			firstDayOfWeek: 0,
			/** 每周天数正常样式 */
			dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
			/** 每周天数短样式（位置较小时显示） */
			dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			/** 每周天数最小样式 */
			dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			/** 每月月份正常样式 */
			monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
			/** 每月月份短样式 */
			monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
		};

		this.charts();
		this.getleftdata();
		//		this.getCompanys().then(data => {
		//			this.companylist = data.result;
		//		}).catch(e => {
		//			console.log(e)
		//		});

		this.getdatalist();
	}

	prelode() {
		window.location.reload()
	}
	getCompanys() {
		return this.http.post(`${this.service.path}/fbs/foreignForC/weather`, '', this.options).toPromise();
	}
	// 获取 左边数据  
	getleftdata() {
		let info = new HttpParams().set('company_id', '' + this.comid);
		this.http.post(`${this.service.path}/fbs/Predict/weatherPredict`, info, this.options).toPromise().then(function(data) {
			var result = data.result;
			this.sunmj = result['SUN_MJ']; //热量  //总热量  
			this.sunmj_all = result['SUN_MJ_DAY']; // 总辐射// 辐射
			this.suntime = result['SUN_TIME']; // 日照
			this.zhimj = result['ZHI_MJ_DAY']; // 直辐射
			this.sanmj = result['SAN_MJ_DAY']; //散辐射
			this.zhirl = result['ZHI_MJ']; //直热量
			this.sanr = result['SAN_MJ']; // 散热量
			this.hd_em = result['HD_EM']; // 湿度
			this.wind_dir = result['WIND_DIRECTION']; // 风向
			this.t_one = result['T_ONE']; // 温度
			this.ap = result['AP']; // 气压
			this.t_em = result['T_EM']; // 环境温度
			this.zujian = result['T_TOW']; // 组件温度
			this.windsped = result['WIND_SPEED']; // 风速 

		}.bind(this));
	}
	dateformat(dater) {
		if(!dater) {
			return '';
		}
		var date = new Date(dater);
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate();
		this.a = Y + M + D
		return Y + M + D;
	}

	getdatalist() {
		let info = new HttpParams().set('page', '1').set('total_number', '10').set('company_id', '' + this.comid).set('start_time', this.dateformat(this.startdate)).set('end_time', this.dateformat(this.enddate));
		this.http.post(`${this.service.path}/fbs/Predict/weatherPredictAll`, info, this.options).subscribe(function(data) {
				console.log(data)
			if(data['code'] == 200) {
				this.tall = data['todayEle']['1'];
				this.yall = data['todayEle']['2'];
				this.pageslist = data['result']['list'];
				this.allpages = data['result']['total'];
				this.pages = data['result']['pages'];
				this.pagenum = data['result']['pageNum'];
				this.prepage = data['result']['prePage'];
				this.nextpage = data['result']['nextPage'];
				this.hasprepage = data['result']['hasPreviousPage'];
				this.hasnextpage = data['result']['hasNextPage'];
			} else {
				swal(`未知错误${data['code']}`);
			}
		}.bind(this))
	}

	//  分页  以下
	turn(an, e) {
		var page = 1;
		document.querySelector("#example1_next a").setAttribute('disabled', 'disabled');
		if(an == 1) {
			if(this.hasprepage) {
				page = this.pagenum - 1;
			} else {
				page = 1;
				swal("没有上一页了！")
				return false;
			}
		} else if(an == 2) {
			if(this.hasnextpage) {
				page = this.pagenum + 1;
			} else {
				page = 1;
				swal("没有下一页了！")
				return false;
			}
		} else if(an == 3) {

			page = parseInt(document.getElementById('turn').innerText);
			this.gflag = true;
			let self = this;
			setTimeout(function() {
				self.gflag = false;
			}, 2000)
			if(isNaN(page)) {
				swal("只能输入数字！");
				document.getElementById('turn').innerText = this.pagenum;
				return false;
			} else {
				if(page > this.pages) {
					page = this.pages;
					document.getElementById('turn').innerText = page + '';
				} else if(page < 1) {
					page = 1;
					document.getElementById('turn').innerText = page + '';
				}
			}
		} else if(an == 4) {
			page = 1;
		} else if(an == 5) {
			page = this.pages;
		}
		let info = new HttpParams().set('page', '' + page).set('total_number', '10').set('company_id', '' + this.comid).set('start_time', this.dateformat(this.startdate)).set('end_time', this.dateformat(this.enddate));
		this.http.post(`${this.service.path}/fbs/Predict/weatherPredictAll`, info, this.options)
			.subscribe(function(data) {
			
				if(data['code'] == 200) {
					this.pageslist = data['result']['list'];
					this.allpages = data['result']['total'];
					this.pages = data['result']['pages'];
					this.pagenum = data['result']['pageNum'];
					this.prepage = data['result']['prePage'];
					this.nextpage = data['result']['nextPage'];
					this.hasprepage = data['result']['hasPreviousPage'];
					this.hasnextpage = data['result']['hasNextPage'];
				} else {
					swal(`未知错误${data['code']}`);
				}
			}.bind(this))
	}

	// 分页以上

	charts() {
		let data1 = [];
		let data2 = [];
		let data3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0];
		let info = new HttpParams().set('month', ''+this.month).set('company_id', ''+this.comid);
		this.http.post(`${this.service.path}/fbs/Predict/getEleAndPowerCurr`, info, this.options)
			.subscribe(function(data) {
				if(data['code'] == 200) {
					var dataer = data.result;
					
					for(let i = 0; i < dataer.length; i++) {
						data1.push(dataer[i]['DAY_EQ'])
					}
					this.myoption(data1,data2)
				} else {
					swal(`未知错误${data['code']}`);
				}
			}.bind(this))
			
			
		this.http.post(`${this.service.path}/fbs/Predict/getEleAndPowerPredict`, info, this.options)
			.subscribe(function(data) {
				
				if(data['code'] == 200) {
					if(data['result'].length != 0) {
						var dataer = data.result;
						for(let i = 0; i < dataer.length; i++) {
							data2.push(dataer[i]['DAY_EQ'])
						}
					}else{
						data2 = data3;
					}
this.myoption(data1,data2)
				} else {
					swal(`未知错误${data['code']}`);
				}
			}.bind(this))


	}
	
	
	myoption(data1,data2){
		let od5 = document.getElementById('od5');
		this.option = {
			backgroundColor: 'white',
			color: ['#02E676', '#11A2FF', '#4caf50'],
			tooltip: {
				trigger: 'axis'
			},
			title: {
				text: '发电量预测',
				textStyle: {
					color: '#656D78',
					fontWeight: 0
				}
			},
			dataZoom: [{
				show: true,
				realtime: true,
				start: 0,
				end: 70
			}],
			legend: {
				x: 'center',
				width: 600,
				itemGap: 50,
				padding: [80, 0, 0, 0],
				data: [{
						name: '今日实际发电量',
						icon: 'circle'
					},
					{
						name: '昨日预测发电量',
						icon: 'circle'
					}
				],
				selected: {
					'总辐射': true,
					'直辐射': true,
					'散辐射': true
				},
				textStyle: {
					color: '#656D78'
				}
			},
			grid: {
				right: '10%',
				height: '60%',
				width: '90%',
				top: '35%',
				containLabel: true
			},
			xAxis: {
				name: '日',
				type: 'category',
				boundaryGap: false,
				axisTick: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#656D78'
					}
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#C9C9C9',
					}
				},
				splitLine: { //网格线
					show: true,
					lineStyle: {
						color: '#C9C9C9',
						type: 'solid'
					}
				},
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
			},
			yAxis: {
				name: 'KJ/m²',
				min: 0,
//				max: 5000,
//				interval: 1000,
				axisTick: {
					show: false
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#C9C9C9',
					}
				},
				axisLabel: {
					textStyle: {
						color: '#656D78'
					}
				},
				splitLine: { //网格线
					show: true,
					lineStyle: {
						color: '#C9C9C9',
						type: 'solid'
					}
				}
			},
			series: [{
					name: '昨日预测发电量',
					type: 'line',
					//					smooth: true,
					//					symbolSize: 12,
					data: data2,
					label: {
						normal: {
							show: false,
							position: 'top' //值显示
						}
					}
				},
				{
					name: '今日实际发电量',
					type: 'line',
					//					smooth: true,
					//					symbolSize: 12,
					data: data1,
					label: {
						normal: {
							show: false,
							position: 'top'
						}
					}
				}
			]
		};
	}

}