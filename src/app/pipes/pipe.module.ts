import {NgModule} from "@angular/core";
import {CustomDatePipe} from "./customDate.pipe";
import {TemperaturePipe} from "./temperature.pipe";
import {WinterPipe} from "./winter.pipe";

@NgModule({
    declarations: [
        CustomDatePipe,
        TemperaturePipe,
        WinterPipe
    ],
    exports: [
        TemperaturePipe,
        CustomDatePipe,
        WinterPipe
    ]
})
export class PipeModule {

}