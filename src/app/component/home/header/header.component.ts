import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../../services/public.service';
import { NavigationEnd, Router } from '@angular/router';
import { IndexService } from '../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	flag: boolean = false;
	menu: any;
	sid: any;
	id: any;
	state: any = 0;
	alertshow: any;
	page: number = 1;
	maxPage: number = 1;
	pageArr: any;
	waringalert: any;
	waringarr: any;
	username: any;
	password_old: any;
	password_new: any;
	password_news: any;
	constructor(private route: Router, private sev: PublicService, private http: HttpClient) {}
		headers = new HttpHeaders().set("Accept", "*/*");
	options = {
		headers: this.headers,
		contentType: 'application/x-www-form-urlencoded'
	};
	ngOnInit() {
		this.username = sessionStorage['name'];
		let st = this.state;
		this.alertshow = false;
		this.waringalert = false;
		this.getwaring();
		

	}

	getwaring() {
		this.waringarr = [];
		this.http.get(`${this.sev.path}/fbs/foreignForC/getWarn`)
			.subscribe(function(data) {
				let arr = []
			for(let i = 0;i<data['list'].length;i++){
				arr.push(data['list'][i]['FACILITY_NUMBER']);
				arr.push(data['list'][i]['WARN_TYPE']);
				arr.push(data['list'][i]['TIME']);
				arr.push(data['list'][i]['COMPANY_NAME']);
				this.waringarr.push(arr);
			}
				this.maxPage = Math.ceil((this.waringarr.length) / 10);
				for(let i = 1; i <= this.maxPage; i++) {
					this.pageArr.push(i)
				}
			}.bind(this))
		
		this.maxPage = Math.ceil((this.waringarr.length) / 10);
		this.pageArr = [];
		for(let i = 1; i <= this.maxPage; i++) {
			this.pageArr.push(i)
		}
	}

	pwchange() {
		let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
		if(!this.password_new) {
			swal("请填写密码！");
			return;
		} else if(!regExp.test(this.password_new)) {
			swal("请输入6-21位数字和字母组合！");
			return;
		}
		
		if(this.password_new !== this.password_news) {
			swal("两次密码输入不一致,请重新输入！");
			return;
		}
		let info = new HttpParams().set('USERNAME', this.username).set('PASSWORD', this.password_old).set('NEWPASSWORD', this.password_new);
		this.http.post(`${this.sev.path}/fbs/foreignForC/updatePassword`, info, this.options).toPromise().then(function(data) {
			if(data){
				this.route.navigateByUrl('login');
			}else{
				swal(`账号或密码错误！`);
			}
			
		}.bind(this));
	}
	shows() {
		this.alertshow = true;
	}
	warshows() {
		this.waringalert = true;
	}
	hiddens() {
		this.alertshow = false;
	}
	warhiddens() {
		this.waringalert = false;
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

	logout() {
		this.route.navigateByUrl('login');
	}

	onIf(id, e) {
		this.sid = id;

	}
	remClas(){
		$('.byclass').removeClass('acti')
	}

}