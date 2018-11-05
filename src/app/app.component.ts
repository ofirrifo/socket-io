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
  terminalRoom1;
  terminalRoom2;

  private dashboardSocket = DashboardSocket.instance;
  private terminalSocket = TerminalSocket.instance;


  input$ = new Subject();
  input2$ = new Subject();
  input3$ = new Subject();

  constructor() {
    this.dashboardTest();
    this.terminalRoom1Test();
    this.terminalRoom2Test();
  }

  dashboardTest(): void {
    const roomName = 'dashboard-message';
    this.dashboardSocket.socket.on(roomName, (data) => {
      console.log('data: ', data);
      this.dashboard = data;
      console.log('dashboard: ', this.dashboard);
    });

    this.input$.subscribe((data) => {
      this.dashboardSocket.socket.emit(roomName, data);
    });
  }

  terminalRoom1Test(): void {
    const roomName = 'terminal-1-message';
    this.terminalSocket.socket.on(roomName, (data) => {
      console.log('data: ', data);
      this.terminalRoom1 = data;
      console.log('terminal: ', this.terminalRoom1);
    });

    this.input2$.subscribe((data) => {
      this.terminalSocket.socket.emit(roomName, data);
    });
  }

  terminalRoom2Test(): void {
    const roomName = 'terminal-2-message';
    this.terminalSocket.socket.on(roomName, (data) => {
      console.log('data: ', data);
      this.terminalRoom2 = data;
      console.log('terminal-2: ', this.terminalRoom1);
    });

    this.input3$.subscribe((data) => {
      this.terminalSocket.socket.emit(roomName, data);
    });
  }

}
