import { SocketIoUtils } from './socket-io-utils';

export class TerminalSocket extends SocketIoUtils {
  private static _instance: TerminalSocket = new TerminalSocket();

  constructor() {
    super('terminal');
  }

  static get instance(): TerminalSocket {
    return TerminalSocket._instance;
  }
}
