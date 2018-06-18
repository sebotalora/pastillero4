import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the MedicamentoFormulaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicamento-formula',
  templateUrl: 'medicamento-formula.html',
})
export class MedicamentoFormulaPage {

  medicamento = "";
  cantidad_total: number;
  presentacion: string;
  frecuencia_cant: number;
  frecuencia_utiempo: string;
  fecha_inicio: string;
  hora_inicio: string;

  constructor(
    private nav: NavController, public loadingCtrl: LoadingController, private alertCtrl: AlertController
  ) {}

  desglosar_info(renglon){
    //{"F":["TOMAR","CADA"],
    //"M":["LOSARTAN"],
    //"N":["1","12"],
    //"P":["TAB","TABLETAS"],
    //"T":["HORAS"],
    //"LINEA":"[u'VEJA',u'LOSARTAN', u'POTASIO', u'GEOM', u'TAB', u'PENDIENTE', u'TOMAR', u'1', u'TABLETAS', u'CADA', u'12', u'HORAS']"}
    
    if(renglon.M !=null){
      var tamanoM= Object.keys(renglon.M).length;
      for (var i = 0; i < tamanoM; i++) {
        this.medicamento = this.medicamento.concat(renglon.M[i], " ");
      }
    }

    if(renglon.N !=null){
      var tamanoN= Object.keys(renglon.N).length;
      if (tamanoN>1){
        if (renglon.N[0] != '1'){
          this.frecuencia_cant= parseInt(renglon.N[0]);
          this.cantidad_total= parseInt(renglon.N[1]);
        }else{
          this.frecuencia_cant= parseInt(renglon.N[1]);
          this.cantidad_total= 30;
        }      
      }else if (tamanoN==1){
        if(renglon.N[0] == '1'){
          this.frecuencia_cant= 8;
          this.cantidad_total= 30;
        }else{
          this.frecuencia_cant= parseInt(renglon.N[0]);
          this.cantidad_total= 30;
        }
      }else{
        this.frecuencia_cant= 8;
        this.cantidad_total= 30;
      }
    }
    
    if(renglon.P !=null){
      this.presentacion= renglon.P[0];
    }else{
      this.presentacion= "";
    }
    
    if(renglon.T !=null){
      this.frecuencia_utiempo= renglon.T[0];
    }else{
      this.frecuencia_utiempo= "horas";
    }
    
    this.fecha_inicio= "today";
    this.hora_inicio= "8:00";

    
  
  }

  public register() {
    
  }



}
