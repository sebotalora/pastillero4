import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController  } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegistroPage } from '../registro/registro';
import { AutenticacionProvider } from '../../providers/autenticacion/autenticacion';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BdfirebaseProvider } from '../../providers/bdfirebase/bdfirebase';
import firebase from 'firebase';
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
    public alertCtrl : AlertController,
    private localNotifications: LocalNotifications,
    private bd: BdfirebaseProvider) {
      this.check();
    this.element.nativeElement
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  check(){
    console.log("Correo: ",localStorage.getItem("Correo_Pastillero")!==null);
    console.log("Contraseña: ",localStorage.getItem("Clave_Pastillero")!==null);
    if(localStorage.getItem("Correo_Pastillero")!==null && localStorage.getItem("Clave_Pastillero")!==null){
      this.user.email=localStorage.getItem("Correo_Pastillero");
      this.user.password=localStorage.getItem("Clave_Pastillero");
      this.click_login();
    }else{
      console.log("false local storage");
    }
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
   this.localNotifications.cancelAll();
   this.actualizarCronograma(this.bd.idactual());
   localStorage.setItem("Correo_Pastillero", this.user.email);
   localStorage.setItem("Clave_Pastillero", this.user.password);
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

 actualizarCronograma(id){
  this.localNotifications.cancelAll();
  firebase.database().ref('/cronograma/'+id+'/').on('value', (snapshot) => {
    

    snapshot.forEach(dia => {

      dia.forEach(meds => {
      //  var keyMed = meds.key;

        var fecha = meds.child('fecha').val();
        var hora = meds.child('hora').val();
        var medicamento = meds.child('medicamento').val();
        var presentacion = meds.child('presentacion').val();
       // console.log(fecha,hora);
        this.notificacion(this.fecha(fecha,hora),this.texto(presentacion,medicamento));

        return false;
      });
        
        
        return false;
      });

   });
 }

 notificacion(fecha, texto){
  //"assets/sonidos/open-ended.mp3"

  this.localNotifications.schedule({
    id: 1,
    title: 'Hora de tomar tu medicamento:',
    text: texto,
    trigger: {at: fecha},
    icon: 'file://assets/imgs/pildoras-01.png',
    sound: 'file://assets/sonidos/open-ended.mp3',
    vibrate: true,
    wakeup: true,
    color:"2dd30c"
 }); 

}

texto(present,medicamento){
  var textof="";
  if(present.slice(-1)=="s" || present.slice(-1)=="S"){
    
    textof=medicamento+" - 1 "+present.slice(0,-1);
  }else{
    textof=medicamento+" - 1 "+present;
  }
 
  return textof;
}

fecha(fecha,hora){
  var parte_fecha =fecha.split('-');
  var parte_hora =hora.split(':');
  var fecha_y_hora = new Date(parseInt(
    parte_fecha[0]), 
    parseInt(parte_fecha[1]) - 1, 
    parseInt(parte_fecha[2]),
    parseInt(parte_hora[0]),
    parseInt(parte_hora[1]),
    0,
    0
  );
  
  return fecha_y_hora;
}

}
