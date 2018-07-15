import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hoy= new Date();
  dias_ord: any = []

  images: any = [];
  dias= [['Domingo','Fecha','assets/imgs/dias_semana-00.png'],
  ['Lunes','Fecha','assets/imgs/dias_semana-00.png'],
  ['Martes','Fecha','assets/imgs/dias_semana-00.png'],
  ['Miércoles','Fecha','assets/imgs/dias_semana-00.png'],
  ['Jueves','Fecha','assets/imgs/dias_semana-00.png'],
  ['Viernes','Fecha','assets/imgs/dias_semana-00.png'],
  ['Sábado','Fecha','assets/imgs/dias_semana-00.png']
];
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, private localNotifications: LocalNotifications) {
    let indice=this.hoy.getDay();
    this.dias_ord=this.dias.slice(indice,7).concat(this.dias.slice(0,indice));
    var i,dd,mm,y;
    var fecha = new Date();
    dd = fecha.getDate();
    mm = fecha.getMonth() + 1;
    y = fecha.getFullYear();
    this.dias_ord[0][0]=this.dias_ord[0][0]+" - Hoy!"
    this.dias_ord[0][1]=dd + '/'+ mm + '/'+ y;
    this.dias_ord[0][2]='assets/imgs/dias_semana-01.png';
    for (i = 1; i < 7; i++) { 
      fecha.setDate(fecha.getDate() + 1);
      dd = fecha.getDate();
      mm = fecha.getMonth() + 1;
      y = fecha.getFullYear();
      this.dias_ord[i][1]=dd + '/'+ mm + '/'+ y;
      this.dias_ord[i][3]=dd;
      this.dias_ord[i][4]=mm;
      this.dias_ord[i][5]=y;
    }
  }

  verdia(dia){
    
    var fecha=dia[1].split("/");
    var busqueda=fecha[2]+"-"+this.dosdigitos(fecha[1])+"-"+this.dosdigitos(fecha[0]);
    
    let modal_dia = this.modalCtrl.create('FormulaActualPage', { 
      busqueda: busqueda
    });
    modal_dia.present();
  }

  dosdigitos(number){
    return  ("0" + number).slice(-2);
    
  }

  notificacion(){
    this.getNoti();
    //"assets/sonidos/open-ended.mp3"
    var fecha_y_hora = new Date(
      parseInt('2018'), 
      parseInt('07') - 1, 
      parseInt('15'),
      parseInt('09'),
      parseInt('50'),
      0,
      0
    );
    this.localNotifications.schedule({
      id: 1,
      title: 'Hora de tomar tu medicamento:',
      text: 'LOSARTAN - 1 tableta',
      trigger: {at: fecha_y_hora},
      icon: 'file://assets/imgs/pildoras-01.png',
      sound: 'file://assets/sonidos/open-ended.mp3',
      vibrate: true,
      wakeup: true,
      color:'2dd30c'
   }); 

  }

  getNoti(){
    this.localNotifications.getAll().then(function(notification) {
      //console.log("AQUI!!!//////////////");
      //console.log(JSON.stringify(notification));
      //console.log(Object.keys(notification).length);
      });
  }
}
