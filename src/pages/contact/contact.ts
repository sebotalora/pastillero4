import { Component } from '@angular/core';
import { NavController, App} from 'ionic-angular';
import { AutenticacionProvider } from '../../providers/autenticacion/autenticacion';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public auth : AutenticacionProvider, private app: App) {

  }

  cerrarSesion(){
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
}

}
