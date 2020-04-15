import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(error => {
        if (error instanceof HttpErrorResponse) {

          if (error.status === 403 || error.status === 401) {
            return throwError('Brak uprawnień');
          } else {

            const errorMessage = error.error.message;
            const serverError = error.error.errors;
            let errors = '';

            if (serverError && typeof serverError === 'object') {
              for (const key in serverError) {
                if (serverError.hasOwnProperty(key)) {
                  errors = serverError[key] + '\n';
                }
              }
            }
            return throwError(errors || serverError || errorMessage || 'Wystąpił nieoczekiwany błąd serwera');
          }
        }
      })
      )
  }
}
