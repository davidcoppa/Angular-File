import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(): Observable<HttpEvent<any>> {
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(1000))
            .pipe(dematerialize())
        

        function handleRoute() {
            const body={
                dbPath:'/yourRouteOnTheBackend/FileName'
            }
            return of(new HttpResponse({status:200,body }));
            
        }

  
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};