import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../../services/public.service';
import * as $ from "jquery";
import set = Reflect.set;
@Component({
	selector: 'app-role',
	templateUrl: './role.component.html',
	styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
	showcompile: any = false; // 控制编辑框的显示隐藏
	msglist: any;
	alertshow: any;
	page: number = 1;
	maxPage: number = 1;
	pageArr: any;
	addrolename: any; // 新增角色
	addroledesc: any;
	role_name: any = '';
	rolename_com: any; //编辑
	roledesc_com: any;
	id_com: any;
	constructor(private route: Router, private serve: IndexService, private http: HttpClient, private service: PublicService) {}
	headers = new HttpHeaders().set("Accept", "*/*");
	options = {
		headers: this.headers,
		contentType: 'application/x-www-form-urlencoded'
	};
	ngOnInit() {
		this.alertshow = false;
		this.msglist = [];
		this.getdata();
		this.maxPage = Math.ceil((this.msglist.length) / 10);
		this.pageArr = [];
		for(let i = 1; i <= this.maxPage; i++) {
			this.pageArr.push(i)
		}

	}
	// 编辑回显
	compile(rolename_com, roledesc_com, id_com) {
		this.rolename_com = rolename_com;
		this.roledesc_com = roledesc_com;
		this.id_com = id_com;
		this.showcompile = true;
	}
	hiddencompile() {
		this.showcompile = false;
	}
	savecompile() {
		if(!this.rolename_com) {
			swal("请输入角色名称");
			return;
		}
		if(!this.roledesc_com) {
			swal("请输入角色描述！");
			return;
		}
		let info = new HttpParams().set('ROLE_NAME', this.rolename_com).set('DESCRIPTION', this.roledesc_com).set('ID', this.id_com);
		this.http.post(`${this.service.path}/fbs/system/updateRole`, info, this.options).toPromise().then(function() {
			this.msglist = [];
			this.getdata();
		}.bind(this));
		this.showcompile = false;
	}

	shows() {
		this.alertshow = true;
	}
	hiddens() {
		this.alertshow = false;
		this.addrolename = '';
		this.addroledesc = '';
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

	getdata() {
		var msg = this.msglist;
		this.http.get(`${this.service.path}/fbs/system/findRole`)
			.subscribe(function(data) {
				console.log(data)
				for(var m = 0; m < data['result'].length; m++) {
					var arr = [data['result'][m]['ROLE_NAME'], data['result'][m]['DESCRIPTION'], data['result'][m]['ID']]
					msg.push(arr)
				}
				console.log(msg)
				this.pageArr = [];
				this.maxPage = Math.ceil((msg.length) / 10);
				for(let i = 1; i <= this.maxPage; i++) {
					this.pageArr.push(i)
				}

			}.bind(this))

	}

	save() {
		if(!this.addrolename) {
			swal("请输入角色名称");
			return;
		}
		if(!this.addroledesc) {
			swal("请输入角色描述！");
			return;
		}
		let info = new HttpParams().set('ROLE_NAME', this.addrolename).set('DESCRIPTION', this.addroledesc);
		this.http.post(`${this.service.path}/fbs/system/saveRole`, info, this.options).toPromise().then(function() {
			console.log(666)
			this.msglist = [];
			this.getdata();
		}.bind(this));

		this.alertshow = false;
		this.addrolename = '';
		this.addroledesc = '';
	}

	del(id) {
		layer.confirm('您确定要删除该条记录吗？', {
			btn: ['删除', '取消']
		}, function() {
			let info = new HttpParams().set('ID', id);
			this.http.post(`${this.service.path}/fbs/system/deleteRole`, info, this.options).toPromise().then(function() {
				this.msglist = [];
				this.getdata();
			}.bind(this));
			layer.msg('已经删除该条记录', {
				icon: 1
			});
		}.bind(this), function() {});
	}

	seach(role_name) {
		console.log(role_name)
		this.msglist = [];
		var msg = this.msglist;
		let info = new HttpParams().set('ROLE_NAME', role_name);;
		this.http.post(`${this.service.path}/fbs/system/findRole`, info, this.options)
			.subscribe(function(data) {
				console.log(data)
				for(var m = 0; m < data['result'].length; m++) {
					var arr = [data['result'][m]['ROLE_NAME'], data['result'][m]['DESCRIPTION'], data['result'][m]['ID']];
					msg.push(arr);
				}
				//				console.log(msg)	
				this.pageArr = [];
				this.maxPage = Math.ceil((msg.length) / 10);
				for(let i = 1; i <= this.maxPage; i++) {
					this.pageArr.push(i)
				}

			}.bind(this))

	}
	out() {
		if(this.role_name) {
			location.href = `${this.service.path}/fbs/system/impRole?ROLE_NAME=${this.role_name}`
		} else {
			location.href = `${this.service.path}/fbs/system/impRole`
		}
	}
}