import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../services/public.service';
import * as $ from "jquery";
import set = Reflect.set;

@Component({
	selector: 'app-quality',
	templateUrl: './quality.component.html',
	styleUrls: ['./quality.component.css']
})
export class QualityComponent implements OnInit {
	option1: any;
	option2: any;
	option3: any;
	option4: any;
	month: any;
	date: any;
	date_sc: any;
	ch: any;
	comid: number = 141; // 默认站点ID
		constructor(private route: Router, private serve: IndexService, private http: HttpClient, private service: PublicService) {}
	headers = new HttpHeaders().set("Accept", "*/*");
	options = {
		headers: this.headers,
		contentType: 'application/x-www-form-urlencoded'
	};

	ngOnInit() {
//		var newdate = new Date();
//		var nY = newdate.getFullYear() + '-';
//		var nM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
//		this.month = nY + nM;
		
		this.month = '2018-04';
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
	}
	
		charts() {
		let	name1 = "发电量日原始数据",
			name2 = "发电量日修复数据",
			name3 = "负荷日原始数据",
			name4 = "负荷日修复数据",
			color1 = "#0999FF",
			color2 = "#13F585",
			data7 = ['', '', '4800', '4300', '4100', '4000', '2400', '5000', '4700', '3000', '2000', '1800', '2800', '3000', '3500'];
		let data1 = [];
		let data2 = [];
		let data3 = [];
		let data4 = [];
		let data5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0];
		let info = new HttpParams().set('month', ''+this.month).set('company_id', ''+this.comid);
		this.http.post(`${this.service.path}/fbs/Predict/getEleAndPowerCurr`, info, this.options)
			.subscribe(function(data) {
				if(data['code'] == 200) {
					if(data['result'].length != 0) {
							var dataer = data.result;
					for(let i = 0; i < dataer.length-1; i++) {
						data1.push(dataer[i]['DAY_EQ']);
						data3.push(dataer[i]['DAY_P']);
					}
					}else{
						data1 = data5;
						data3 = data5;
					}
				console.log(data1.length)
				this.createChart(1, data1, color1, name1);
			this.createChart(3, data3, color2, name3);
				} else {
					swal(`未知错误${data['code']}`);
				}
			}.bind(this))
			
			
		this.http.post(`${this.service.path}/fbs/Predict/getEleAndPowerPredict`, info, this.options)
			.subscribe(function(data) {
					if(data['code'] == 200) {
					if(data['result'].length != 0) {
							var dataer = data.result;
					for(let i = 0; i < dataer.length-1; i++) {
						data2.push(dataer[i]['DAY_EQ']);
						data4.push(dataer[i]['DAY_P']);
					}
					}else{
						data2 = data5;
						data4 = data5;
					}
				
				this.createChart(2, data2, color1, name2);
			this.createChart(4, data4, color2, name4);
				}else {
					swal(`未知错误${data['code']}`);
				}
			}.bind(this))


	}
	
	
	
	createChart(os: any, data: any, color: string, name: string) {
		let as = {
			backgroundColor: 'white',
			color: [color, '#11A2FF', '#4caf50'],
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				x: '30',
				padding: [10, 20, 0, 100],
				data: [{
					name: name,
					icon: 'circle'
				}],
				selected: {
					name: true
				},
				textStyle: {
					color: '#656D78'
				}
			},
			grid: {
				right: '4.5%',
				height: '86%',
				width: '90%',
				top: '10%',
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
				splitLine: { //网格线
					show: true,
					lineStyle: {
						color: ['#F5F5F5'],
						type: 'solid'
					}
				},
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31']
			},
			yAxis: {
				name: 'Kwh',
				// min:0,
				// max:10000,
				// interval:1000,
				axisTick: {
					show: false
				},
				axisLine: {
					show: false,
					//    onZero:false
				},
				axisLabel: {
					textStyle: {
						color: '#656D78'
					}
				},
				splitLine: { //网格线
					show: true,
					lineStyle: {
						color: ['#F5F5F5'],
						type: 'solid'
					}
				}
			},
			series: [{
					name: name,
					type: 'line',
//					smooth: true,
					symbolSize: 12,
					data: data,
					label: {
						normal: {
							show: false,
							position: 'top' //值显示
						}
					}
				}

			]
		};
		os == 1 ? this.option1 = as : (os == 2 ? this.option2 = as : (os == 3 ? this.option3 = as : this.option4 = as));

	}
}