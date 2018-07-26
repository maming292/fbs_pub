import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../services/public.service';
import * as $ from "jquery";
declare var AMap: any;
@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

	//	title: string = 'Angular4 AGM Demo';
	lat: number = 31.575787;
	lng: number = 120.299815;
	url = '/fbs/foreignForC/synthesize';
	stationNumber: any;
	warnNumber: any;
	energy: any;
	map: any;
	maps: any;
	list: any;
	secarea: any = '';
	sectype: any = '';
	area: any = '';
	standtype: any = '';
	companyname: any = '';
	av: any;
	marker: any;
	markdetail: any;
	constructor(private route: Router, private serve: IndexService, private http: HttpClient) {}
	ngOnInit() {
		this.map = new AMap.Map('map', {
			resizeEnable: true,
		});
		this.get();
		this.markdetail = [];
	}
	// 首页地图
	get() {
		this.map.clearMap();
		var athis = this.map;
		let info = new HttpParams().set('page', '1').set('total_number', '10000').set('area', this.area).set('stand_type', this.standtype).set('company_name', this.companyname);
console.log(info)
		this.serve.getData(this.url, info).then(data => {
			if(data['company']['list'].length == 0) {
				this.list = [];
				return;
			}
			if(data['code'] == 200) {

				this.secarea = data['areaAll'];
				this.sectype = data['standtype'];
				this.stationNumber = data['facilityCount'];
				this.warnNumber = data['warnCount'];
				this.energy = data['energy'];
				this.maps = data['start'];
				this.list = data['company']['list'];
				for(let i = 0;i<this.list.length;i++){
					console.log(this.list[i].TYPE)
				}
				if(data['company']['list'].length == 0) {
				this.list = [];
				return;
			}
				this.map.setZoomAndCenter(20, [data['company']['list'][0]['LONGITUDE'], data['company']['list'][0]['LATITUDE']]);
				$.each(data['company']['list'], function(i, v) {
					this.setmaerk([v['LONGITUDE'], v['LATITUDE']], v['FACILITY_NAME'], v['SUN_MJ_DAY'], v['DAY_EQ'], v['SUM_EQ'], v['FACILITY_NAME'], v['FACILITY_NUMBER'], v['TYPE'], v['STAND_TYPE']);
				}.bind(this));

			} else {
				swal(`~~~@${data['code']}`);
			}
		}).catch(err => {
			console.log(err);
		})

	}
	isOpen: boolean = false;

	//  首页地图添加点标记

	setmaerk(position, text, ystpow, nower, aller, companyname, fin_number, type, stand_type) {
		var that = this;
		this.marker = new AMap.Marker({
			map: this.map,
			offset: new AMap.Pixel(-17, -45),
			position: position,
			icon: new AMap.Icon({
				size: new AMap.Size(34, 50), //图标大小
				image: "../../../../assets/img/z2.png",
				imageOffset: new AMap.Pixel(0, 0)
			})
		});
		var text = new AMap.Text({
			text: text,
			textAlign: 'center', // 'left' 'right', 'center',
			verticalAlign: 'middle', //middle 、bottom
			//			draggable: true,
			cursor: 'pointer',
			// angle: 10,
			style: {
				'background-color': 'rgba(0,0,0,0)',
				'border': 'none',
				'font-size': '12px',
				'color': '#000099',
				'margin-top': '20px'
			},
			position: position
		});
		text.setMap(this.map);

		this.marker.customData = {
			myProperty: 666
		}; //添加私有属性
		//鼠标移入marker弹出自定义的信息窗体 click mouseover
		AMap.event.addListener(this.marker, 'click', function(e) {
			//			 var name = ecmsg[marker.customData.myProperty][0];
			//   		that.route.navigate(['/home/tablestatc'],{ queryParams: { id: 112 } })
			that.route.navigate(['home/map_detail'], {
				queryParams: {
					'ystpow': ystpow, // 昨日发电量
					'now': nower, // 今日发电量
					'all': aller, // 总发电量
					'companyname': companyname, // 公司名称
					'fin_number': fin_number, // 站点id
					'type': type, // 充电桩状态
					'stand_type': stand_type,
				}
			});
		});
	}

	markerClick(e) {
		e.open()
		this.isOpen = true;
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
	backLineMap() {
		this.route.navigateByUrl('/home/newline');
	}
}
class childData {
	public companyName: string; //公司名称
	public constructionScale: string; //规模
	public stationType: string //电站类型
	public state: string; //电桩状态
	public co2: string //节能减排

}