import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Game} from '../model/game.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  private game: Game;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getGame().then(
      (response) => {
        this.game = response;
    });
  }

  showPlayers(): boolean {
    return this.game && this.game.isActive;
  }

  showPlay(): boolean {
    return this.game && this.game.isActive;
  }

  showSubmit(): boolean {
    return this.game && !this.game.isActive;
  }

  showSettings(): boolean {
    return false;
  }
}
