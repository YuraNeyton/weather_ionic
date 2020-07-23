import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProgressBarService} from "../services";

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {


    constructor(
        private progressBarService: ProgressBarService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.progressBarService.setIsLoading(true);

        return next.handle(req)
            .pipe(source => {
                this.progressBarService.setIsLoading(false)
                return source
            });

    }

}