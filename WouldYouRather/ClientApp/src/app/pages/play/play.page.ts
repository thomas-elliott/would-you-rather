import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {GameService} from '../../service/game.service';
import {Game} from '../../model/game.model';
import {AuthService} from '../../service/auth.service';
import {GameStatus} from '../../model/gameStatus.model';
import {NavController} from '@ionic/angular';

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
  private polling: Subscription;

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

  ionViewWillEnter() {
    const observable = interval(1000);
    this.polling = observable.subscribe(() => {
      return this.getGameInfo();
    });
  }

  ionViewWillLeave() {
    this.polling.unsubscribe();
  }

  ngOnDestroy(): void {
    // this.stateSubscription.unsubscribe();
    this.polling.unsubscribe();
  }

  getGameInfo(): void {
    this.gameService.getGameInfo(this.game.id).then(
        (info: GameStatus) => {
          // console.debug('Game info', info);
          if (info == null) {
            this.nav.navigateBack(['/load-game'], { queryParams: { error: 'gameNotStarted'} });
          }
          this.gameStatus = info;
          this.ready = true;
        }
    ).catch((e) => {
      console.error(`Couldn't load game: ${e.status}`);
      this.nav.navigateBack(['/load-game'], { queryParams: { error: 'gameNotFound'} });
    });
  }

  isReady(): boolean {
    return this.ready && this.gameStatus && !!this.gameStatus.choiceA && !!this.gameStatus.choiceB;
  }

  amIPlaying(): boolean {
    return this.gameStatus && this.gameStatus.isCurrentChoice;
  }

  isChoice(isA: boolean): boolean {
    if (this.gameStatus.isCurrentChoice) {
      return false;
    }

    if (isA) {
      return !(this.gameStatus.choiceA.isEliminated);
    } else {
      return !(this.gameStatus.choiceB.isEliminated);
    }
  }

  acceptChoice(answerId: number) {
    console.log(`accept choice ${answerId}`);
    this.ready = false;

    this.gameService.acceptChoice(answerId, this.game.id).then(
      (response: GameStatus) => {
        console.debug('Accepted choice.');
        this.gameStatus = response;
        this.ready = true;
      }
    ).catch((error) => {
      console.error('Error accepting choice: ', error);
    });
  }

  rejectChoice(answerId: number) {
    console.log(`reject choice ${answerId}`);
    this.ready = false;

    this.gameService.rejectChoice(answerId, this.game.id).then(
      (response: GameStatus) => {
        console.debug('Rejected choice.');
        this.gameStatus = response;
        this.ready = true;
      }
    ).catch((error) => {
      console.error('Error accepting choice: ', error);
    });
  }

  allowReject(): boolean {
    return !!this.gameStatus && this.gameStatus.remainingQuestions > 8;
  }
}
