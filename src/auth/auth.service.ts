import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private repository: UserRepository,
  ) {}

  async signup(dto: AuthDto) {
    const isEmailExist = await this.repository.getUserByEmail(dto.email);
    if (isEmailExist) throw new ForbiddenException('Email taken');

    const hash = await argon.hash(dto.password);
    const user = await this.repository.createUser(dto.email, hash);

    return this.signToken(user.id, user.email);
  }

  async login(dto: AuthDto) {
    const user = await this.repository.getUserByEmail(dto.email);
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.passwordHash, dto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
