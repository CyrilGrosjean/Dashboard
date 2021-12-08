import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipeComponent } from './dashboard/date-pipe/date-pipe.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { HomePageComponent } from './dashboard/home-page/home-page.component';
import { HomePageBannerComponent } from './dashboard/home-page-banner/home-page-banner.component';
import { WidgetCardComponent } from './widget-card/widget-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HourPipeComponent } from './hour-pipe/hour-pipe.component';
import { LoginPageComponent } from './login/login-page/login-page.component'
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, VKLoginProvider } from 'angularx-social-login';
import { PostRequestComponent } from './login/post-request/post-request.component';
import { OpenWeatherComponent } from './dashboard/widgets/open-weather/open-weather.component';
import { WeatherPollutionComponent } from './dashboard/widgets/weather-pollution/weather-pollution.component';
import { RiotRotationsComponent } from './dashboard/widgets/riot-rotations/riot-rotations.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { YoutubeStatComponent } from './dashboard/widgets/youtube-stat/youtube-stat.component';
import { YoutubeVideoComponent } from './dashboard/widgets/youtube-video/youtube-video.component';
import { RiotLastMatchComponent } from './dashboard/widgets/riot-last-match/riot-last-match.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CryptoCurrencyComponent } from './dashboard/widgets/crypto-currency/crypto-currency.component';
import { MoneyConvertorComponent } from './dashboard/widgets/money-convertor/money-convertor.component';
import { SpotifyMusicComponent } from './dashboard/widgets/spotify-music/spotify-music.component';
import { RedirectPageComponent } from './dashboard/redirect/redirect-page.component';
import { SafePipe } from './dashboard/widgets/spotify-music/spotipipe';
import { SpotifyArtistComponent } from './dashboard/widgets/spotify-stats/spotify-artist.component';
import { RedditProfileComponent } from './dashboard/widgets/reddit-profile/reddit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DatePipeComponent,
    HomePageComponent,
    HomePageBannerComponent,
    WidgetCardComponent,
    HourPipeComponent,
    LoginPageComponent,
    PostRequestComponent,
    OpenWeatherComponent,
    WeatherPollutionComponent,
    RiotRotationsComponent,
    YoutubeStatComponent,
    YoutubeVideoComponent,
    RiotLastMatchComponent,
    CryptoCurrencyComponent,
    MoneyConvertorComponent,
    SpotifyMusicComponent,
    RedirectPageComponent,
    SafePipe,
    SpotifyArtistComponent,
    RedditProfileComponent,
  ],
  imports: [
    NgxChartsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    DragDropModule,
    SocialLoginModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    DatePipe,
    SafePipe,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('Google Login Key')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('Facebook login key')
          },
          {
            id: VKLoginProvider.PROVIDER_ID,
            provider: new VKLoginProvider('VK login key')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
