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

  public async acceptChoice(choiceId: number, gameId: string): Promise<GameStatus> {
    console.debug(`Accepting choice ${choiceId}`);
    return await this.http.post<GameStatus>(`${this.apiPath}/play/${gameId}/accept/${choiceId}`, {}).toPromise();
  }

  public async rejectChoice(choiceId: number, gameId: string): Promise<GameStatus> {
    console.debug(`Rejecting choice ${choiceId}`);
    return await this.http.post<GameStatus>(`${this.apiPath}/play/${gameId}/reject/${choiceId}`, {}).toPromise();
  }

  public async getGameInfo(gameId: string): Promise<GameStatus> {
    return await this.http.get<GameStatus>(`${this.apiPath}/play/${gameId}`).toPromise();
  }
}
