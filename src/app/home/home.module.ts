import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProgressBarService, WeatherService} from "../services";
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {ApiInterceptor, ProgressInterceptor} from "../interceptors";
import {PipeModule} from "../pipes/pipe.module";
import {ChartsModule} from "ng2-charts";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        PipeModule,
        ChartsModule,
    ],
    declarations: [HomePage],
    providers: [
        Geolocation,
        WeatherService,
        ProgressBarService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ProgressInterceptor,
            multi: true
        }
    ]
})
export class HomePageModule {
}
