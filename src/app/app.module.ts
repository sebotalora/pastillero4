import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPageModule } from '../pages/login/login.module';
import { ImagesProvider } from '../providers/images/images';
import { FileTransfer } from '@ionic-native/file-transfer';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

import { AutenticacionProvider } from '../providers/autenticacion/autenticacion';
import { RegistroPageModule } from '../pages/registro/registro.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';


export const firebaseConfig = {
  apiKey: "AIzaSyAuq5Jxyy_U67qRka0j6Ab3mPGk4QmuLFo",
  authDomain: "pastillero-1aaf3.firebaseapp.com",
  databaseURL: "https://pastillero-1aaf3.firebaseio.com",
  projectId: "pastillero-1aaf3",
  storageBucket: "pastillero-1aaf3.appspot.com",
  messagingSenderId: "602178608924"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    LoginPageModule,
    RegistroPageModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagesProvider,
    FileTransfer,
    Camera,
    AngularFireAuth,
    AutenticacionProvider
  ]
})
export class AppModule {}
