import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SocketUtils } from './socket-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data;
  private socketUtils = SocketUtils.instance;

  input$ = new Subject();

  constructor() {

    this.socketUtils.socket.on('message', (data) => {
      this.data = data;
    });

    this.input$.subscribe((data) => {
      this.socketUtils.socket.emit('message', JSON.stringify(data));
    });

  }


}
