import { Component, OnInit, ViewChild } from '@angular/core';
import { Terminal } from 'xterm';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  @ViewChild('terminal') terminalElement;

  constructor() {
  }

  ngOnInit() {


    const term = new Terminal();

    term.open(this.terminalElement.nativeElement);

  }

}
