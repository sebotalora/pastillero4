import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BdfirebaseProvider } from '../../providers/bdfirebase/bdfirebase';
import firebase from 'firebase';

/**
 * Generated class for the FormulaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formula',
  templateUrl: 'formula.html',
})
export class FormulaPage {
  datos: any;
  medicamentos = [];
  fechaformula: string;
  contadorMed=0;

  constructor(public nav: NavController, public navParams: NavParams,private bd: BdfirebaseProvider) {
    
    console.log("FORMULAS")
    this.datos = this.navParams.get('data');
    this.traerFormula(this.bd.idactual());
    console.log(this.medicamentos);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormulaPage');
  }

  traerFormula(id){
    firebase.database().ref('/historias/'+id+'/'+this.datos[1]).on('value', (snapshot) => {
      this.setFecha(snapshot.child('fecha').val());

      snapshot.child('medicamentos').forEach(meds => {
          var keyMed = meds.key;

          var fecha_inicio = meds.child('fecha_inicio').val();
          var cantidad = meds.child('cantidad').val();
          var frecuencia = meds.child('frecuencia').val();
          var hora = meds.child('hora').val();
          var nombre = meds.child('nombre').val();
          var tiempo = meds.child('tiempo').val();
          var unidadtiempo = meds.child('unidadtiempo').val();
          
          this.agregaMedicamento(keyMed,nombre,cantidad,unidadtiempo,tiempo,frecuencia,fecha_inicio,hora);

          return false;
        });

     });
  }

  setFecha(valor){
    this.fechaformula=valor;
  }
  agregaMedicamento(key,med,cant,unidadtiempo,tiempo,frecu,fecha,hora){
    this.contadorMed=this.contadorMed+1;
    var urlimg="";
      if(this.contadorMed % 2 == 0) {
        urlimg="assets/imgs/pildoras-01.png";
      }
      else {
        urlimg="assets/imgs/pildoras-02.png";
      }
    // 0-key, 1-med, 2-cant, 3-unidadtiempo, 4-tiempo, 5-frecu, 6-fecha, 7-hora, 8-urlimg
    this.medicamentos.push([key,med,cant,unidadtiempo,tiempo,frecu,fecha,hora,urlimg]);

  }
  
  descargar(){

  }

  cerrar(){
    this.nav.pop();
  }
}
