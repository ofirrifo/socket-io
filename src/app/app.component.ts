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
  dashboard;
  terminal;

  private dashboardSocket = DashboardSocket.instance;
  private terminalSocket = TerminalSocket.instance;


  input$ = new Subject();
  input2$ = new Subject();

  constructor() {
    this.dashboardTest();
    this.terminalTest();
  }

  dashboardTest(): void {
    this.terminalSocket.socket.on('message', (data) => {
      console.log('data: ', data);
      this.dashboard = data;
      console.log('dashboard: ', this.dashboard);
    });

    this.input$.subscribe((data) => {
      this.terminalSocket.socket.emit('message', data);
    });
  }

  terminalTest(): void {
    this.dashboardSocket.socket.on('message', (data) => {
      console.log('data: ', data);
      this.terminal = data;
      console.log('terminal: ', this.terminal);
    });

    this.input2$.subscribe((data) => {
      this.dashboardSocket.socket.emit('message', data);
    });
  }

}
