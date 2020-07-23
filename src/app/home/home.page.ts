import {Component, OnInit} from '@angular/core';
import {ProgressBarService, WeatherService} from "../services";
import {Geolocation, Geoposition} from "@ionic-native/geolocation/ngx";
import {ICitySearchResponse, IWeatherDataResponse, IWeatherResponse} from "../models";
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    weatherResponse: IWeatherResponse;
    weatherDataResponse: IWeatherDataResponse;
    citySearchResponse: ICitySearchResponse

    query: any = {
        units: 'metric'
    };

    lineChartData: ChartDataSets[] = [
        {
            data: [],
            label: 'Погодинний прогноз',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#ffffff',
            borderColor: '#ffffff',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#ffffff',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        },
    ];
    lineChartLabels: Label[];
    lineChartOptions: any = {
        responsive: true,
    };
    lineChartColors: Color[] = [
        {
            borderColor: '#ffffff',
            backgroundColor: '#ffffff',
        },
    ];
    lineChartLegend = true;
    lineChartType = 'line';
    lineChartPlugins = [{
        id: 'textPlugin',
        beforeDraw(chart: any): any {
            const width = chart.chart.width;
            const height = chart.chart.height;
            const ctx = chart.chart.ctx;
            ctx.restore();
            const fontSize = (height / 114).toFixed(2);
            ctx.font = `${fontSize}em sans-serif`;
            ctx.textBaseline = 'middle';
            const text = '';
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }];


    segments = [
        {units: 'metric', title: 'Metric: °C, m/s'},
        {units: 'imperial', title: 'Imperial: °F, mph'}
    ]

    constructor(
        private geolocation: Geolocation,
        private weatherService: WeatherService,
        public progressBarService: ProgressBarService
    ) {
    }

    ngOnInit(): void {
        this.getLocation().then(({coords: {longitude, latitude}}) => {

            this.query.lon = longitude
            this.query.lat = latitude

            this.getWeather()
            this.getData()
        })
    }

    getLocation(): Promise<Geoposition> {
        return this.geolocation.getCurrentPosition()
    }

    getWeather(): void {
        this.weatherService.getWeather(this.query).subscribe(res => this.weatherResponse = res)
    }

    getData(): void {
        this.weatherService.getData(this.query).subscribe(res => {

            this.weatherDataResponse = res

            this.wrapCanvas()
        })
    }

    doRefresh(event: any): void {
        this.weatherService.getWeather(this.query).subscribe(res => {
            this.weatherResponse = res

            this.getData();

            event.target.complete();
        })
    }

    onCitySearch({detail: {value: name}}: any): void {
        name.length > 3 && this.weatherService.findCities(name)
            .subscribe(res => this.citySearchResponse = res)
    }

    onClear() {
        this.getWeather()
        this.getData()
        this.clearCitiesList();
    }

    onClick(coords: { lat: number, lon: number }) {
        this.query.lat = coords.lat
        this.query.lon = coords.lon

        this.getWeather();
        this.getData();
        this.clearCitiesList();
    }

    clearCitiesList(): void {
        this.citySearchResponse = null;
    }

    segmentChanged({detail: {value: units}}: any) {
        this.query.units = units;
        this.getWeather();
        this.getData();

    }

    wrapCanvas() {
        this.lineChartData[0].data = this.weatherDataResponse.hourly
            .map(data => data.temp);

        this.lineChartLabels = this.weatherDataResponse.hourly
            .map(data => data.weather[0].description)
    }
}
