import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../services/public.service';
import * as $ from "jquery";
declare var echarts: any;
@Component({
	selector: 'app-datadisplay',
	templateUrl: './datadisplay.component.html',
	styleUrls: ['./datadisplay.component.css']
})
export class DatadisplayComponent implements OnInit {
	ecwidth: any;
	ydatas: any;
	xData: any;
	company_id: any;
	time: any;
	type: any;
	ectype: any;
	numarr: any;
	myChart: any;
	ecBtn: any;
	btnChange: any;
	num: any;
	thisyear:any;
	montharr:any = [];
	constructor(private route: Router, private serve: IndexService, private http: HttpClient, private service: PublicService) {}
	ngOnInit() {
		this.thisyear = new Date().getFullYear();
		var thismonth =new Date().getMonth()+1;
		for(let i=1;i<=thismonth;i++){
			var as = i<10?'0'+i:i;
			this.montharr.push(as);
		}
		// 获取当前月份
		
		
		
		this.myChart = echarts.init(document.getElementById('main'));
		var numarr = [];
		this.ecBtn = [
			['../../../assets/img/la.png', '../../../assets/img/bar.png'],
			['../../../assets/img/l.png', '../../../assets/img/bara.png']
		];
		this.btnChange = this.ecBtn[0];
		this.ectype = 'line';
		this.company_id = 141;
		this.time = '2018-07';
		this.xData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
		//		this.num = [0, 0, 0, 0, 0, 52, 87, 52, 546, 5, 9, 4, 12, 457, 110, 211, 77, 44, 88, 99, 66, 33, 22, 55, 88, 33, 88, 77, 12, 98, 15]
		this.getData(this.company_id, this.time);

		this.setEchars(this.ectype, this.xData, this.num);

		this.ecwidth = $('.ecList').width();
		$('.ec').height(this.ecwidth * 0.50);
	}

	getData(company_id, time) {
		var num = [];
		//		console.log(`${this.service.path}/fbs/foreignForC/getEleAndPowerCurr?company_id=${company_id}&month=${time}`); // photovoltaic_chart
		this.http.get(`${this.service.path}/fbs/Predict/getEleAndPowerCurr?company_id=${company_id}&month=${time}`)
			.subscribe(
				function(data) {
					$.each(data['result'], function(i,v) {
						num.push(v['DAY_P']);
					});
					this.num = num;
					this.setEchars(this.ectype, this.xData, this.num);
				}.bind(this),
				function(err) {
					console.log('失败');
				}
			);
	}
	setEchars(type, xData, num) {
		//			$('#box').removeAttr('_echarts_instance_');
		var myChart = echarts.init(document.getElementById('main'));
		var option = {
			title: {
				text: '有功功率图表分析',
				left: 'center' // 标题居中
			},
			tooltip: {},
			xAxis: {
				name:'日',
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
			},
			yAxis: {
				name:'KW'
			},
			series: [{
				name: '销量',
				type: type,
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
				barWidth: 15, //柱图宽度
				data: num,
				itemStyle: {
					normal: {
						//						barBorderRadius: [30, 30, 0, 0],
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
									offset: 0,
									color: '#00E0EA'

								},
								{
									offset: 0.5,
									color: '#08B2DC'
								},
								{
									offset: 1,
									color: '#08B0DB'
								}
							]
						)

					}
				}
			}]
		};
		this.myChart.setOption(option);
	}

	lineActive() {
		this.btnChange = this.ecBtn[0];
		this.ectype = 'line';
		this.setEchars(this.ectype, this.xData, this.num)
	}
	barActive() {
		this.btnChange = this.ecBtn[1];
		this.ectype = 'bar';
		this.setEchars(this.ectype, this.xData, this.num)
	}
	a(e) {
		console.log(e)
	}
}