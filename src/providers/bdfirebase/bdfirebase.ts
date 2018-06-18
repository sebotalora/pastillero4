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

  
}
