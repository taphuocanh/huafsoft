import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { IUser } from '@app/_models';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    private users: IUser[] = [{
        id: 1,
        email: 'admin@taphuocanh.com',
        username: 'admin',
        password: '123456'
    }];

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let that = this;
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith(`${environment.apiUrl}/add-new`) && method === 'POST':
                    return addNewUser();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions
        function addNewUser() {
            const { username, email, password } = body;
            let user_existed = that.users.find(u => u.username == username || u.email == email)
            if (!user_existed) {
                that.users.push({
                    id: that.users.length as number,
                    username,
                    password,
                    email
                });
                return ok(that.users.at(-1))
            } else {
                return error('Ng?????i d??ng ???? t???n t???i')
            }
        }
        function authenticate() {
            const { email, password } = body;
            const user = that.users.find(x => x.email === email && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                email: user.email,
                token: 'fake-jwt-token'
            })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(that.users);
        }

        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } }));
        }

        function unauthorized() {
            return throwError(() => ({ status: 401, error: { message: 'Unauthorised' } }));
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}
