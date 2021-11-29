import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PadsModule } from './pads/pads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
