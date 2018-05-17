import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hoy= new Date();
  dias_ord: any = []

  images: any = [];
  dias= [['Domingo','Fecha','assets/imgs/myjobs/myjobs1.jpg'],
  ['Lunes','Fecha','assets/imgs/myjobs/myjobs2.jpg'],
  ['Martes','Fecha','assets/imgs/myjobs/myjobs3.jpg'],
  ['Miercoles','Fecha','assets/imgs/myjobs/myjobs4.jpg'],
  ['Jueves','Fecha','assets/imgs/myjobs/myjobs5.jpg'],
  ['Viernes','Fecha','assets/imgs/myjobs/myjobs6.jpg'],
  ['Sábado','Fecha','assets/imgs/myjobs/myjobs7.jpg']
];
  constructor(public navCtrl: NavController) {
    let indice=this.hoy.getDay();
    this.dias_ord=this.dias.slice(indice,7).concat(this.dias.slice(0,indice));
    var i,dd,mm,y;
    var fecha = new Date();
    dd = fecha.getDate();
    mm = fecha.getMonth() + 1;
    y = fecha.getFullYear();
    this.dias_ord[0][0]=this.dias_ord[0][0]+" - Hoy!"
    this.dias_ord[0][1]=dd + '/'+ mm + '/'+ y;
    for (i = 1; i < 7; i++) { 
      fecha.setDate(fecha.getDate() + 1);
      dd = fecha.getDate();
      mm = fecha.getMonth() + 1;
      y = fecha.getFullYear();
      this.dias_ord[i][1]=dd + '/'+ mm + '/'+ y;
    }
  }

}
