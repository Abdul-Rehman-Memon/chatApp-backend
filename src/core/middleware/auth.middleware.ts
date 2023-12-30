import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  use = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new UnauthorizedException('Token not provided');
      }

      const decoded = verify(token, process.env.TOKEN_SECRET);

      this.authService.isValidToken(decoded);

      next();
    } catch (error) {
      console.log({ error });
      throw new UnauthorizedException('Invalid token');
    }
  };
}
