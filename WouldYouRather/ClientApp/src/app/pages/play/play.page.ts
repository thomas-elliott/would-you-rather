import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../model/player.model';
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
    const observable = interval(3000);
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
          console.debug('Game info', info);
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
      return !(this.gameStatus.choiceA.eliminated);
    } else {
      return !(this.gameStatus.choiceB.eliminated);
    }
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
