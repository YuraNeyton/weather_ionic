import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'temperatureType'})
export class TemperaturePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        const [utils] = args;
        const type = utils === 'metric' ? '°C' : '°F'
        return `${value} ${type}`
    }
}