import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ITerminalOptions, Terminal } from 'xterm';
import { TerminalSocket } from '../socket/terminal-socket';
import * as fit from 'xterm/lib/addons/fit/fit';

const redText = '\u001b[93m';
const resetText = '\u001b[0m';
export const TERMINAL_OPTIONS: ITerminalOptions = {
  theme: {
    background: '#262b37', // background color
  }
};
export const TERMINAL_OPTIONS_DISABLE: ITerminalOptions = {
  theme: {
    background: '#424D58', // background color
  }
};

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit, AfterViewInit {

  @Input() roomName: string;
  @Input() withOutput;
  @Input() measureTime: boolean;
  @Input() titleText: string;

  @ViewChild('terminal') terminalElement;
  @ViewChild('terminalOutput') terminalOutputElement;
  private terminalSocket = TerminalSocket.instance;
  startTime;
  endTime;
  et;

  isOnline = false;


  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.terminal();
    this.terminalSocket.emit(this.roomName, '±');
  }

  terminal() {
    Terminal.applyAddon(fit);
    const terminalOptions = this.withOutput ? TERMINAL_OPTIONS_DISABLE : TERMINAL_OPTIONS;
    const term: any = new Terminal(terminalOptions);
    let title = `${redText}${this.roomName}${resetText}`;
    if (this.measureTime) {
      title += ' Measure Time CLIENT <==> BE';
    }
    term.writeln(title);

    term.open(this.terminalElement.nativeElement);
    if (this.withOutput) {
      this.terminalElement.nativeElement.querySelector('textarea').disabled = true;
    }

    term.fit();

    if (this.withOutput === false) {
      term.on('data', (data) => {
        this.startTime = performance.now();
        this.terminalSocket.emit(this.roomName, data);
      });
    }

    this.terminalSocket.socket.on(this.roomName, (data) => {
      if (data.text !== '±') {
        term.write(data.text);
        this.endTime = performance.now();
        if (this.startTime) {
          const es = parseInt((this.endTime - this.startTime).toString(), 0);
          this.et = `(${es} milliseconds)`;
        }
        this.isOnline = true;
        this.cd.detectChanges();
      }
    });
  }

  send(textElement): void {
    this.terminalSocket.emit(this.roomName, textElement.value + '\r\n');
    textElement.value = '';
  }

}
