import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weatherservice';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import swal from 'sweetalert2';
import { PublicService } from '../../../services/public.service';

@Component({
	selector: 'app-weather',
	templateUrl: './weather.component.html',
	styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
	option: any;
	startdate: Date;
	enddate: Date;
	ch: any;
	headers = new HttpHeaders().set("Accept", "*/*");

	pageArr = [10, 15, 20];
	firstdata: any;
	codes: any;
	allpages: any = 0;
	detailweather: detail = new detail(0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, '');
	constructor(private service: WeatherService, private serve: PublicService) {
		let tis = this;
	}
	wid: any = 141;
	pageslist: any;
	pagenum: any = 1;
	prepage: any;
	nextpage: any;
	hasnextpage: any;
	hasprepage: any;
	pages: any = 1;
	data1: any;
	data2: any;
	data3: any;
	public gflag = false;
	ngOnInit() {
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

		this.data1 = [0, 0, 0];
		this.data2 = [0, 0, 0];
		this.data3 = [0, 0, 0];
		this.get();
		this.change(this.wid)
	}
	get() {
		//获取气象信息
		this.service.getData().then(data => {
			if(data['code'] == 200) {
				this.codes = data['result']; //公司集合
				this.firstdata = data['result'][0]['ID'];
				//				this.service.getWeatherDetailData(this.firstdata).then(data => {
				//					console.log(data)
				//					this.setlinedata(this.data1, data['results'][0]);
				//					this.setlinedata(this.data2, data['results'][1]);
				//					this.setlinedata(this.data3, data['results'][2]);
				////					this.detailweather = data['result'];
				//				}).catch(e => console.log(e))
			}
		}).catch(e => {
			console.log(e)
		});
		//获取分页数据
		this.service.getPages(1, this.pageArr[0], '', '', false, this.wid).then(data => {
			if(data['code'] == 200) {
				this.pageslist = data['result']['list'];
				
				console.log(this.pageslist)
				
				
				this.allpages = data['result']['total'];
				this.pagenum = data['result']['pageNum'];
				this.pages = data['result']['pages'];
				this.prepage = data['result']['prePage'];
				this.nextpage = data['result']['nextPage'];
				this.hasprepage = data['result']['hasPreviousPage'];
				this.hasnextpage = data['result']['hasNextPage'];
			}
		}).catch(e => {
			console.log(e)
		});
	}
	turn(an, e) {
		let bool, start = '',
			end = '',
			page = 1;
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
		if(this.startdate) {
			start = this.service.dateFormat(this.startdate, "yyyy-MM-dd")
		}
		if(this.enddate) {
			end = this.service.dateFormat(this.enddate, "yyyy-MM-dd")
		}
		if(this.startdate && this.enddate) {
			bool = true;
		} else {
			bool = false;
		}
		this.service.getPages(page, 10, start, end, bool, this.wid).then(data => {
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
		}).catch(e => {
			swal('请求失败,与服务器连接已断开！')
		})
	}
	change(value) {
		this.data1 = [0, 0, 0];
		this.data2 = [0, 0, 0];
		this.data3 = [0, 0, 0];
		this.service.getWeatherDetailData(value).then(data => {
			if(data['code'] == 200) {
				this.detailweather = data['result'];
			}
		}).catch(e => {
			swal(e)
		})
		this.service.getWeatherDetailData(value).then(data => {
			
			this.setlinedata(this.data1, data['results'][0]);
			this.setlinedata(this.data2, data['results'][1]);
			this.setlinedata(this.data3, data['results'][2]);
		}).catch(e => console.log(e))
		
		
				//获取分页数据
		this.service.getPages(1, this.pageArr[0], '', '', false, this.wid).then(data => {
			if(data['code'] == 200) {
				this.pageslist = data['result']['list'];
				this.allpages = data['result']['total'];
				this.pagenum = data['result']['pageNum'];
				this.pages = data['result']['pages'];
				this.prepage = data['result']['prePage'];
				this.nextpage = data['result']['nextPage'];
				this.hasprepage = data['result']['hasPreviousPage'];
				this.hasnextpage = data['result']['hasNextPage'];
			}
		}).catch(e => {
			console.log(e)
		});

	}

	exports() {
		let start, end;
		if(this.startdate && this.enddate) {
			start = this.service.dateFormat(this.startdate, "yyyy-MM-dd");
			end = this.service.dateFormat(this.enddate, "yyyy-MM-dd");
			location.href = `${this.serve.path}/fbs/foreignForC/exportWeather?start_time=${start}&end_time=${end}`
		} else {
			location.href = `${this.serve.path}/fbs/foreignForC/exportWeather`
		}
	}
	nowpage: any = 1;
	startSearch: any;
	callbackI(e) {
		this.startSearch = this.service.dateFormat(e, 'yyyy-MM-dd');
	}
	endSearch: any;
	callbackII(e) {
		this.endSearch = this.service.dateFormat(e, 'yyyy-MM-dd');
	}
	search() {
		if(this.startSearch && this.endSearch) {
			if(this.startSearch == this.endSearch) {
				swal('查询的时间不能相同！')
				return false;
			}
			//    console.log(this.startSearch,this.endSearch);
			this.service.getPages(this.nowpage, 10, this.startSearch, this.endSearch, true, this.wid).then(data => {
				if(data['code'] == 200) {
					this.pageslist = data['result']['list'];
					this.allpages = data['result']['total'];
					this.pagenum = data['result']['pageNum'];
					this.prepage = data['result']['prePage'];
					this.pages = data['result']['pages'];
					this.nextpage = data['result']['nextPage'];
					this.hasprepage = data['result']['hasPreviousPage']
					this.hasnextpage = data['result']['hasNextPage']
				}
			}).catch(e => {
				console.log(e)
			});
		} else {
			swal('请选择开始日期/结束日期！');
		}
	}
	prelode() {
		window.location.reload()
	}

	setlinedata(data, result) {

		for(var s in result) {
			data.push(Number(result[s]));
			this.option = {
				backgroundColor: 'white',
				color: ['#02E676', '#11A2FF', '#4caf50'],
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					x: 'center',
					y: 'bottom',
					padding: [0, 20, 0, 0],
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
					right: '5%',
					height: '60%',
					width: '90%',
					top: '25%',
					containLabel: true
				},
				xAxis: {
					name: '时',
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
					data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
				},
				yAxis: {
					name:'(MJ/m²)',
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
						data: this.data1,
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
						data: this.data2,
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
						data: this.data3,
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
}
export class detail {
	constructor(
		public ID: number, //id
		public FACILITY_NUMBER: string, //设备编号
		public SUN_MJ_DAY: number, //总表日累计
		public ZHI_MJ_DAY: number, //直表日累计
		public SAN_MJ_DAY: number, //散表日累计
		public T_ONE: number, //温度1
		public T_TWO: number, //温度2
		public T_EM: number, //环境温度
		public HD_EM: number, //环境湿度
		public AP: number, //气压
		public WIND_SPEED: number, //风速瞬时值
		public WIND_SPEED_TEN: number, //10分钟风速
		public WIND_SPEED_TOW: number, //2分钟风速
		public WIND_DIRECTION: number, //风向瞬时值
		public SUN_MJ: number, //总表瞬时值
		public ZHI_MJ: number, //直表瞬时值
		public SAN_MJ: number, //散表瞬时值
		public COLLECTOR_V: number, //采集器电量
		public SUN_TIME: number, //日照时长
		public TIME: string, //时间
	) {}
}