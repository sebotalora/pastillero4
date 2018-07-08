import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { NavController, ModalController, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { GraficasPage } from '../graficas/graficas';
import { BdfirebaseProvider } from '../../providers/bdfirebase/bdfirebase';
import firebase from 'firebase';

@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html'
})
export class HistorialPage {

  
  cantidad_formulas: number;
  formulas: any;
  contador_formulas: number;
  public base64Image: string;
  id_: string;
  siguiente_formula="";
  
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController,  private bd: BdfirebaseProvider,
    private camera: Camera, private actionSheetCtrl: ActionSheetController, 
    private modalCtrl: ModalController, private alertCtrl: AlertController) {

      let self = this;
      self.loadingCtrl.create({
      content: '<ion-spinner name="crescent"></ion-spinner> Espera un momento...',
      duration: 1500,
      }).present();

      
      this.init_formulas(this.bd.idactual());
      
      
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
  let modal = this.modalCtrl.create('UploadModalPage', { data: imagePath, siguiente: this.siguiente_formula});
  modal.present();
}, (err) => {
  console.log('Error: ', err);
});
}
    
grafica(){
  this.navCtrl.push(GraficasPage);
  //this.showPopup('Gráficas', 'Mostrar una grafica');
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
  
  this.siguiente_nombre(this.bd.idactual());

  let actionSheet = this.actionSheetCtrl.create({
    title: 'Añadir Fórmula: Seleccione método de ingreso',
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
        text: 'Ingresar fórmula manualmente',
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


cant_formulas(cant){
  this.cantidad_formulas = cant;
}
sumar_formula(){
  this.contador_formulas=this.contador_formulas+1;
}

arreglo_formulas(arreglo){
  this.formulas=arreglo;
  console.log("Ajá");
  console.log(this.formulas);
}

init_formulas(id){
  this.contador_formulas=0;
  firebase.database().ref('/historias/'+id+'/').on('value', (snapshot) => {
    console.log("Cant Formulas "+id+": "+snapshot.numChildren());
    this.cant_formulas(snapshot.numChildren());  /////////////////
    console.log("Usuario: "+snapshot.key);

    snapshot.forEach(childSnapshot => {
      
      var keyFormula = childSnapshot.key;
      var formula_array= new Array(new Array ());

      console.log("Formula: "+keyFormula);
      
      var fechaFormula = childSnapshot.child('fecha').val();
      
      console.log("Fecha Formula: "+fechaFormula);
      console.log("Cant Medicamentos: "+childSnapshot.child('medicamentos').numChildren());
      
      var urlimg="";
      if(this.contador_formulas+1 % 2 == 0) {
        urlimg="assets/imgs/myjobs/receta1.jpg";
      }
      else {
        urlimg="assets/imgs/myjobs/receta2.jpg";
      }

      formula_array[this.contador_formulas][0]=this.contador_formulas+1;
      formula_array[this.contador_formulas][1]=keyFormula;
      formula_array[this.contador_formulas][2]=fechaFormula;
      formula_array[this.contador_formulas][3]=childSnapshot.child('medicamentos').numChildren();
      formula_array[this.contador_formulas][4]=urlimg;

      this.arreglo_formulas(formula_array);

      this.sumar_formula();
      return false;

    });

   });
   
}

ver_formula(datos){
  console.log("datos");
  console.log(datos);
  let modal_verformula = this.modalCtrl.create('FormulaPage', { data: datos });
  modal_verformula.present();
}
siguiente_nombre(id,numero=this.cantidad_formulas+1){
   
  firebase.database().ref('/historias/'+id+'/h'+numero.toString()+'/').on('value', (snapshot) => {
    if (snapshot.val()){
      this.siguiente_nombre(id,numero+1);
    }else{
      this.siguiente_formula='h'+numero.toString();
      console.log("Sig nombre de formula:",this.siguiente_formula);
    }
  });
}

}
