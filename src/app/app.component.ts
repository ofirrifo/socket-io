import { Component } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data;
  private socket;

  input$ = new Subject();

  constructor() {
    const wsUrl = '';
    this.socket = socketIo(wsUrl);

    this.socket.on('message', (data) => {
      this.data = data;
    });

    this.input$.subscribe((data) => {
      this.socket.emit('message', JSON.stringify(data));
    });

  }


}
