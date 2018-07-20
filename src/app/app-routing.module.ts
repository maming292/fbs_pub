import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {IndexComponent} from './component/home/index/index.component';
import {WeatherComponent} from './component/home/weather/weather.component';
import {ForecastComponent} from './component/home/forecast/forecast.component';
import {QualityComponent} from './component/home/quality/quality.component';
import {DetailComponent} from './component/home/index/detail/detail.component';
import {RuningComponent} from './component/home/runing/runing.component';
import {NewlineComponent} from './component/home/newline/newline.component';
import {DatadisplayComponent} from './component/home/datadisplay/datadisplay.component';
import {SettingComponent} from './component/home/setting/setting.component';
import {StationComponent} from './component/home/setting/station/station.component';
import { EquipmentComponent } from './component/home/setting/equipment/equipment.component';
import { UserComponent } from './component/home/setting/user/user.component';
import { RoleComponent } from './component/home/setting/role/role.component';
import { AreaComponent } from './component/home/setting/area/area.component';
import { TablestatcComponent } from './component/home/tablestatc/tablestatc.component';
import { Newline2Component } from './component/home/newline2/newline2.component';

const routes: Routes = [
	{path:'',redirectTo:'/login',pathMatch:'full'},
//{path:'',redirectTo:'/home/datadisplay',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,children:[
	  {path:'',redirectTo:'/home/map',pathMatch:'full'},
      {path:'map',component:IndexComponent},
      {path:'map_detail',component:DetailComponent},
      {path:'weather',component:WeatherComponent},
      {path:'forecast',component:ForecastComponent},
      {path:'quality',component:QualityComponent},
      {path:'runing',component:RuningComponent},
      {path:'newline',component:NewlineComponent},
      {path:'newline2',component:Newline2Component},
      {path:'datadisplay',component:DatadisplayComponent},
      {path:'tablestatc',component:TablestatcComponent},
      {path:'setting',component:SettingComponent,children:[
      	{path:'',redirectTo:'/home/setting/station',pathMatch:'full'},
      	{path:'station',component:StationComponent},
      	{path:'equipment',component:EquipmentComponent},
      	{path:'user',component:UserComponent},
      	{path:'role',component:RoleComponent},
      	{path:'area',component:AreaComponent},
      ]}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
