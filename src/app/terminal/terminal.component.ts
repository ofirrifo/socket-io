import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Terminal } from 'xterm';
import { TerminalSocket } from '../socket/terminal-socket';
import * as fit from 'xterm/lib/addons/fit/fit';

const redText = '\u001b[31m';
const resetText = '\u001b[0m';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  @Input() roomName: string;

  @ViewChild('terminal') terminalElement;
  private terminalSocket = TerminalSocket.instance;


  constructor() {
  }

  ngOnInit() {

    Terminal.applyAddon(fit);
    const term: any = new Terminal();
    term.writeln(`${redText}${this.roomName}${resetText}`);

    term.open(this.terminalElement.nativeElement);
    term.fit();
    term.on('data', (data) => {
      this.terminalSocket.emit(this.roomName, data);
    });

    this.terminalSocket.socket.on(this.roomName, (data) => {
      term.write(data.text);
    });

  }

}
