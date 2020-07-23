export interface IWeatherResponse {
    base: string
    clouds: { all: number }
    cod: number
    coord: {
        lon: number
        lar: number
    }
    dt: number
    main: {
        temp: number
        feels_like: number
        pressure: number
        humidity: number
    }
    name: string
    sys: any
    timezone: number
    visibility: number
    weather: [{
        description: string
        icon: string
    }]
    wind: {
        speed: number
        deg: number
    }
}