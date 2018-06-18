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
  

  constructor(public loadingCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private imagesProvider: ImagesProvider, private alertCtrl: AlertController) {
    this.imageData = this.navParams.get('data');
  }

  verificarMedicamentos(lista){
    var tamano= Object.keys(lista).length;
    for (var i = 0; i < tamano; i++) {
      if (lista[i].M != null){
        console.log(i.toString()+": "+JSON.stringify(lista[i]));
      }
      
    }
  }

  saveImage() {

    let self = this;
    self.loadingCtrl.create({
      content: '<ion-spinner name="crescent"></ion-spinner> Cargando...',
      duration: 8000,
      dismissOnPageChange: true
    }).present();

    this.imagesProvider.uploadImage(this.imageData, this.desc).then(res => {
      console.log("Exito");
      var json_str=res.response;
      
      var datos=JSON.parse(res.response);
      //datos.response[1].M
      let alert = this.alertCtrl.create({
        title: 'Enviado con Exito',
        subTitle: 'Por favor, proceda a confirmar la información de la receta medica, reconocida por nuestro servidor.',
        buttons: ['Continuar']
      });
      alert.present();
      this.verificarMedicamentos(datos);

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
