import { Component, OnInit } from '@angular/core';
import {GameStatus} from "../../model/gameStatus.model";
import {Game} from "../../model/game.model";
import {AuthService} from "../../service/auth.service";
import {GameService} from "../../service/game.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-winner',
  templateUrl: './winner.page.html',
  styleUrls: ['./winner.page.scss'],
})
export class WinnerPage implements OnInit {
  game: Game;
  gameStatus: GameStatus;
  ready = false;

  constructor(private authService: AuthService,
              private gameService: GameService,
              private nav: NavController) { }

  ngOnInit(): void {
    this.authService.getGame().then(
      (game: Game) => {
        this.game = game;
        if (game && game.isPlaying) {
          this.getGameInfo();
        }
      }
    ).catch((error) => {
      console.error('Play: error getting game auth', error);
    });
  }

  getGameInfo(): void {
    this.gameService.getGameInfo(this.game.id).then(
      (info: GameStatus) => {
        if (info == null) {
          this.nav.navigateBack(['/load-game'], { queryParams: { error: 'gameNotStarted'} });
        }
        this.ready = true;
        this.gameStatus = info;
      }
    ).catch((e) => {
      console.error(`Couldn't load game: ${e.status}`);
      this.nav.navigateBack(['/load-game'], { queryParams: { error: 'gameNotFound'} });
    });
  }
}
