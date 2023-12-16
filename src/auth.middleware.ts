// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No Token' });
    }

    let cleanToken: string;
    try {
        cleanToken = token.replace('Bearer','').trim();        
    } catch (error) {
        console.log(error);
    }

    try {
      const decoded = this.jwtService.verify(cleanToken, {publicKey: "clave12345678"});
      if (decoded.user == 'default') {
        next();
      } else {
        return res.status(401).json({ message: 'Token invalido' });
      }

    } catch (error) {
      return res.status(401).json({ message: 'Token invalido' });
    }
  }
}
