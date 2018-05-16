import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FormulaNuevaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formula-nueva',
  templateUrl: 'formula-nueva.html',
})
export class FormulaNuevaPage {
  meds: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.meds = this.navParams.get('formula');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormulaNuevaPage');
  }

}
