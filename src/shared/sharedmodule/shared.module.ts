import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [],
  exports: [AuthModule],
  controllers: [],
})
export class SharedModule {}
