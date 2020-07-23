import {ICity} from "./ICity";

export interface ICitySearchResponse {
    cod: string
    count: number
    list: ICity[]
    message: string
}