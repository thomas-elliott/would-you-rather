import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {NavController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService,
              public nav: NavController) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(((resolve, reject) => {
      if (this.auth.hasGame()) {
        console.debug('Auth guard: has game');
        resolve(true);
      } else {
        console.debug('Auth guard: game not loaded, load from memory');
        this.auth.getGame().then((game) => {
          if (game && game.id) {
            console.debug('Auth guard: game loaded from memory');
            resolve(true);
          } else {
            console.debug('Auth guard: game loaded but no id');
            reject (false);
          }
        }).catch(() => {
          console.debug('Auth guard: no game in memory');
          this.nav.navigateRoot('/no-game');
          reject(false);
        });
      }
    }));
  }
}
