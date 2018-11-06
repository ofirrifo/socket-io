import * as io from 'socket.io-client';

export abstract class SocketIoUtils {
  readonly socket: any;

  protected constructor(namespace: string) {
    this.socket = io(`https://s1-dev-uqlvwdmwns.sentinelone.net/${namespace}`, {
      transports: ['websocket']
    });
  }

  emit(roomName: string, data: any) {
    this.socket.emit(roomName, data);
  }

  on(roomName: string, callback: (data: any) => void): void {
    this.socket.on(roomName, callback);
  }


}
