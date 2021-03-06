import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';


/*
  Generated class for the BdfirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BdfirebaseProvider {

 constructor(public http: HttpClient,  public afd: AngularFireDatabase) {
    console.log('Hello BdfirebaseProvider Provider');
  }

  crearUsuario(id,correo, telefono,nombre, apellido, edad, sexo,nacimiento ): void {
    firebase.database().ref(`/usuarios/`+id).set({
      correo: correo,
      telefono: telefono,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      sexo: sexo,
      nacimiento: nacimiento
    });
  }

  idactual(){
    return firebase.auth().currentUser.uid;
  }

  getPerfil(id){
    //return this.afd.list('/usuarios/'+id);
    var datosperfil:string[]; 
    firebase.database().ref('/usuarios/'+id+'/').on('value', (snapshot) => {
       console.log("eFdsaxssd: "+snapshot.child('apellido').val() );
       
       datosperfil=[
         snapshot.child('apellido').val(),
         snapshot.child('correo').val(),
         snapshot.child('edad').val(),
         snapshot.child('nombre').val(),
         snapshot.child('sexo').val(),
         snapshot.child('telefono').val()
      ];
      
      console.log("sdf: "+datosperfil);
       return datosperfil;
      
       });
       
    
  }
  
  addMedicamento(id, formula, idmed, nombre, canttotal, presentacion, frecuencia, utiempo, fecha, hora){
    try{
      firebase.database().ref(`/historias/`+id+"/"+formula+"/medicamentos/"+idmed).set({
        cantidad:canttotal,
        fecha_inicio:fecha,
        frecuencia:utiempo,
        hora:hora,
        tiempo:frecuencia,
        presentacion:presentacion,
        nombre: nombre
      });
    }catch(e){
      console.log("Error med");
    }
    
  }

    addfecha(id, formula,fecha){
      firebase.database().ref('/historias/'+id+'/'+formula+'/').once('value', (snapshot) => {
        if (snapshot.val()){
          this.addfecha2(id, formula,fecha);
        }else{
          console.log('formula no fue creada');
        }
      });
           
    }

    addfecha2(id, formula,fecha){
      try{
        firebase.database().ref(`/historias/`+id+"/"+formula+'/datos').set({fecha:fecha}); 
      }catch(e){
        console.log("Error fecha");
      }
    }


}
