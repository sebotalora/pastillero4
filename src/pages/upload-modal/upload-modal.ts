import { ImagesProvider } from './../../providers/images/images';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { FormulaNuevaPage } from '../formula-nueva/formula-nueva';

@IonicPage()
@Component({
  selector: 'page-upload-modal',
  templateUrl: 'upload-modal.html',
})
export class UploadModalPage {
  imageData: any;
  desc: string;
  formula: any;
  url_ocr: string;

  constructor(public loadingCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private imagesProvider: ImagesProvider, private alertCtrl: AlertController) {
    this.imageData = this.navParams.get('data');
  }

  saveImage() {

    let self = this;
    self.loadingCtrl.create({
      content: '<ion-spinner name="crescent"></ion-spinner> Cargando...',
      duration: 8000,
      dismissOnPageChange: true
    }).present();

    this.imagesProvider.uploadImage(this.imageData, this.desc, this.url_ocr).then(res => {
      console.log("Exito");

      let alert = this.alertCtrl.create({
        title: 'Enviado con Exito',
        subTitle: JSON.stringify(res, null, 2),
        buttons: ['cerrar']
      });
      alert.present();

      //let nuevaf  = this.modalCtrl.create(FormulaNuevaPage, {formula: JSON.parse(res.response)});
     // nuevaf.present();
      
    }, err => {
      console.log(err.message);
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: JSON.stringify(err),
        buttons: ['cerrar']
      });
      alert.present();

      //this.dismiss();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
