import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { BookModule } from './book/book.module';
import { TagModule } from './tag/tag.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    BookModule,
    TagModule,
    CartModule,
    OrderModule,
  ],
})
export class AppModule {}
