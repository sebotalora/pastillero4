import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import * as papa from 'papaparse';
import { BdfirebaseProvider } from '../../providers/bdfirebase/bdfirebase';
import { Http } from '@angular/http';

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
  numero: String;
  renglon: any;
  bandera_ultimoMed: boolean;
  total_med: number;
  presentacionData = [];
  frecuenciaData = [];
  nombre_formula: string;

  constructor(
    private nav: NavController, public loadingCtrl: LoadingController, public modalCtrl: ModalController,
    private bd: BdfirebaseProvider,public navParams: NavParams,private http: Http
  ) {

    this.renglon = this.navParams.get('data');
    this.numero = this.navParams.get('med').toString();
    this.bandera_ultimoMed = this.navParams.get('banderaFinal');
    this.total_med = this.navParams.get('total');
    this.nombre_formula= this.navParams.get('siguiente');

    this.leerCSV_presentacion();
    this.leerCSV_frecuencia();
    this.desglosar_info();

  }

  desglosar_info(){
    //{"F":["TOMAR","CADA"],
    //"M":["LOSARTAN"],
    //"N":["1","12"],
    //"P":["TAB","TABLETAS"],
    //"T":["HORAS"],
    //"LINEA":"[u'VEJA',u'LOSARTAN', u'POTASIO', u'GEOM', u'TAB', u'PENDIENTE', u'TOMAR', u'1', u'TABLETAS', u'CADA', u'12', u'HORAS']"}
    
    if(this.renglon.M !=null){
      var tamanoM= Object.keys(this.renglon.M).length;
      for (var i = 0; i < tamanoM; i++) {
        this.medicamento = this.medicamento.concat(this.renglon.M[i], " ");
      }
    }

    if(this.renglon.N !=null){
      var tamanoN= Object.keys(this.renglon.N).length;
      if (tamanoN>1){
        if (this.renglon.N[0] != '1'){
          this.frecuencia_cant= parseInt(this.renglon.N[0]);
          this.cantidad_total= parseInt(this.renglon.N[1]);
        }else{
          this.frecuencia_cant= parseInt(this.renglon.N[1]);
          this.cantidad_total= 30;
        }      
      }else if (tamanoN==1){
        if(this.renglon.N[0] == '1'){
          this.frecuencia_cant= 8;
          this.cantidad_total= 30;
        }else{
          this.frecuencia_cant= parseInt(this.renglon.N[0]);
          this.cantidad_total= 30;
        }
      }else{
        this.frecuencia_cant= 8;
        this.cantidad_total= 30;
      }
    }
    
    if(this.renglon.P !=null){
      this.presentacion= this.renglon.P[0];
    }else{
      this.presentacion= "TABLETAS";
    }
    
    if(this.renglon.T !=null){
      this.frecuencia_utiempo= this.renglon.T[0];
    }else{
      this.frecuencia_utiempo= "HORAS";
    }
    console.log(this.frecuencia_utiempo);
    
    this.fecha_inicio= new Date().toISOString().slice(0, 10);
    console.log(this.fecha_inicio);
    this.hora_inicio= "08:00";

    
  
  }

  leerCSV_presentacion(){
    this.http.get('assets/diccionarios/dic_presentacion.csv')
      .subscribe(
      data => this.extraerDatosCSV_prese(data),
      err => this.gestionError(err)
      );
   
  }

  extraerDatosCSV_prese(res){
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;
 
    this.presentacionData = parsedData;
  }

  leerCSV_frecuencia(){
    this.http.get('assets/diccionarios/dic_tiempo.csv')
      .subscribe(
      data => this.extraerDatosCSV_fre(data),
      err => this.gestionError(err)
      );

  }

  extraerDatosCSV_fre(res){
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;
 
    this.frecuenciaData = parsedData;
  }

  gestionError(err){
    console.log('Error Lectura CSV: ', err);
  }


  registrar() {
    console.log("ID_Med: " + this.bd.idactual());
    this.nav.pop();
  }

  descartar_y_anadir(){
    this.nav.pop();
    this.medicamentoAdicional();
  }

  confirmar_y_anadir(){
    this.registrar();
    this.medicamentoAdicional();
  }

  medicamentoAdicional(){
    var lista=[];
    this.total_med=this.total_med+1;
    let modal_verificacion = this.modalCtrl.create('MedicamentoFormulaPage', { 
      data: lista,
      total:this.total_med,
      med: this.total_med,
      banderaFinal: true,
      siguiente: this.nombre_formula
    });
    modal_verificacion.present();
  }

  cancelar(){
    this.nav.pop();
  }


}
