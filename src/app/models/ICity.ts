export interface ICity {
    coord: {
        lat: number
        lon: number
    }
    name: string
    sys: {
        country: string
    }
    weather: [{
        icon: string
        main: string
        description
    }]
    main: {
        temp: number
        feels_like: number
    }
}