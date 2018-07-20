import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../services/index.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PublicService } from '../../../services/public.service';
import * as $ from "jquery";
@Component({
  selector: 'app-newline2',
  templateUrl: './newline2.component.html',
  styleUrls: ['./newline2.component.css']
})
export class Newline2Component implements OnInit {

 	constructor(private route: Router, private serve: IndexService, private http: HttpClient) {}

  ngOnInit() {
  	this.geth();
  }
cl(){
	console.log('无锡广盈实业有限公司 2500kVA 备供')
}
geth(){
	$('.nl2').height(window.innerHeight - 60)
}
backMap() {
		this.route.navigateByUrl('/home/map');
	}
}
