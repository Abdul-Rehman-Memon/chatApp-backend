import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guard';

@ApiTags('Connections')
@UseGuards(AuthGuard)
@Controller('connections')
export class ConnectionsController {
  constructor(private connectionsService: ConnectionsService) {}
  @Get('/')
  async getConnections() {
    return this.connectionsService.getConnections();
  }
}
