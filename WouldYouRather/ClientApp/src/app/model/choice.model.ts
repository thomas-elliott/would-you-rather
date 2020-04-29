import {Answer} from './answer.model';
import {Player} from './player.model';

export class Choice {
    choiceA: Answer;
    choiceB: Answer;
    choiceIsA: boolean;
    currentChoice: boolean;
    choosingPlayer: Player;
}
