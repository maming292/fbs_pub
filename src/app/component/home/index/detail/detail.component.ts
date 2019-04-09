import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
import { IndexService } from '../../../../services/index.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../../services/public.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as $ from "jquery";
@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
	cars: any;
	option: any;
	sub: any;
	selectedCar2: string = 'BMW';
	power: any; // 右热量
	fs: any; // 辐射
	pa: any; // 气压
	public data: any;
	name: any;
	now: any;
	all: any;
	month: any;
	companyname: any;
	fin_number: any;
	type: any;
	stand_type: any;
	jzgm: any;
	totleO2: any;
	free: any;
	url = '/fbs/Predict/getPhEveryFilDayDate';
	constructor(private ActivatedRoute: ActivatedRoute, private serve: IndexService, private http: HttpClient) {}
	ngOnInit() {
		var val = this.ActivatedRoute.queryParams['value'];
		console.log(val)
		this.month = val.month;
		this.now = val.now;
		this.all = val.all;
		this.companyname = val.companyname;
		this.fin_number = val.fin_number;
		this.stand_type = val.stand_type;
		this.type = (val.type == 0 ? '离线' : (val.type == 1 ? '正常' : '异常'));
		this.getline(this.fin_number)
		this.charts([], []);
	}

	getline(fin_number) {
		let info = new HttpParams().set('fin_number', fin_number);
		this.serve.getData(this.url, info).then(data => {
			console.log(data);

			this.power = data['data']['SUN_MJ'];
			this.fs = data['data']['SUN_MJ_DAY'];
			this.pa = data['data']['AP'];
			this.jzgm = data['jzgm'];
			this.totleO2 = data['totleO2'];
			this.free = data['free'];

			var data1 = [];
			var data2 = [];

			$.each(data['ss'], function(i, v) {
				data1.push(v);
			})
			var myDate = new Date();
			var myYear = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
			var myMonth = myDate.getMonth();       //获取当前月份(0-11,0代表1月)
			var thisMonth = new Date(myYear,myMonth+1,0);
			var monthLen = thisMonth.getDate();  // 获取当月天数
			if(Object.keys(data['xz']).length<=0){
				for(let i=0;i<monthLen;i++){
					data2.push(0)
				}
			}else{
					$.each(data['xz'], function(i, v) {
				data2.push(v);
			})
			};
		
			this.charts(data1, data2);
		}).catch(err => {
			console.log(err);
		})

	}

	charts(data1, data2) {
		let od5 = document.getElementById('od5');
		this.option = {
			backgroundColor: 'white',
			color: ['#11A2FF', '#02E676', '#4caf50'],
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
			legend: {
				x: 'left',
				padding: [60, 20, 0, 100],
				data: [{
						name: '当日实际发电量',
						icon: 'circle'
					},
					{
						name: '当日预测发电量',
						icon: 'circle'
					}
				],
				//				selected: {
				//					'总辐射': true,
				//					'直辐射': true,
				//					'散辐射': true
				//				},
				textStyle: {
					color: '#656D78'
				}
			},
			grid: {

				right: '10%',
				height: '60%',
				width: '85%',
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
				splitLine: { //网格线
					show: true,
					lineStyle: {
						color: ['#F5F5F5'],
						type: 'solid'
					}
				},
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
			},
			yAxis: {
				name: 'kWh',
				//				min: 0,
				//				max: 5000,
				//				interval: 1000,
				axisTick: {
					show: true
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: ['#999'],
						type: 'solid'
					}
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
					name: '当日实际发电量',
					type: 'line',
					smooth: true,
					symbolSize: 12,
					data: data1,
					label: {
						normal: {
							show: false,
							position: 'top' //值显示
						}
					}
				},
				{
					name: '当日预测发电量',
					type: 'line',
					smooth: true,
					symbolSize: 12,
					data: data2,
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