import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {HttpErrorResponse} from '@angular/common/http';
import {Game} from '../../model/game.model';

@Component({
  selector: 'app-load-game',
  templateUrl: './load-game.page.html',
  styleUrls: ['./load-game.page.scss'],
})
export class LoadGamePage implements OnInit {

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private nav: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.noAuth();
        return;
      }

      this.auth.setGameId(paramMap.get('id')).subscribe(
          (response: Game) => {
            this.goToSubmit(response);
          }, (error: HttpErrorResponse) => {
            console.error('Error from set ID', error);
            this.noAuth();
          }
      );
    });
  }

  goToSubmit(game: Game) {
      if (game.active) {
          this.nav.navigateForward('/enter-name');
      } else {
          this.nav.navigateForward('/tabs/submit');
      }
  }

  noAuth() {
    this.auth.getGame().then(
      (response: Game) => {
        this.goToSubmit(response);
      }
    ).catch(() => {
        this.nav.navigateForward('/no-game');
    });
  }

}
