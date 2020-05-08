import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../model/player.model';
import {Subscription} from 'rxjs';
import {GameService} from '../../service/game.service';
import {Game} from '../../model/game.model';
import {AuthService} from '../../service/auth.service';
import {GameStatus} from '../../model/gameStatus.model';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit, OnDestroy {
  // stateSubscription: Subscription;
  game: Game;
  gameStatus: GameStatus;
  ready = false;

  choosingPlayer: Player;

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
      this.ready = true;
    });

/*    this.stateSubscription = this.wsService.newChoiceSubject.subscribe(() => {
      console.log('New choice subject');
      this.getCurrentChoice();
      this.getGameInfo();
      this.ready = true;
    });*/
  }

  ngOnDestroy(): void {
    // this.stateSubscription.unsubscribe();
  }

  getGameInfo(): void {
    this.gameService.getGameInfo(this.game.id).then(
        (info: GameStatus) => {
          console.debug('Game info', info);
          if (info == null) {
            this.nav.navigateBack(['/load-game'], { queryParams: { error: 'gameNotStarted'} });
          }
          this.gameStatus = info;
        }
    ).catch((e) => {
      console.error(`Couldn't load game: ${e.status}`);
      this.nav.navigateBack(['/load-game'], { queryParams: { error: 'gameNotFound'} });
    });
  }

  amIPlaying(): boolean {
    return false;
  }

  isChoice(isA: boolean): boolean {
    return true;
  }

  acceptChoice(isA: boolean) {
    console.log('accept choice');
/*    this.ready = false;
    const choice = this.choice;
    choice.choiceIsA = isA;
    this.gameService.acceptChoice(choice, this.game.id).then(
        () => {
          console.debug('Accepted choice.');
        }
    ).catch((error) => {
      console.error('Error accepting choice: ', error);
    });*/
  }

  rejectChoice(isA: boolean) {
    console.log('reject choice');
/*    this.ready = false;
    console.debug('Rejecting choice A: ', isA);
    const choice = this.choice;
    choice.choiceIsA = isA;
    this.gameService.rejectChoice(choice, this.game.id).then(
        (response: Choice) => {
          console.debug('Rejected choice. New response: ', response);
          this.choice = response;
          this.ready = true;
        }
    ).catch((error) => {
      console.error('Error rejecting choice: ', error);
    });*/
  }

  allowReject(): boolean {
    return this.gameStatus && this.gameStatus.canReject;
  }
}
