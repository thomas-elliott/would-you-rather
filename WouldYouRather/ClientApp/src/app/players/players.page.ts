import { Component, OnInit } from '@angular/core';
import { Player } from '../model/player.model';
import {GameService} from '../service/game.service';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  players: Player[];

  constructor(private gameService: GameService,
              private authService: AuthService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.fetchPlayers();
  }

  fetchPlayers() {
    this.gameService.getPlayers().then(
        (response) => {
          console.debug('Retrieved players list: ', response);
          this.players = response;
        },
        (error) => {
          console.error('Error getting players on Players page: ', error);
        }
    );
  }

  clearPlayerData() {
    this.authService.clearPlayerData();
  }

  clearAllData() {
      this.authService.clearAllData();
  }
}
