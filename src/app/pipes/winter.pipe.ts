import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'winterType'})
export class WinterPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        const [utils] = args;
        const type = utils === 'metric' ? 'WNW' : 'mph NW'
        return `${value} ${type}`
    }

}