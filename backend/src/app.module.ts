import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HomeModule } from './home/home.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true, // this is for the deprecation warning of current URL string parser
        useUnifiedTopology: true, // this is for the deprecation warning of current Server Discovery and Monitoring engine
      },
    ),
    HomeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
