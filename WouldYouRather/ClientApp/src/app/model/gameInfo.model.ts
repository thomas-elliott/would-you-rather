import {Player} from './player.model';

export class GameStatus {
    noOfPlayers: number;
    remainingQuestions: number;
    hasWon: boolean;
    whoIsChoosing: Player;
}
