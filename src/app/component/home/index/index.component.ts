import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../services/public.service';
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
	list: any;
	secarea: any = '';
	sectype: any = '';
	area: any = '';
	standtype: any = '';
	companyname: any = '';
	av: any;
	marker: any;
	constructor(private route: Router, private serve: IndexService, private http: HttpClient) {}
	ngOnInit() {
		this.get();
		this.map = new AMap.Map('map', {
			resizeEnable: true,
			zoom: 11,
			center: [120.299815, 31.575787]
		});

		var markdetail = [{
				text: '碧桂园·玲珑湾别墅用户',
				dw: [120.131369,31.48077]
			},
			{
				text: '无锡广盈实业有限公司',
				dw: [120.284703,31.565999]
			}
		];

		$.each(markdetail, function(i, v) {
			this.setmaerk(v.dw, v.text)
		}.bind(this));
	}
	// 首页地图
	get() {
		let info = new HttpParams().set('page', '1').set('total_number', '10000').set('area', this.area).set('stand_type', this.standtype).set('company_name', this.companyname)
		this.serve.getData(this.url, info).then(data => {
			console.log(data);
			if(data['code'] == 200) {
				this.secarea = data['areaAll'];
				//				this.sectype = data['listCompany'];
				this.sectype = data['standtype'];
				this.list = data['company']['list'];
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
	isOpen: boolean = false;

	//  首页地图添加点标记

	setmaerk(position, text) {
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
  				'padding-top': '20px'
			},
			position: position
		});
    text.setMap(this.map);
	}

	markerClick(e) {
		e.open()
		this.isOpen = true;
	}
	onClick(now, all) {
		this.route.navigate(['home/map_detail'], {
			queryParams: {
				'now': now,
				'all': all
			}
		});
	}
	givedata() {
		//		console.log('提供list')
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