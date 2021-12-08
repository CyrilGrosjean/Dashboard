import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RedditModule } from './services/reddit/reddit.module';
import { LoginModule } from './services/login/login.module';
import { WeatherModule } from './services/weather/weather.module';
import { RiotModule } from './services/riot/riot.module';
import { YoutubeModule } from './services/youtube/youtube.module';
import { CurrencyModule } from './services/currency/currency.module';
import { SpotifyModule } from './services/spotify/spotify.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedditModule,
    LoginModule,
    WeatherModule,
    RiotModule,
    YoutubeModule,
    CurrencyModule,
    SpotifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
