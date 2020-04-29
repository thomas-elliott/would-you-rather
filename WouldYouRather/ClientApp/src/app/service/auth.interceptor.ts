import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authKey = this.authService.getAuthKey();
    const playerId = this.authService.getPlayerId();
    console.debug(`Interceptor AuthKey: ${authKey} PlayerId: ${playerId}`);

    req = req.clone({
      headers: req.headers.append(
      'x-auth-key', authKey)
      .append('x-player-id', playerId)
    });

    return next.handle(req);
  }
}
