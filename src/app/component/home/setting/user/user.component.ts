import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../../services/public.service';
import * as $ from "jquery";
import set = Reflect.set;

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	msglist: any;
	alertshow: any;
	page: number = 1;
	maxPage: number = 1;
	pageArr: any;

	roles_add: any;
	user_name: any; //新增
	password: any;
	real_name: any;
	role_name: any = -1;
	user_s: any;
	delUserId: any;

	username_com: any; // 编辑
	password_com: any;
	realname_com: any;
	rolename_com: any;
	id_com: any;

	showcompile: any; // 控制编辑框的显示隐藏
	rolenameara: any; // 角色 和其ID对照表

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
		this.getdata()
		this.maxPage = Math.ceil((this.msglist.length) / 10);
		this.pageArr = [];
		for(let i = 1; i <= this.maxPage; i++) {
			this.pageArr.push(i)
		}
	}
	// 编辑回显
	compile(username_com, realname_com, rolename_com, id_com, password_com) {
		this.username_com = username_com;
		this.realname_com = realname_com;
		this.password_com = password_com;
		this.rolename_com = this.rolenameara[rolename_com];
		this.id_com = id_com;
		this.showcompile = true;

	}
	hiddencompile() {
		this.showcompile = false;
	}
	savecompile() {
		let regExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
		
		if(!this.username_com) {
			swal("请填写用户名！");
			return;
		}
//		if(!this.password_com) {
//			swal("请填写密码！");
//			return;
//		} else if(!regExp.test(this.password_com)) {
//			swal("请输入6-21位数字和字母组合！");
//			return;
//		}
		if(!this.realname_com) {
			swal("请输入真实姓名！");
			return;
		}
		if(!this.role_name) {
			swal("请选择角色！");
			return;
		}

		let info = new HttpParams().set('NAME', this.realname_com).set('PASSWORD', this.password_com).set('ROLE_ID', this.rolename_com).set('ID', this.id_com);
		this.http.post(`${this.service.path}/fbs/system/updateUser`, info, this.options).toPromise().then(function() {
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

		this.user_name = '';
		this.password = '';
		this.real_name = '';
		this.role_name = -1;
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
		this.roles_add = [];
		this.http.get(`${this.service.path}/fbs/system/findUser`)
			.subscribe(function(data) {
				console.log(data)
				this.roles_add = data['roles'];
				this.rolenameara = {};
				for(let i = 0; i < this.roles_add.length; i++) {
					this.rolenameara[this.roles_add[i].ROLE_NAME] = this.roles_add[i]['ID']
				}
				console.log(this.rolenameara)
				for(var m = 0; m < data['result'].length; m++) {
					var arr = [data['result'][m]['USERNAME'], data['result'][m]['NAME'], data['result'][m]['ROLE_NAME'], data['result'][m]['LOG_TIME'], data['result'][m]['ID'], data['result'][m]['PASSWORD']]
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

	save() {
		let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
		if(!this.user_name) {
			swal("请填写用户名！");
			return;
		}
		if(!this.password) {
			swal("请填写密码！");
			return;
		} else if(!regExp.test(this.password)) {
			swal("请输入6-21位数字和字母组合！");
			return;
		}
		if(!this.real_name) {
			swal("请输入真实姓名！");
			return;
		}
		if(!this.role_name) {
			swal("请选择角色！");
			return;
		}
		let info = new HttpParams().set('USERNAME', this.user_name).set('NAME', this.real_name).set('PASSWORD', this.password).set('ROLE_ID', this.role_name);
		this.http.post(`${this.service.path}/fbs/system/saveUser`, info, this.options).toPromise().then(function() {
			this.msglist = [];
			this.getdata();
		}.bind(this));
		this.alertshow = false;
			this.user_name = '';
		this.password = '';
		this.real_name = '';
		this.role_name = -1;
	}
	setuserId(delUserId) {
		this.delUserId = delUserId;
	}
	del(id) {

		layer.confirm('您确定要删除该条记录吗？', {
			btn: ['删除', '取消']
		}, function() {
			let info = new HttpParams().set('ID', id);
			this.http.post(`${this.service.path}/fbs/system/deleteUser`, info, this.options).toPromise().then(function() {
				this.msglist = [];
				this.getdata();
			}.bind(this));
			layer.msg('已经删除该条记录', {
				icon: 1
			});
		}.bind(this), function() {});
	}

	seach(username) {
		this.msglist = [];
		var msg = this.msglist;
		let info = new HttpParams().set('USERNAME', username);
		this.http.post(`${this.service.path}/fbs/system/findUser`, info, this.options)
			.subscribe(function(data) {
				for(var m = 0; m < data['result'].length; m++) {
					var arr = [data['result'][m]['USERNAME'], data['result'][m]['NAME'], data['result'][m]['ROLE_NAME'], data['result'][m]['LOG_TIME'], data['result'][m]['ID']]
					msg.push(arr)
				}
				this.pageArr = [];
				this.maxPage = Math.ceil((msg.length) / 10);
				for(let i = 1; i <= this.maxPage; i++) {
					this.pageArr.push(i)
				}

			}.bind(this))

	}

	out() {
		if(this.user_s) {
			location.href = `${this.service.path}/fbs/system/impUser?USERNAME=${this.user_s}`
		} else {
			location.href = `${this.service.path}/fbs/system/impUser`
		}
	}

}