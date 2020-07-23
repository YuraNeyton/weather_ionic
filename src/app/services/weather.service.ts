import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {config} from '../configs'
import {Observable} from "rxjs";
import {
    IWeatherResponse,
    ICitySearchResponse,
    IWeatherDataResponse
} from '../models'

@Injectable()
export class WeatherService {

    private readonly url_oneCall: string
    private readonly url_find: string
    private readonly url_weather: string

    constructor(
        private http: HttpClient
    ) {
        this.url_oneCall = config.API_URL + '/onecall'
        this.url_find = config.API_URL + '/find'
        this.url_weather = config.API_URL + '/weather'
    }

    getData(query?: any): Observable<IWeatherDataResponse> {
        return this.http.get<IWeatherDataResponse>(this.url_oneCall, {
            params: new HttpParams({
                fromObject: query
            })
        })
    }

    getWeather(query?: any): Observable<IWeatherResponse> {
        return this.http.get<IWeatherResponse>(this.url_weather, {
            params: new HttpParams({
                fromObject: query
            })
        })
    }

    findCities(name: string): Observable<ICitySearchResponse> {
        return this.http.get<ICitySearchResponse>(this.url_find, {
            params: new HttpParams({
                fromObject: {
                    q: name
                }
            })
        })
    }
}