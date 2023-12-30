import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate = async (context: ExecutionContext) => {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization;

      if (!token) {
        throw new UnauthorizedException('Token not provided');
        return false;
      }

      const decoded = verify(token, process.env.TOKEN_SECRET);

      const isValid = this.authService.isValidToken(decoded);
      if (isValid) {
        return true;
      } else {
        throw new UnauthorizedException('Unauthorized! Token is Expired');
        return false;
      }
    } catch (error) {
      console.log({ error });
      throw new UnauthorizedException('Invalid token');
    }
  };
}
