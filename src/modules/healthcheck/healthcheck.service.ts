import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthcheckService {
  constructor(private config: ConfigService) {}
  async ping() {
    return { status: 'pong', health: 'fine', port: this.config.get('PORT') };
  }
}
