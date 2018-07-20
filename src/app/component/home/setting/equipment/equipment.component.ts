import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../../services/public.service';
import * as $ from "jquery";
import set = Reflect.set;
@Component({
	selector: 'app-equipment',
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
	msglist: any;
	page: number = 1;
	maxPage: number = 1;
	pageArr: any;
	area: any = ''; // 搜索条件
	company: any = '';
	num: any = '';
	area_opt: any = []; // 搜索条件列表(数组)
	company_opt: any = [];
	showcompile: any; // 控制编辑框的显示隐藏
	company_com:any;  // 编辑 所属站点
	area_com:any;     // 编辑 设备位置
	id_com:any;
	company_list:any;  // 所属站点 和其 ID 对照表 编辑是时候使用
	constructor(private route: Router, private serve: IndexService, private http: HttpClient, private service: PublicService) {}
	headers = new HttpHeaders().set("Accept", "*/*");
	options = {
		headers: this.headers,
		contentType: 'application/x-www-form-urlencoded'
	};

	ngOnInit() {
		this.company_list = {};
		this.showcompile = false;
		this.msglist = [];
		this.getdata();
		this.maxPage = Math.ceil((this.msglist.length) / 10);
		this.pageArr = [];
		for(let i = 1; i <= this.maxPage; i++) {
			this.pageArr.push(i)
		}
	}
	// 编辑回显
	compile(company_com, area_com, id_com) {
		this.company_com = company_com;
		this.area_com = area_com;
		this.id_com = id_com;
		this.showcompile = true;

	}
	hiddencompile() {
		this.showcompile = false;
	}
	savecompile() {
if(!this.company_com) {
					swal("所属站点不能为空！");
					return;
				}
		var company_id = this.company_list[this.company_com]
		
		let info = new HttpParams().set('COMPANY_ID', company_id).set('FACILITY_NAME', this.area_com).set('ID', this.id_com);
		this.http.post(`${this.service.path}/fbs/system/updateFacility`, info, this.options).toPromise().then(function() {
			this.msglist = [];
			this.getdata();
		}.bind(this));
		this.showcompile = false;
	}
	getdata() {
		var msg = this.msglist;
		let info = new HttpParams().set('AREA', this.area).set('COMPANY_NAME', this.company).set('FACILITY_NUMBER', this.num);
		this.http.post(`${this.service.path}/fbs/system/findFacility`, info, this.options)
			.subscribe(function(data) {
				this.area_opt = data['areaAll'];
				this.company_opt = [];
				for(let i = 0; i < data['companys'].length; i++) {
					this.company_list[data['companys'][i]['COMPANY_NAME']] = data['companys'][i]['ID']
					this.company_opt.push(data['companys'][i]['COMPANY_NAME']);
				}
				console.log(this.company_list)
				for(var m = 0; m < data['result'].length; m++) {
					var arr = [data['result'][m]['COMPANY_NAME'], (data['result'][m]['AREA']) ? (data['result'][m]['AREA']) : '', data['result'][m]['FACILITY_NUMBER'], (data['result'][m]['FACILITY_NAME']) ? (data['result'][m]['FACILITY_NAME']) : '', '已接入', data['result'][m]['CREATE_TIME'], data['result'][m]['ID']]
					msg.push(arr)
				}
				//				console.log(msg)
				this.pageArr = [];
				this.maxPage = Math.ceil((msg.length) / 10);
				for(let i = 1; i <= this.maxPage; i++) {
					this.pageArr.push(i)
				}
			}.bind(this))
	}

	search() {
		this.msglist = [];
		var msg = this.msglist;
		let info = new HttpParams().set('AREA', this.area).set('COMPANY_NAME', this.company).set('FACILITY_NUMBER', this.num);
		this.http.post(`${this.service.path}/fbs/system/findFacility`, info, this.options)
			.subscribe(function(data) {
				for(var m = 0; m < data['result'].length; m++) {
					var arr = [data['result'][m]['COMPANY_NAME'], (data['result'][m]['AREA']) ? (data['result'][m]['AREA']) : '', data['result'][m]['FACILITY_NUMBER'], (data['result'][m]['FACILITY_NAME']) ? (data['result'][m]['FACILITY_NAME']) : '', '已接入', data['result'][m]['CREATE_TIME'], data['result'][m]['ID']]
					msg.push(arr)
				}
				this.pageArr = [];
				this.maxPage = Math.ceil((msg.length) / 10);
				for(let i = 1; i <= this.maxPage; i++) {
					this.pageArr.push(i)
				}

			}.bind(this))
	}

//	area: any = ''; // 搜索条件
//	company: any = '';
//	num: any = '';

	out() {
		if(this.area || this.company || this.num) {
			location.href = `${this.service.path}/fbs/system/impFacility?AREA=${this.area}&COMPANY_NAME=${this.company}&FACILITY_NUMBER=${this.num}`
		} else {
			location.href = `${this.service.path}/fbs/system/impFacility`
		}
	}
	
	prev() {
		if(this.page > 1) {
			this.page--
		} else {
			return;
		}
	}
	first() {

		this.page = 1;
	}
	last() {
		this.page = this.maxPage;
	}
	next() {
		if(this.page < this.maxPage) {
			this.page++
		} else {
			return;
		}
	}
}