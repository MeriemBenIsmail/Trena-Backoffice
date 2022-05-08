import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerrainModule } from './terrains/terrain.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CoachsModule } from './coachs/coachs.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    TerrainModule,
    UsersModule,
    CoachsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
