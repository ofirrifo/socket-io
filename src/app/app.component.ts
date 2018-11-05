import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TerminalSocket } from './socket/terminal-socket';
import { DashboardSocket } from './socket/dashboard-socket';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data;
  data2;
  private dashboardSocket = DashboardSocket.instance;
  private terminalSocket = TerminalSocket.instance;


  input$ = new Subject();
  input2$ = new Subject();

  constructor() {
    this.terminal1();
    this.terminal2();
  }

  terminal1(): void {
    this.terminalSocket.socket.on('message', (data) => {
      this.data = data;
    });

    this.input$.subscribe((data) => {
      this.terminalSocket.socket.emit('message', JSON.stringify(data));
    });
  }

  terminal2(): void {
    this.dashboardSocket.socket.on('message', (data) => {
      this.data2 = data;
    });

    this.input2$.subscribe((data) => {
      this.dashboardSocket.socket.emit('message', JSON.stringify(data));
    });
  }

}
