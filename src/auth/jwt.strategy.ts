import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';
import { jwtConstants } from './jwt.constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private db: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { email: string }) {
    const usuario = await this.db.user.findUnique({
      where: { email: payload.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('usuario nao enconytrado');
    }
    return usuario;
  }
}
