import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Game} from '../../model/game.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  game: Game;

  constructor(private auth : AuthService) {}

  ngOnInit() {
    this.auth.getGame().then((game: Game) => {
      this.game = game;
    }).catch((error) => {
      console.error('Error getting game:', error);
    });
  }

  isAllowingEntries(): boolean {
    if (!this.game) return false;
    return this.game.isAcceptingSubmissions;
  }

  getSubmitLink(): string {
    if (this.game) {
      return `${window.location.origin}/#/submit/${this.game.id}`;
    } else {
      return 'Waiting...';
    }
  }

  startGame(): void {
    // TODO
  }
}
