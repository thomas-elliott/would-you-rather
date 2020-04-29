import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../model/player.model';
import {Subscription} from 'rxjs';
import {GameService} from '../../service/game.service';
import {Game} from '../../model/game.model';
import {AuthService} from '../../service/auth.service';
import {Choice} from '../../model/choice.model';
import {WebsocketService} from '../../service/websocket.service';
import {GameInfo} from '../../model/gameInfo.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit, OnDestroy {
  stateSubscription: Subscription;
  game: Game;
  gameInfo: GameInfo;
  choice: Choice;
  ready = false;

  choosingPlayer: Player;

  constructor(private authService: AuthService,
              private gameService: GameService,
              private wsService: WebsocketService) { }

  ngOnInit(): void {
    this.authService.getGame().then(
      (game) => {
        this.game = game;
        this.getCurrentChoice();
        this.getGameInfo();
      }
    ).catch((error) => {
      console.error('Play: error getting game auth', error);
      this.ready = true;
    });

    this.stateSubscription = this.wsService.newChoiceSubject.subscribe(() => {
      console.log('New choice subject');
      this.getCurrentChoice();
      this.getGameInfo();
      this.ready = true;
    });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  getGameInfo() {
    this.gameService.getGameInfo(this.game.id).then(
        (info: GameInfo) => {
          this.gameInfo = info;
        }
    );
  }

  getCurrentChoice() {
    this.gameService.getChoice(this.game.id).then(
      (choice) => {
        this.choice = choice;
        if (choice) {
          this.choosingPlayer = this.choice.choosingPlayer;
        }
        this.ready = true;
      }
    ).catch((error) => {
      console.error('Play: error getting current choice', error);
      this.ready = true;
    });
  }

  amIPlaying(): boolean {
    if (!this.choice) {
      return false;
    }
    return this.choice.currentChoice;
  }

  isChoice(isA: boolean): boolean {
    if (!this.choice) {
      return false;
    }

    if (isA && this.choice.choiceIsA === true) {
      return true;
    }

    if (!isA && this.choice.choiceIsA === false) {
      return true;
    }

    return false;
  }

  acceptChoice(isA: boolean) {
    this.ready = false;
    const choice = this.choice;
    choice.choiceIsA = isA;
    this.gameService.acceptChoice(choice, this.game.id).then(
        () => {
          console.debug('Accepted choice.');
        }
    ).catch((error) => {
      console.error('Error accepting choice: ', error);
    });
  }

  rejectChoice(isA: boolean) {
    this.ready = false;
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
    });
  }

  allowReject(): boolean {
    return this.gameInfo && this.gameInfo.remainingQuestions > (3 + this.gameInfo.noOfPlayers);
  }
}
