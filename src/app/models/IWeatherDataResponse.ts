export interface IWeatherDataResponse {
    daily: [{
        dt: number,
        temp: {
            min: number,
            max: number
        },
        weather: any[]
    }]
    hourly: any[]
}