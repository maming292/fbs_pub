import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../services/public.service';
import * as $ from "jquery";
import set = Reflect.set;

@Component({
	selector: 'app-tablestatc',
	templateUrl: './tablestatc.component.html',
	styleUrls: ['./tablestatc.component.css']
})
export class TablestatcComponent implements OnInit {
	pageslist: any; // 获取列表
	pagenum: any = 1; // 分页数据 以下

	prepage: any;
	nextpage: any;
	hasnextpage: any;
	hasprepage: any;
	pageArr = [10, 15, 20];
	//	firstdata: any;
	//	codes: any;
	allpages: any = 0;
	pages: any = 1; // 分页数据 以上
	par_seach: any = ''; //搜索条件 逆变器参数
	station_seach: any = ''; //搜索条件 站点
	star_seach: any = '';
	end_seach: any = '';
	page: number = 1;
	maxPage: number = 1;
	//	pageArr: any;	
	msglist: any;
	counts: any; //列表总条数
	gflag: any;
	par_arr: any = []; // 逆变器列表
	station_arr: any = []; // 站点列表
	a:any;
	constructor(private route: Router, private serve: IndexService, private http: HttpClient, private service: PublicService) {}
	headers = new HttpHeaders().set("Accept", "*/*");
	options = {
		headers: this.headers,
		contentType: 'application/x-www-form-urlencoded'
	};

	ngOnInit() {
//  console.log(this.route['navigations']['value']['rawUrl']['queryParams']['id'])
		layui.use(['laypage'], function() {
			var laypage = layui.laypage
			laypage.render({
				elem: 'ps',
				count: 50 
			});
		})
		var page = 1;
		var startDate = laydate.render({
			elem: '#star',
			done: function(value, date) { //监听日期被切换
				this.star_seach = value;
				if(value !== '') {
					endDate.config.min.year = date.year;
					endDate.config.min.month = date.month - 1;
					endDate.config.min.date = date.date;
				} else {
					endDate.config.min.year = '';
					endDate.config.min.month = '';
					endDate.config.min.date = '';
				}
			}.bind(this)
		});
		var endDate = laydate.render({
			elem: '#end',
			done: function(value, date) { //监听日期被切换
				if(value !== '') {
					startDate.config.max.year = date.year;
					startDate.config.max.month = date.month - 1;
					startDate.config.max.date = date.date;
				} else {
					startDate.config.max.year = '';
					startDate.config.max.month = '';
					startDate.config.max.date = '';
				}
				this.end_seach = value;
			}.bind(this)
		});

		this.getdata();

	}
	dateformat(dater) {
		if(!dater) {
			return '';
		}
		var date = new Date(dater);
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate();
		this.a = Y + M + D
		return Y + M + D;
	}

	getdata() {
			if(!!this.star_seach && !!this.end_seach){
			if(this.star_seach == this.end_seach) {
				swal('查询的时间不能相同！')
				return false;
			}
		}
		let info = new HttpParams().set('page', '1').set('total_number', '10').set('facility_number', this.par_seach).set('company_id', this.station_seach).set('start_time', this.star_seach).set('end_time', this.end_seach);
		this.http.post(`${this.service.path}/fbs/foreignForC/photovoltaic_statistics`, info, this.options).subscribe(function(data) {
			if(data['code'] == 200) {
//				this.par_arr = data['listFacility'];
				this.station_arr = data['listCompany'];
				this.pageslist = data['inverterAll']['list'];
				this.allpages = data['inverterAll']['total'];
				this.pages = data['inverterAll']['pages'];
				this.pagenum = data['inverterAll']['pageNum'];
				this.prepage = data['inverterAll']['prePage'];
				this.nextpage = data['inverterAll']['nextPage'];
				this.hasprepage = data['inverterAll']['hasPreviousPage'];
				this.hasnextpage = data['inverterAll']['hasNextPage'];
			} else {
				swal(`未知错误${data['code']}`);
			}
		}.bind(this))
	}
	
	seachplace(){
				let info = new HttpParams().set('company_id', this.station_seach)
		this.http.post(`${this.service.path}/fbs/foreignForC/changeWZ`, info, this.options).subscribe(function(data) {
			
			if(data['result'] == true) {
				this.par_arr = data['date']['list'];
				console.log(this.par_arr)
			} else {
			}
		}.bind(this))
	}

	turn(an, e) {
		var page = 1;
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
				console.log(page)
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
		let info = new HttpParams().set('page', '' + page).set('total_number', '10').set('facility_number', this.par_seach).set('company_id', this.station_seach).set('start_time', this.star_seach).set('end_time', this.end_seach);
		this.http.post(`${this.service.path}/fbs/foreignForC/photovoltaic_statistics`, info, this.options)
			.subscribe(function(data) {
				if(data['code'] == 200) {
					this.pageslist = data['inverterAll']['list'];
					this.allpages = data['inverterAll']['total'];
					this.pages = data['inverterAll']['pages'];
					this.pagenum = data['inverterAll']['pageNum'];
					this.prepage = data['inverterAll']['prePage'];
					this.nextpage = data['inverterAll']['nextPage'];
					this.hasprepage = data['inverterAll']['hasPreviousPage'];
					this.hasnextpage = data['inverterAll']['hasNextPage'];
				} else {
					swal(`未知错误${data['code']}`);
				}
			}.bind(this))
	}

	out() {
/*		$.ajax({
			type:"post",
			url:`${this.service.path}/fbs/foreignForC/exportStatistics?company_id=${this.station_seach}&facility_number=${this.par_seach}&start_time=${this.star_seach}&end_time=${this.end_seach}`,
			async:true,
			success:function(){
				alert('下载完毕')
			}
		});*/
		
			location.href = `${this.service.path}/fbs/foreignForC/exportStatistics?company_id=${this.station_seach}&facility_number=${this.par_seach}&start_time=${this.star_seach}&end_time=${this.end_seach}`
	}
	backs() {
		this.route.navigateByUrl('/home/runing');
	}
}