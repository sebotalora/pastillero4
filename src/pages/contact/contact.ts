import { Component } from '@angular/core';
import { NavController, App, AlertController} from 'ionic-angular';
import { AutenticacionProvider } from '../../providers/autenticacion/autenticacion';
import { LoginPage } from '../login/login';
import { BdfirebaseProvider } from '../../providers/bdfirebase/bdfirebase';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  
  constructor(public navCtrl: NavController, public auth : AutenticacionProvider, private app: App,
    private bd: BdfirebaseProvider, private alertCtrl: AlertController) {
      this.inicializar();
  }

  cerrarSesion(){
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  inicializar(){
    
   // this.showPopup("Ase",JSON.stringify(this.bd.getPerfil(this.bd.idactual())));
    console.log("bbb: "+this.bd.idactual());
    console.log("aaa: "+JSON.stringify(
      this.bd.getPerfil(
        this.bd.idactual()
      )
    ));
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK'
          
        }
      ]
    });
    alert.present();
  }

}
