import * as io from 'socket.io-client';

export class SocketUtils {
  private static _instance: SocketUtils = new SocketUtils();
  public readonly socketTerminal;
  public readonly socketTerminal2;


  private constructor() {
    if (SocketUtils._instance) {
      throw new Error('Error - use Singleton.getInstance()');
    }

    this.socketTerminal = io('http://localhost:5000/terminal');
    this.socketTerminal2 = io('http://localhost:5000/terminal2');
  }

  static get instance(): SocketUtils {
    return SocketUtils._instance;
  }
}
