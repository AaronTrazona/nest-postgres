import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { BasicAuthGuard } from './guards/basic.guard';
import { postgresFactory } from './databases/postgres';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: BasicAuthGuard,
    },
    {
      provide: 'POSTGRES',
      useFactory: postgresFactory
    }
  ],
})
export class AppModule {}
