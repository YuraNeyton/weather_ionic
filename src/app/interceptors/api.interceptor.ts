import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {config} from "../configs";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const updatedReq = req.clone({
            setParams: {
                appid: config.API_KEY,
                lang: config.LANGUAGE_CODE
            }
        });

        return next.handle(updatedReq);
    }

}