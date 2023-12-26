import { Body, Controller, Post } from '@nestjs/common';
import { ILogin, Isignup } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() payload: Isignup) {
    return await this.authService.signup(payload);
  }

  @Post('/login')
  async login(@Body() payload: ILogin) {
    return await this.authService.login(payload);
  }
}
