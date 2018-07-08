import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController  } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegistroPage } from '../registro/registro';
import { AutenticacionProvider } from '../../providers/autenticacion/autenticacion';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user= { email : '', password : ''};


  constructor(public navCtrl: NavController, 
    public element: ElementRef, 
    public navParams: NavParams,  
    public loadingCtrl: LoadingController,
    public auth : AutenticacionProvider,
    public alertCtrl : AlertController) {

    this.element.nativeElement
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  click_login(){

    this.auth.loginUser(this.user.email,this.user.password ).then((user) => {

      let self = this;
    self.loadingCtrl.create({
      content: '<ion-spinner name="crescent"></ion-spinner> Espera un momento...',
      duration: 8000,
      dismissOnPageChange: true
    }).present();
   self.navCtrl.push(TabsPage);

    }
  )
   .catch(err=>{
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: err.message,
      buttons: ['Aceptar']
    });
    alert.present();
  })



    
  }
  public signUp() {
    this.navCtrl.push(RegistroPage);
  }
  public goSignUp() {
    
    this.auth.registerUser(this.user.email,this.user.password)
    .then((user) => {
      // El usuario se ha creado correctamente
    })
    .catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })
    
    
    
 }



}
