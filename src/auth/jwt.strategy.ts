import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jdosfhdfqhdfphfoq',
    });
  }

  async validate(payload: { id: string }) {
    const { id } = payload;
    const user = await this.db.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new UnauthorizedException('usuario nao enconytrado');
    }
    return user;
  }
}
