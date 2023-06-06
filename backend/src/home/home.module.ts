import { Module } from '@nestjs/common'
import { HomeController } from './home.controller'
import { HomeService } from './home.service'
import { MongooseModule } from '@nestjs/mongoose'
import { HomeSchema } from './schemas/home.schema'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: 'Home', schema: HomeSchema }])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
