import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { NavController, ModalController, ActionSheetController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  

  public base64Image: string;
  
  constructor(public navCtrl: NavController,  
    private camera: Camera, private actionSheetCtrl: ActionSheetController, 
    private modalCtrl: ModalController, private alertCtrl: AlertController) {

     
    }


  
  takePicture(sourceType){
// Create options for the Camera Dialog
var options = {
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  sourceType: sourceType,
  saveToPhotoAlbum: false,
  correctOrientation: true
};

// Get the data of an image
this.camera.getPicture(options).then((imagePath) => {
  console.log("imagePath:"+imagePath)
  let modal = this.modalCtrl.create('UploadModalPage', { data: imagePath });
  modal.present();
}, (err) => {
  console.log('Error: ', err);
});
}
    
grafica(){
  this.showPopup('Gráficas', 'Mostrar una grafica');
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


presentActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Añadir Formula: Seleccione fotografía',
    buttons: [
      {
        text: 'Cargar de la galería',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Tomar Fotografía',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Insertar formula manualmente',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
    ]
  });
  actionSheet.present();
}



}
