import { Injectable } from '@nestjs/common';

@Injectable()
export class ConnectionsService {
  getConnections() {
    return 'Connections';
  }
}
