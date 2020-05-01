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

  goToSubmit() {
    this.nav.navigateForward('/tabs/play');
  }
}
