import * as io from 'socket.io-client';

export abstract class SocketIoUtils {
  readonly socket: any;

  protected constructor(namespace: string) {
    this.socket = io(`http://localhost:5000/${namespace}`);
  }

  emit(roomName: string, data: any) {
    this.socket.emit(roomName, data);
  }

}
