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
  data2;
  private socketUtils = SocketUtils.instance;

  input$ = new Subject();
  input2$ = new Subject();

  constructor() {

    this.socketUtils.socketTerminal.on('message', (data) => {
      this.data = data;
    });

    this.input$.subscribe((data) => {
      this.socketUtils.socketTerminal.emit('message', JSON.stringify(data));
    });

    // **********************************************************************************

    this.socketUtils.socketTerminal2.on('message', (data) => {
      this.data2 = data;
    });

    this.input2$.subscribe((data) => {
      this.socketUtils.socketTerminal2.emit('message', JSON.stringify(data));
    });

  }


}
