import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute} from '@angular/router';
import {NavController, ToastController} from '@ionic/angular';
import {Game} from '../../model/game.model';

@Component({
  selector: 'app-load-game',
  templateUrl: './load-game.page.html',
  styleUrls: ['./load-game.page.scss'],
})
export class LoadGamePage implements OnInit {

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private nav: NavController,
              private toast: ToastController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.noAuth();
        return;
      }

      this.auth.setGameId(paramMap.get('id')).then(
          (response: Game) => {
            this.goToSubmit(response);
          }
      ).catch(() => {
          this.noAuth();
      });
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
    ).catch(async () => {
        const toast = await this.toast.create({
          header: 'Game not found',
          message: 'Either the code was wrong or the game no longer exists',
          position: 'top',
          color: 'danger',
          duration: 4000
        });
        toast.present().then(() => {
          this.nav.navigateForward('/');
        });
    });
  }

}
