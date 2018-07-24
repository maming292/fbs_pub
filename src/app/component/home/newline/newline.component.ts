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
	text: any;
	lnglats: any;
	details: any;
	list: any;
	ydatas: any;
	ecmsg: any;
	marked: any;
	team: any;
	nameshow: any = false;
	lineshow:any = false;
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
	constructor(private route: Router, private serve: IndexService, private http: HttpClient) {}
	ngOnInit() {
		this.get();
		
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
		var map = new AMap.Map('map', {
			zoom: 4
		});
		/*
		 把创建点标记(new AMap.Marker) 写在创建信息窗体内 
		 以下为创建信息窗体
		 */

		AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
			// 根据线路 条数生成 n 个容器
			console.log(this)

			var markers1 = [];
			var markers2 = [];

			for(var i = 0; i < a[0].path.length; i++) {
				addMarker(markers1, 'marker1', a[0].path[i], "../../../../assets/img/z2.png", true);
			}
			for(var i = 0; i < a[1].path.length; i++) {
				addMarker(markers1, 'marker2', a[1].path[i], "../../../../assets/img/z2.png", false);

			}
			var infoWindow = null;
			var infoTitle = '<span style="color:#fff">实业</span>';

			function addMarker(markers, marker, position, icon, boll) { //添加点标记 marker 方法

				//			map.clearMap();//清除之前添加的Marker (全显示  不需要)
				marker = new AMap.Marker({
					map: map,
					offset: new AMap.Pixel(-17, -45),
					position: position,
					//				icon:icon,
					icon: new AMap.Icon({
						size: new AMap.Size(34, 50), //图标大小
						image: icon,
						imageOffset: new AMap.Pixel(0, 0)
					})
				});
				marker.customData = {
					myProperty: i
				}; //添加私有属性
				//鼠标移入marker弹出自定义的信息窗体 click mouseover
				AMap.event.addListener(marker, 'click', function(e) {
					var name = ecmsg[marker.customData.myProperty][0];
					var data = ecmsg[marker.customData.myProperty][1];
					console.log(marker.customData.myProperty)
					infoTitle = '<span style="color:#333">' + name + '</span>';
					setInfoWindow(infoTitle, data);
					infoWindow.open(map, marker.getPosition());

					$('.amap-ui-smp-ifwn-content-body').css({
						'borderRadius': '5px'
					});
					$('.amap-ui-smp-ifwn-combo-sharp').hide();

					console.log(marker);

					//						for(let i = 0; i < markers1.length; i++) {
					//							markers1[i].setIcon('../../../../assets/img/z2.png')
					//						}
					//						markers1[marker.customData.myProperty].setIcon('../../../../assets/img/z1a.png')
					//					

				});
				markers.push(marker);

				AMap.event.addListener(marker, 'mouseover', function(e) {
					infoTitle = '<span style="color:#333">' + ecmsg[marker.customData.myProperty][0] + '</span>';
					var infoCompany = new AMap.InfoWindow({
						offset: new AMap.Pixel(0, -30)
					});
					infoCompany.setContent(infoTitle);

					//				showCompany(ecmsg[marker.customData.myProperty][0]);
					infoCompany.open(map, marker.getPosition());
				})
			}

			$('.posi').on('click', getCenter)

			function getCenter() {
				for(let i = 0; i < markers1.length; i++) {
					markers1[i].setIcon('../../../../assets/img/z2.png')
				}

				markers1[$(this).attr('title')].setIcon('../../../../assets/img/z1a.png')
			}

			function setInfoWindow(infoTitle, data) {
				infoWindow = new SimpleInfoWindow({
					infoTitle: infoTitle,
					infoBody: '<div><span style="display:inline-block;width:150px;padding:5px 0;color:#333">所属线路:广盈线</span><span style="display:inline-block;width:150px;padding:5px 0;color:#333">所属线路:广盈线</span><span style="display:inline-block;width:150px;padding:5px 0;color:#333">所属线路:广盈线</span><span style="display:inline-block;width:150px;padding:5px 0;color:#333">所属线路:广盈线</span></div><div style="text-align:center;padding:10px 0"><button class="mybtn"style="display:inline-block;width:200px;padding:5px 0;color:#fff;background:#01BEA4;border-radius:5px">概率影响分析结果查看</button></div>',
					offset: new AMap.Pixel(0, -45)
				});

				infoWindow.get$InfoBody().on('click', '.mybtn', function(event) { //点击 '点击这里' 按钮
					//阻止冒泡
					event.stopPropagation();
					setEc(data);
					document.getElementById('line').style.display = 'block';
				});
			}
			setInfoWindow(infoTitle, []);

			function showCompany(companyName, marker) {

			}
		}.bind(this)); //创建信息窗体 end

		AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) { // 路径
			if(!PathSimplifier.supportCanvas) {
				alert('当前环境不支持 Canvas！');
				return;
			}
			var pathSimplifierIns = new PathSimplifier({
				zIndex: 100,
				//autoSetFitView:false,
				map: map, //所属的地图实例

				getPath: function(pathData, pathIndex) {

					return pathData.path;
				},
				getHoverTitle: function(pathData, pathIndex, pointIndex) {
					if(pointIndex >= 0) {}

				},
				renderOptions: { //节点样式
					renderAllPointsIfNumberBelow: 100, //绘制路线节点，如不需要可设置为-1
					"pathLineSelectedStyle": {
						"lineWidth": 2,
						"strokeStyle": "#3434FB",
						"borderWidth": 1,
						"borderStyle": "#cccccc",
						"dirArrowStyle": false
					}
				}
			});
			window.pathSimplifierIns = pathSimplifierIns;
			pathSimplifierIns.setData(a);
			//选中路线0 改变样式
			pathSimplifierIns.setSelectedPathIndex(0);
		});
		// echart
		var setEc = this.setEc;
	}
	backMap() {
		this.route.navigateByUrl('/home/map');
	}
	closes() {
		$('#line').hide();
	}
	setEc(data) {
		$('#box').removeAttr('_echarts_instance_');
		var myChart = echarts.init(document.getElementById('ec'));
		var option = {
			title: {
				text: '光伏用户概率影响分布曲线图',
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
				boundaryGap: false,
				splitLine: {
					show: true,
					lineStyle: {
						color: '#C9C9C9',
						width: 1
					}
				},
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			},
			yAxis: {
				name: 'P(x)',
				splitLine: {
					show: true,
					lineStyle: {
						color: '#C9C9C9',
						width: 1
					}
				}
			},
			series: [{
				name: '销量',
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
				data: data
			}]
		};
		myChart.setOption(option);
		document.getElementById('line').style.display = 'block';
	}

	getCenter(index) {

	}

	setteam(team) {
		this.team = team + 1;
	}
	cl(e) {
		 e.stopPropagation();
		this.lineshow = !this.lineshow;
		this.nameshow = false;
	}

	showliner() {
		this.setEc(this.ecmsg[0][1]);
		document.getElementById('line').style.display = 'block';
	}
	cloline(){
		this.lineshow = false;
	}
	p(){
		this.nameshow = !this.nameshow;
	}
	
	
	// 临时
		get() {
		let info = new HttpParams().set('page', '1').set('total_number', '10000').set('area', this.area).set('stand_type', this.standtype).set('company_name', this.companyname);
		console.log(info)
		this.serve.getData(this.url, info).then(data => {
			console.log(data);
			if(data['code'] == 200) {
				this.secarea = data['areaAll'];
				//				this.sectype = data['listCompany'];
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