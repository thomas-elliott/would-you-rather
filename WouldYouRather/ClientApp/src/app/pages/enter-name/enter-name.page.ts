import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {NavController} from '@ionic/angular';
import {Player} from '../../model/player.model';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.page.html',
  styleUrls: ['./enter-name.page.scss'],
})
export class EnterNamePage implements OnInit {
  name: string;
  ready = false;
  loading = false;

  constructor(private authService: AuthService,
              private nav: NavController) { }

  ngOnInit() {
    if (!this.authService.hasGame()) {
      this.nav.navigateBack('/');
    }

    this.authService.getPlayer().then((player: Player) => {
      if (player && player.id) {
        this.goToSubmit();
      } else {
        this.ready = true;
      }
    }).catch( () => {
      this.ready = true;
    });
  }

  disableSubmit() {
    return (!this.name);
  }

  submit() {
    this.loading = true;
    this.authService.registerPlayer(this.name).then(() => {
      this.goToSubmit();
    }).catch(() => {
      this.loading = false;
      console.log('Error returned from register player');
      alert('Error submitting');
    });
  }

  async goToSubmit() {
    const game = await this.authService.getGame();

    try {
      await this.authService.joinGame(game.id);
    } catch (e) {
      console.error('Join error', e);
    }

    if (game.isPlaying) {
      await this.nav.navigateForward('/tabs/play');
    } else {
      await this.nav.navigateForward('/tabs/lobby');
    }
  }
}
