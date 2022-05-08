import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerrainModule } from './terrains/terrain.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Trena:Trena123@cluster0.yr6zz.mongodb.net/trena',
    ),
    TerrainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
