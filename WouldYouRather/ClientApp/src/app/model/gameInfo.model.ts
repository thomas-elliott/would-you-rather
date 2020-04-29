import {Player} from './player.model';

export class GameInfo {
    noOfPlayers: number;
    remainingQuestions: number;
    hasWon: boolean;
    whoIsChoosing: Player;
}
