import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../../services/public.service';
import * as $ from "jquery";
import set = Reflect.set;

@Component({
	selector: 'app-station',
	templateUrl: './station.component.html',
	styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
	showcompile: any; // 控制编辑框的显示隐藏
	msglist: any;
	alertshow: any;
	page: number = 1;
	maxPage: number = 1;
	pageArr: any;
	area_s: any = ''; // 查询条件 区域
	standtype_s: any = ''; // 电站类型
	companyname_s: any = '';
	area_arr: any = []; // 区域 集合
	standtype_arr: any = ['光伏']; // 电站类型集合
	construction_arr: any = []; // 建设类型集合

	companyname_new: any; // 新增 站点名称
	standtype_new: any; // 新增 电站类型
	construction_new: any; // 新增 建设类型
	constructionscale_new: any; // 新增建设规模
	area_new: any = ''; // 新增所在区域
	raroc_new: any; // 新增 投资回报率
	savings_new: any; // 新增 节约成本
	long_new: any; // 新增 经度
	latitude_new: any; // 新增 纬度
	imgbase64_new: any = -1; // 新增 图片
	showimg: any; // 路径
	area_obj: any = {}; // 所属区域 和其 ID 对照表

	companyname_com: any; // 编辑 站点名称
	standtype_com: any; // 编辑 电站类型
	construction_com: any; // 编辑 建设类型
	constructionscale_com: any; // 编辑 建设规模
	area_com: any = ''; // 编辑 所在区域
	raroc_com: any; // 编辑 投资回报率
	savings_com: any; // 编辑 节约成本
	long_com: any; // 编辑 经度
	latitude_com: any; // 编辑 纬度
	imgbase64_com:any;
	id_com:any;
	constructor(private route: Router, private serve: IndexService, private http: HttpClient, private service: PublicService) {}
	headers = new HttpHeaders().set("Accept", "*/*");
	options = {
		headers: this.headers,
		contentType: 'application/x-www-form-urlencoded'
	};
	ngOnInit() {
		this.showcompile = false;
		this.alertshow = false;
		this.msglist = [];
		this.getdata();
		this.maxPage = Math.ceil((this.msglist.length) / 10);
		this.pageArr = [];
		for(let i = 1; i <= this.maxPage; i++) {
			this.pageArr.push(i)
		}

	}

	showPic(url) {
		this.showimg = url;
		layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			area: '700px',
			skin: 'layui-layer-nobg', //没有背景色
			shadeClose: true,
			content: `<img src="${this.showimg}" style="width: 700px;"/>`
		});
	}

	loadImg() {
		//获取文件  
		//		var file = $("#pic")[0].files[0];
		var file = $("#pic")[0]['files'][0];
		//创建读取文件的对象  
		var reader = new FileReader();

		//创建文件读取相关的变量  
		var imgFile;

		//为文件读取成功设置事件  
		reader.onload = function(e) {
			imgFile = e['target']['result'];
			this.imgbase64_new = imgFile;
		}.bind(this);
		//正式读取文件  
		reader.readAsDataURL(file);
	}
	comImg() {
		//获取文件  
		let file = $("#pic_com")[0]['files'][0];
		
		//创建读取文件的对象  
		let reader = new FileReader();
		//创建文件读取相关的变量  
		let imgFiles;
		//为文件读取成功设置事件  
		reader.onload = function(e) {
//			console.log('文件读取完成');
			imgFiles = e['target']['result'];
			this.imgbase64_com = imgFiles;
		}.bind(this);
		//正式读取文件  
		reader.readAsDataURL(file);
	}
	// 编辑回显
	compile(companyname_com,standtype_com,construction_com,constructionscale_com,area_com,raroc_com,savings_com,long_com,latitude_com,imgbase64_com, id_com) {
//		console.log(id_com)
		this.companyname_com = companyname_com;
		this.standtype_com = standtype_com;
		this.construction_com = construction_com;
		this.constructionscale_com = constructionscale_com;
		this.area_com = area_com;
		this.raroc_com = raroc_com;
		this.savings_com = savings_com;
		this.long_com = long_com;
		this.latitude_com = latitude_com;
		this.imgbase64_com = imgbase64_com;
		this.id_com = id_com;
		this.showcompile = true;
console.log(this.imgbase64_com)
	}
	hiddencompile() {
		this.showcompile = false;
	}
	savecompile() {
				if(!this.companyname_com) {
					swal("站点不能为空！");
					return;
				}
				if(!this.standtype_com) {
					swal("电站类型不能为空！");
					return;
				}
				if(!this.construction_com) {
					swal("建设类型不能为空！");
					return;
				}
				if(!this.constructionscale_com) {
					swal("建设规模不能为空！");
					return;
				}
				if(!this.long_com) {
					swal("经度不能为空！");
					return;
				}
				if(!this.latitude_com) {
				swal("纬度不能为空！");
				return;
				}
		let area_com = this.area_obj[this.area_com];
		let info = new HttpParams()
			.set('COMPANY_NAME', this.companyname_com)
			.set('STAND_TYPE', this.standtype_com)
			.set('CONSTRUCTION_TYPE', this.construction_com)
			.set('CONSTRUCTION_SCALE', this.constructionscale_com)
			.set('DISTRICT_ID', area_com)
			.set('RAROC', this.raroc_com)
			.set('COST_SAVINGS', this.savings_com)
			.set('LONGITUDE', this.long_com)
			.set('LATITUDE', this.latitude_com)
			.set('uploadFile', this.imgbase64_com?this.imgbase64_com:'')
			.set('ID', this.id_com);
		this.http.post(`${this.service.path}/fbs/system/updateCompany`, info, this.options).toPromise().then(function() {
			this.msglist = [];
			this.getdata();
		}.bind(this));
		this.showcompile = false;
	}

