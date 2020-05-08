import {Player} from './player.model';
import {Answer} from './answer.model';

export class GameStatus {
  id: number;
  choiceA: Answer;
  choiceB: Answer;
  choosingPlayer: Player;
  remainingQuestions: number;
  isCurrentChoice: boolean;
  canReject: boolean;
}
