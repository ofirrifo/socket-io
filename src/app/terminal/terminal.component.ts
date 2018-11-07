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
export const TERMINAL_OPTIONS_OUTPUT: ITerminalOptions = {
  theme: {
    background: '#262b37', // background color
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


  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.terminal();
    if (this.withOutput) {
      this.terminalOutput();
    }
  }

  terminal() {
    Terminal.applyAddon(fit);
    const term: any = new Terminal(TERMINAL_OPTIONS);
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
      term.write(data.text);
      this.endTime = performance.now();
      const es = parseInt((this.endTime - this.startTime).toString(), 0);
      this.et = `(${es} milliseconds)`;
      this.cd.detectChanges();
    });
  }

  terminalOutput(): void {
    Terminal.applyAddon(fit);
    const term: any = new Terminal(TERMINAL_OPTIONS_OUTPUT);
    term.write('Enter command...');

    term.open(this.terminalOutputElement.nativeElement);
    term.fit();
    term.on('data', (data) => {
      this.terminalSocket.emit(this.roomName, data);
    });

    this.terminalSocket.socket.on(this.roomName, (data) => {
      term.write(data.text);
    });
  }

  send(textElement): void {
    this.terminalSocket.emit(this.roomName, textElement.value + '\r\n');
    textElement.value = '';
  }

}
