import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {Game} from '../model/game.model';
import {Player} from '../model/player.model';
import {AuthService} from './auth.service';
import {Choice} from '../model/choice.model';
import {GameInfo} from '../model/gameInfo.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiPath = `${environment.serverPath}`;

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  public submitAnswer(gameId: string, answer: string): Observable<any> {
    return this.http.post(`${this.apiPath}/${gameId}/submit`, answer);
  }

  public getPlayers(): Promise<Player[]> {
    return new Promise<Player[]> ((resolve, reject) => {
      this.authService.getGame().then((game: Game) => {
        this.http.get(`${this.apiPath}/game/${game.id}/player`).subscribe(
          (response: Player[]) => {
            resolve(response);
          }, (error) => {
            reject(error);
        });
      });
    });
  }

  public getChoice(gameId: string): Promise<Choice> {
    console.debug('Getting choice');
    return new Promise<Choice> (((resolve, reject) => {
      this.http.get(`${this.apiPath}/game/${gameId}/choice`).subscribe(
          (response: Choice) => {
            console.debug('Returned choice', response);
            resolve(response);
          },
          (error) => {
            console.debug('Error retrieving choice ', error);
            reject(error);
          }
      );
    }));
  }

  public acceptChoice(choice: Choice, gameId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post(`${this.apiPath}/game/${gameId}/choose`,
          choice).subscribe(
          () => {
            resolve();
          },
          (error) => {
            console.error('Error accepting choice ', error);
            reject(error);
          }
      );
    });
  }

  public rejectChoice(choice: Choice, gameId: string): Promise<Choice> {
    console.debug('Rejecting choice: ', choice);
    return new Promise<Choice>((resolve, reject) => {
      this.http.post(`${this.apiPath}/game/${gameId}/reject`,
        choice).subscribe(
        (response: Choice) => {
          resolve(response);
        },
        (error) => {
          console.error('Error rejecting choice ', error);
          reject(error);
        }
      );
    });
  }

  public getGameInfo(gameId: string): Promise<GameInfo> {
    return new Promise<GameInfo>((resolve) => {
      this.http.get(`${this.apiPath}/game/${gameId}/info`).subscribe(
        (response: GameInfo) => {
          resolve(response);
        },
        (error) => {
          console.error('Error getting game info ', error);
        }
      );
    });
  }
}
