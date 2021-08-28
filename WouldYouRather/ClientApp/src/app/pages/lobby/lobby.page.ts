import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../model/game.model';
import {AuthService} from '../../service/auth.service';
import {GameService} from '../../service/game.service';
import {NavController} from '@ionic/angular';
import {Player} from '../../model/player.model';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit, OnDestroy {
  game: Game;
  player: Player;
  players: Player[];
  ready = false;
  polling: Subscription;

  constructor(private authService: AuthService,
              private gameService: GameService,
              private nav: NavController) { }

  ngOnInit(): void {
    this.authService.getPlayer().then(
      (player: Player) => {
        this.player = player;
        console.log('Lobby loaded, player is ', this.player);
      }
    );

    this.authService.getGame().then(
      (game: Game) => {
        this.game = game;
    });
  }

  ionViewWillEnter() {
    const observable = interval(3000);
    this.polling = observable.subscribe(() => {
      return this.refreshData();
    });
  }

  ionViewWillLeave() {
    this.polling.unsubscribe();
  }

  ngOnDestroy(): void {
    this.polling.unsubscribe();
  }

  async refreshData() {
    this.fetchGame();
    this.fetchPlayers();
    return;
  }

  fetchGame() {
    this.authService.checkGame(this.game.id).then(
      (game: Game) => {
        if (game && game.isPlaying) {
          this.nav.navigateForward('/tabs/play');
        }
      }
    ).catch((error) => {
      console.error('Play: error getting game', error);
      this.ready = true;
    });
  }

  fetchPlayers() {
    this.gameService.getPlayers().then(
      (response: Player[]) => {
        this.players = response;
      },
      (error) => {
        console.error('Error getting players on Players page: ', error);
      }
    );
  }

  getPlayerName(): string {
    if (this.player) {
      return this.player.name;
    } else {
      return 'null';
    }
  }
}
