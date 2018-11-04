import * as socketIo from 'socket.io-client';

export class SocketUtils {
  private static _instance: SocketUtils = new SocketUtils();
  public readonly socket;


  private constructor() {
    if (SocketUtils._instance) {
      throw new Error('Error - use Singleton.getInstance()');
    }

    this.socket = socketIo('http://localhost:5000/');
  }

  static get instance(): SocketUtils {
    return SocketUtils._instance;
  }
}
