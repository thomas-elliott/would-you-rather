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
  loading = true;
  code: string;
  game: Game;

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private nav: NavController,
              private toast: ToastController) { }

  ngOnInit() {
    this.loading = true;
    this.route.queryParams.subscribe(paramMap => {
      if (paramMap.error) {
        this.showError(paramMap.error);
      }
    });

    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.checkGameId(paramMap.get('id'));
      } else {
        this.checkLoadedGame().catch(
          () => {});
        this.loading = false;
      }
    });
  }

  submitCode(code: string): void {
    if (code && code.length === 6) {
      this.loading = true;
      this.checkGameId(code);
    }
  }

  goToSubmit(game: Game): void {
    if (game.isLobbyOpen || game.isPlaying) {
      this.nav.navigateForward('/enter-name');
    } else {
      this.nav.navigateForward('/tabs/submit');
    }
  }

  private checkGameId(gameId: string): void {
    console.debug('Checking game id');
    this.auth.setGameId(gameId).then(
      (response: Game) => {
        this.goToSubmit(response);
      }
    ).catch(() => {
      this.noAuth();
    });
  }

  private async checkLoadedGame(): Promise<Game> {
    try {
      const response = await this.auth.getGame();
      this.game = response;
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  private noAuth(): void {
    console.debug('no auth');
    this.checkLoadedGame().then(
      (response: Game) => {
        this.goToSubmit(response);
      }
    ).catch(() => {
      this.showError('gamenotfound');
    });
  }

  private async showError(errorType: string): Promise<void> {
    this.loading = false;
    this.code = '';
    const toast = await this.toast.create({
      header: 'Game not found',
      message: 'Either the code was wrong or the game no longer exists',
      position: 'top',
      color: 'danger',
      duration: 4000
    });
    await toast.present();
  }
}