// companyname_com,standtype_com,construction_com,constructionscale_com,area_com,raroc_com,savings_com,long_com,latitude_com,imgbase64_com
	getdata() {
		
		var msg = this.msglist;
		this.http.get(`${this.service.path}/fbs/system/findCompany`)
			.subscribe(function(data) {
				this.area_obj = {};
				this.area_arr = [];
				for(let i in data['areaAll']) {
					this.area_arr.push(data['areaAll'][i]['AREA']);
					this.area_obj[data['areaAll'][i]['AREA']] = data['areaAll'][i]['ID']
				}

				console.log(data)
				for(var m = 0; m < data['result'].length; m++) {
					var arr = [
						data['result'][m]['COMPANY_NAME'], // 0
						data['result'][m]['STAND_TYPE'], // 1
						data['result'][m]['CONSTRUCTION_TYPE'], // 2
						data['result'][m]['CONSTRUCTION_SCALE'], // 3
						data['result'][m]['AREA'], // 4
						data['result'][m]['RAROC'], // 5
						data['result'][m]['COST_SAVINGS'], // 6
						data['result'][m]['LONGITUDE'], // 7
						data['result'][m]['LATITUDE'], // 8
						data['result'][m]['BANNER_URL'], // 9
						data['result'][m]['ID'] // 10
					]
					msg.push(arr)
				}
				this.pageArr = [];
				this.maxPage = Math.ceil((msg.length) / 10);
				for(let i = 1; i <= this.maxPage; i++) {
					this.pageArr.push(i)
				}

			}.bind(this))
	}
	save() {
			if(!this.companyname_new) {
					swal("站点不能为空！");
					return;
				}
				if(!this.standtype_new) {
					swal("电站类型不能为空！");
					return;
				}
				if(!this.construction_new) {
					swal("建设类型不能为空！");
					return;
				}
				if(!this.constructionscale_new) {
					swal("建设规模不能为空！");
					return;
				}
				if(!this.area_new) {
					swal("区域不能为空！");
					return;
				}
				if(!this.long_new) {
					swal("经度不能为空！");
					return;
				}
				if(!this.latitude_new) {
				swal("纬度不能为空！");
				return;
				}

		let area_new = this.area_obj[this.area_new]

		let info = new HttpParams()
			.set('COMPANY_NAME', this.companyname_new)
			.set('STAND_TYPE', this.standtype_new)
			.set('CONSTRUCTION_TYPE', this.construction_new)
			.set('CONSTRUCTION_SCALE', this.constructionscale_new)
			.set('DISTRICT_ID', area_new)
			.set('RAROC', this.raroc_new)
			.set('COST_SAVINGS', this.savings_new)
			.set('LONGITUDE', this.long_new)
			.set('LATITUDE', this.latitude_new)
			.set('uploadFile', this.imgbase64_new);
		console.log(info)
		this.http.post(`${this.service.path}/fbs/system/saveCompany`, info, this.options).toPromise().then(function() {

			this.msglist = [];
			this.getdata();
		}.bind(this));
		this.alertshow = false;
		
		this.companyname_new = '';
	this.standtype_new = '';
	this.construction_new = '';
	this.constructionscale_new = '';
	this.area_new = '';
	this.raroc_new = '';
	this.savings_new = '';
	this.long_new = '';
	this.latitude_new = '';
	this.imgbase64_new = '';
	}

	seach() {
		this.msglist = [];
		var msg = this.msglist;
		let info = new HttpParams().set('AREA', this.area_s).set('STAND_TYPE', this.standtype_s).set('COMPANY_NAME', this.companyname_s);
		this.http.post(`${this.service.path}/fbs/system/findCompany`, info, this.options)
			.subscribe(function(data) {
				for(var m = 0; m < data['result'].length; m++) {
					var arr = [data['result'][m]['COMPANY_NAME'], // 0
						data['result'][m]['STAND_TYPE'], // 1
						data['result'][m]['CONSTRUCTION_TYPE'], // 2
						data['result'][m]['CONSTRUCTION_SCALE'], // 3
						data['result'][m]['AREA'], // 4
						data['result'][m]['RAROC'], // 5
						data['result'][m]['COST_SAVINGS'], // 6
						data['result'][m]['LONGITUDE'], // 7
						data['result'][m]['LATITUDE'], // 8
						data['result'][m]['uploadFile'], // 9
						data['result'][m]['ID'] // 10
					]
					msg.push(arr)
				}
				this.pageArr = [];
				this.maxPage = Math.ceil((msg.length) / 10);
				for(let i = 1; i <= this.maxPage; i++) {
					this.pageArr.push(i)
				}

			}.bind(this))
	}
	del(id) {
		layer.confirm('您确定要删除该条记录吗？', {
			btn: ['删除', '取消']
		}, function() {
			let info = new HttpParams().set('ID', id);
			this.http.post(`${this.service.path}/fbs/system/deleteCompany`, info, this.options).toPromise().then(function() {
				console.log(666)
				this.msglist = [];
				this.getdata();
			}.bind(this));
			layer.msg('已经删除该条记录', {
				icon: 1
			});
		}.bind(this), function() {});

	}
	out() {
		if(this.standtype_s || this.area_s || this.companyname_s) {
			location.href = `${this.service.path}/fbs/system/impCompany?STAND_TYPE=${this.standtype_s}&DISTRICT_ID=${this.area_s}&COMPANY_NAME=${this.companyname_s}`
		} else {
			location.href = `${this.service.path}/fbs/system/impCompany`
		}
	}

	shows() {
		this.alertshow = true;
	}
	hiddens() {
		this.alertshow = false;
	this.companyname_new = '';
	this.standtype_new = '';
	this.construction_new = '';
	this.constructionscale_new = '';
	this.area_new = '';
	this.raroc_new = '';
	this.savings_new = '';
	this.long_new = '';
	this.latitude_new = '';
	this.imgbase64_new = '';
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