import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Game} from '../model/game.model';

import {Player} from '../model/player.model';
import {Auth} from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private game: Game;
  private player: Player;
  private secretKey: string;
  public isAdmin = true;

  private apiPath = `${environment.serverPath}`;

  constructor(private http: HttpClient) { }

  public ngOnInit(): void {
  }

  public hasGame(): boolean {
      return !!(this.game && this.game.id);
  }

  public hasAuth(): boolean {
      if (this.player == null || this.secretKey) {
          return false;
      }
      return !!this.player.id;
  }

  public async getGame(): Promise<Game> {
    if (this.game) {
      console.debug(`Returned game ${this.game.id} from memory`);
      return this.game;
    }

    if (this.getGameIdFromStore()) {
      const response = await this.setGameId(this.getGameIdFromStore());
      console.debug(`Returned game ${response.id} from local storage`);
      return response;
    }

    console.debug(`Could not retrieve game`);
    throw new Error();
  }

  public async getPlayer(): Promise<Player> {
    // Make sure we have the game
    await this.getGame();

    if (this.hasAuth()) {
      console.debug('Returning player from memory');
    } else {
      if (this.getPlayerFromStore()) {
        console.debug('Returning player from store');
      } else {
        console.debug('Could not retrieve player locally');
        throw new Error();
      }
    }

    console.debug('Checking player against server', this.player);
    await this.checkPlayer(this.player.id);

    return this.player;
  }

  public async checkPlayer(playerId: string) {
    try {
      return await this.http.get(`${this.apiPath}/players/${playerId}`).toPromise();
    } catch (e) {
      console.log('Error while checking player against server', e);
      throw new Error(e);
    }
  }

  public async registerPlayer(playerName: string) {
    try {
      const player = await this.http.post<Auth>(`${this.apiPath}/players`, new Player(playerName)).toPromise();
      this.player = new Player(player.name, player.id);

      this.secretKey = player.authKey;
      this.isAdmin = player.admin;
      this.savePlayerToStore();
      return this.player;
    } catch {
      throw new Error();
    }
  }

  public async joinGame(gameId: string) {
    try {
      const player = await this.http.post<Player>(`${this.apiPath}/play/${gameId}`, {}).toPromise();

      return player;
    } catch {
      throw new Error();
    }
  }

  public async checkGame(id: string) {
    const game = this.http.get<Game>(`${this.apiPath}/games/${id}`).toPromise();
    console.debug('Checking game', game);
    return game;
  }

  public async setGameId(id: string) {
    try {
      this.game = await this.http.get<Game>(`${this.apiPath}/games/${id}`).toPromise();
      this.saveGameIdToStore();
      return this.game;
    } catch (e) {
      console.debug('Returning error from http get', e.status);
      throw new Error();
    }
  }

  public getAuthKey(): string {
    if (!this.game) {
        return '';
    }

    if (!this.hasAuth()) {
        this.getPlayerFromStore();
    }

    if (!this.secretKey) {
        return '';
    }
    return this.secretKey;
  }

  public getPlayerId(): string {
    if (!this.game) {
        return '';
    }

    if (!this.hasAuth()) {
        this.getPlayerFromStore();
    }

    if (!this.player) {
        return '';
    }
    return this.player.id;
  }

  private getGameIdFromStore(): string {
    return localStorage.getItem('gameId');
  }

  private saveGameIdToStore(): void {
    if (this.game) {
      localStorage.setItem('gameId', this.game.id);
    }
  }

  private getPlayerFromStore(): Player {
      this.player = JSON.parse(localStorage.getItem(`player`));
      this.secretKey = localStorage.getItem(`auth_key`);
      return this.player;
  }

  private savePlayerToStore(): void {
    if (this.player && this.game) {
      localStorage.setItem(`player`, JSON.stringify(this.player));
      localStorage.setItem(`auth_key`, this.secretKey);
    } else {
      console.warn('Could not save player to store', this.player, this.game);
    }
  }

  clearPlayerData() {
    localStorage.removeItem(`player`);
    localStorage.removeItem(`auth_key`);
  }

  clearAllData() {
    localStorage.clear();
  }
}
