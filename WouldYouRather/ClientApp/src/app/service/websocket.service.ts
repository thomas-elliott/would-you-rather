import { Injectable } from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  newChoiceSubject = new Subject<void>();

  constructor(private rxStompService: RxStompService) {
    console.log('Websocket watch');
    // this.watchTopic();
  }

  private watchTopic() {
      this.rxStompService.watch('/topic/game').subscribe(
          (message) => {
              console.debug('WS message: ', message.body);
              this.newChoiceSubject.next();
          }
      );
  }
}
