import { SocketIoUtils } from './socket-io-utils';

export class DashboardSocket extends SocketIoUtils {
  private static _instance: DashboardSocket = new DashboardSocket();

  constructor() {
    super('dashboard');
  }

  static get instance(): DashboardSocket {
    return DashboardSocket._instance;
  }
}
