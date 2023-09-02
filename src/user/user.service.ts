import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import * as argon from 'argon2';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async editUser(userId: number, dto: EditUserDto) {
    if (dto.email) {
      const isEmailExist = await this.repository.getUserByEmail(dto.email);
      if (isEmailExist) throw new ForbiddenException('Email taken');
    }

    const passwordHash = dto.password
      ? await argon.hash(dto.password)
      : undefined;

    const user = await this.repository.updateUserInfo(
      userId,
      dto.email,
      dto.name,
      passwordHash,
    );
    delete user.passwordHash;

    return user;
  }
}
