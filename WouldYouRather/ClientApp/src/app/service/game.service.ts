import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {Player} from '../model/player.model';
import {AuthService} from './auth.service';
import {GameStatus} from '../model/gameStatus.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiPath = `${environment.serverPath}`;

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  public submitAnswer(gameId: string, answer: string): Observable<any> {
    return this.http.post(`${this.apiPath}/games/${gameId}/answers`,
      { answer },
      {
      headers: { 'content-type': 'application/json' }
    });
  }

  public async getPlayers(): Promise<Player[]> {
    const game = await this.authService.getGame();

    return this.http.get<Player[]>(`${this.apiPath}/play/${game.id}/players`).toPromise();
  }

  public getChoice(gameId: string) {
    console.debug('Getting choice');
/*    return new Promise<Choice> (((resolve, reject) => {
      this.http.get(`${this.apiPath}/games/${gameId}/choice`).subscribe(
          (response: Choice) => {
            console.debug('Returned choice', response);
            resolve(response);
          },
          (error) => {
            console.debug('Error retrieving choice ', error);
            reject(error);
          }
      );
    }));*/
  }

  public acceptChoice(choiceId: string, gameId: string) {
/*    return new Promise<void>((resolve, reject) => {
      this.http.post(`${this.apiPath}/games/${gameId}/choose`,
          choice).subscribe(
          () => {
            resolve();
          },
          (error) => {
            console.error('Error accepting choice ', error);
            reject(error);
          }
      );
    });*/
  }

  public rejectChoice(choice: string, gameId: string) {
    console.debug('Rejecting choice: ', choice);
/*    return new Promise<Choice>((resolve, reject) => {
      this.http.post(`${this.apiPath}/games/${gameId}/reject`,
        choice).subscribe(
        (response: Choice) => {
          resolve(response);
        },
        (error) => {
          console.error('Error rejecting choice ', error);
          reject(error);
        }
      );
    });*/
  }

  public async getGameInfo(gameId: string): Promise<GameStatus> {
    return await this.http.get<GameStatus>(`${this.apiPath}/play/${gameId}`).toPromise();
  }
}
