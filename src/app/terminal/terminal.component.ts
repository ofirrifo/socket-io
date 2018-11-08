import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
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

  term: any;
  keyToMethod = {
    '13': this.onEnter.bind(this),
    '8': this.onBackspace.bind(this),
    '37': this.onLeftArrow.bind(this),
    '39': this.onRightArrow.bind(this),
  };
  prompt = '=> Dev ';
  text = '';
  cursorPosition = 0;


  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.terminal();
  }

  terminal() {
    Terminal.applyAddon(fit);
    const terminalOptions = this.withOutput ? TERMINAL_OPTIONS_DISABLE : TERMINAL_OPTIONS;
    this.term = new Terminal(terminalOptions);

    this.term.on('key', (data, event) => {
      // console.table([data, event]);
      console.log(event.keyCode);
      if (this.keyToMethod.hasOwnProperty(event.keyCode)) {
        this.keyToMethod[event.keyCode](data, event);
      } else {
        this.onWrite(data);
      }
    });

    this.term.open(this.terminalElement.nativeElement);

    this.term.fit();

  }

  onEnter(): void {
    this.term.writeln('');
    if (this.text) {
      this.term.write(this.text);
      this.term.writeln('');
    }
    this.term.write(this.prompt);
    this.text = '';
    this.updateCursorPosition('reset');
  }

  onBackspace() {
    if (this.cursorPosition > 0) {
      this.term.write('\b \b');
      this.updateCursorPosition('remove');
    }
  }

  onLeftArrow(data) {
    this.updateCursorPosition('remove');
    if (this.cursorPosition > -1) {
      this.term.write(data);
    }
  }

  onRightArrow(data) {
    this.updateCursorPosition('add');
    if (this.cursorPosition < this.text.length) {
      this.term.write(data);
    }
  }

  /**
   * write the enter text to terminal
   */
  onWrite(data) {
    this.term.write(data);
    this.text += data;
    this.updateCursorPosition('add');
  }

  updateCursorPosition(action: string): void {
    if (action === 'add') {
      if (this.cursorPosition < this.text.length) {
        this.cursorPosition++;
      }
    } else if (action === 'remove') {
      this.cursorPosition--;
    } else if (action === 'reset') {
      this.cursorPosition = 0;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.term.resize();
    this.term.fit();
  }
}
