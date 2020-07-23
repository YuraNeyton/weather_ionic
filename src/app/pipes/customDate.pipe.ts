import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'customDate'})
export class CustomDatePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        const timestamp = value * 1000
        return new Date(timestamp)
    }
}