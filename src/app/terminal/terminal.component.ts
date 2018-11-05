import { Component, OnInit, ViewChild } from '@angular/core';
import { Terminal } from 'xterm';
import { TerminalSocket } from '../socket/terminal-socket';
import * as fit from 'xterm/lib/addons/fit/fit';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  @ViewChild('terminal') terminalElement;
  private terminalSocket = TerminalSocket.instance;


  constructor() {
  }

  ngOnInit() {

    Terminal.applyAddon(fit);
    const term: any = new Terminal();

    const roomName = 'terminal-1-message';
    term.open(this.terminalElement.nativeElement);
    term.fit();
    term.on('data', (data) => {
      this.terminalSocket.socket.emit(roomName, data);
    });

    this.terminalSocket.socket.on(roomName, (data) => {
      term.write(data.text);
    });

  }

}
