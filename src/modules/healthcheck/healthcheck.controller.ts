import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthcheckService } from './healthcheck.service';

@ApiTags('healthcheck')
@Controller('ping')
export class HealthcheckController {
  constructor(private healthCheck: HealthcheckService) {}

  @Get('/')
  async ping() {
    return this.healthCheck.ping();
  }
}
