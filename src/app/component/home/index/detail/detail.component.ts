import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute,Params } from '@angular/router';
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
	public data: any;
	name: any;
	now: any;
	all: any;
	constructor(private ActivatedRoute: ActivatedRoute) {}
	ngOnInit() {
  var val = this.ActivatedRoute.queryParams['value'];
  this.now = parseInt(val.now);
  this.all = parseInt(val.all);
		this.cars = [{
				label: 'Audi',
				value: 'Audi'
			},
			{
				label: 'BMW',
				value: 'BMW'
			},
			{
				label: 'Fiat',
				value: 'Fiat'
			},
			{
				label: 'Ford',
				value: 'Ford'
			},
			{
				label: 'Honda',
				value: 'Honda'
			},
			{
				label: 'Jaguar',
				value: 'Jaguar'
			},
			{
				label: 'Mercedes',
				value: 'Mercedes'
			},
			{
				label: 'Renault',
				value: 'Renault'
			},
			{
				label: 'VW',
				value: 'VW'
			},
			{
				label: 'Volvo',
				value: 'Volvo'
			}
		];
		this.charts()
	}
//	onChange(e1) {
//		console.log(e1);
//	}
	charts() {
		let data1 = ['4800', '4300', '4100', '4000', '2400', '5000', '4700', '3000', '2000', '1800', '2800', '3000', '3500'];
		let data2 = ['4000', '2500', '3400', '3200', '1800', '1500', '45', '1200', '1800', '2000', '2300', '1600', '2600', '1000'];
		let data3 = ['2000', '1500', '3400', '2100', '1000', '2500', '450', '1900', '2800', '3000', '3300', '1600', '2000', '1900'];
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
			legend: {
				x: 'left',
				padding: [60, 20, 0, 100],
				data: [{
						name: '总辐射',
						icon: 'circle'
					},
					{
						name: '直辐射',
						icon: 'circle'
					}, {
						name: '散辐射',
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

				right: '2.5%',
				height: '60%',
				width: '95%',
				top: '35%',
				containLabel: true
			},
			xAxis: {
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
				data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
			},
			yAxis: {
				min: 0,
				max: 5000,
				interval: 1000,
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
					name: '总辐射',
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
					name: '直辐射',
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
				},
				{
					name: '散辐射',
					type: 'line',
					smooth: true,
					symbolSize: 12,
					data: data3,
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