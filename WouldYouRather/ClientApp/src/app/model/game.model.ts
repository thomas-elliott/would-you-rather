import {GameConfig} from './gameConfig.model';

export class Game {
    id: string;
    isPlaying: boolean;
    isLobbyOpen: boolean;
    isAcceptingSubmissions: boolean;
    gameConfig: GameConfig;
}
