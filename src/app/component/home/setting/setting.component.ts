import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { PublicService } from '../../../services/public.service';
import * as $ from "jquery";

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

	constructor(private router: Router) {}
	ngOnInit() {}

}