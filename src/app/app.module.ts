import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import {FormsModule} from '@angular/forms';
import {PublicService} from './services/public.service';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { IndexComponent } from './component/home/index/index.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { WeatherComponent } from './component/home/weather/weather.component';
import { ForecastComponent } from './component/home/forecast/forecast.component';
import { QualityComponent } from './component/home/quality/quality.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { CalendarModule, DropdownModule,  SidebarModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DetailComponent } from './component/home/index/detail/detail.component';
import {WeatherService} from './component/home/weather/weatherservice';
import {IndexService} from './services/index.service';
import { FixedNumberPipe } from './pipe/fixed-number.pipe';
import { RuningComponent } from './component/home/runing/runing.component';
import {LoopService} from './services/loop.service';
import { HeaderComponent } from './component/home/header/header.component';
import {RuningService} from './component/home/runing/runing.service';
import { NewlineComponent } from './component/home/newline/newline.component';
import { DatadisplayComponent } from './component/home/datadisplay/datadisplay.component';
import { SettingComponent } from './component/home/setting/setting.component';
import { StationComponent } from './component/home/setting/station/station.component';
import { EquipmentComponent } from './component/home/setting/equipment/equipment.component';
import { UserComponent } from './component/home/setting/user/user.component';
import { RoleComponent } from './component/home/setting/role/role.component';
import { AreaComponent } from './component/home/setting/area/area.component';
import { TablestatcComponent } from './component/home/tablestatc/tablestatc.component';
import { Newline2Component } from './component/home/newline2/newline2.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    IndexComponent,
    WeatherComponent,
    ForecastComponent,
    QualityComponent,
    DetailComponent,
    FixedNumberPipe,
    RuningComponent,
    HeaderComponent,
    NewlineComponent,
    DatadisplayComponent,
    SettingComponent,
    StationComponent,
    EquipmentComponent,
    UserComponent,
    RoleComponent,
    AreaComponent,
    TablestatcComponent,
    Newline2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxEchartsModule,
    CalendarModule,
    SidebarModule,
    BrowserAnimationsModule,
    DropdownModule,
  ],
  providers: [PublicService,{provide: LocationStrategy, useClass: HashLocationStrategy},WeatherService,IndexService,LoopService,RuningService],
  bootstrap: [AppComponent]
})
export class AppModule { }
