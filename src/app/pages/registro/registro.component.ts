import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.models';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

usuario: UsuarioModel;
recordarme = false;
  constructor(private auth: AuthService, private router: Router) { }


  
  ngOnInit() {
    this.usuario = new UsuarioModel();
    // this.usuario.email = "eldiaadia@gmail.com"
    // this.usuario.nombre = "Ramon Hernandez"
    // this.usuario.password = "123456"
   }


   onSubmit( form: NgForm ) {

    if (form.invalid){
      return;
    }
    //  console.log('Formulario enviado');
    //  console.log(this.usuario);
    //  console.log(form);

    Swal.fire({
      position: 'top-end',
      title: 'Espere por favor...',
      icon: 'info',
      showConfirmButton: false,
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      },
      toast: true
    })

    Swal.showLoading()

    this.auth.nuevoUsuario(this.usuario)
    .subscribe(resp => {
      
      console.log(resp)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Correcto',
        text: 'Te has registrado correctamente' ,
        showConfirmButton: false,
        timer: 5000,
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        },
        toast: true
        
  
        
      })

      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email);
        

      } else {
        
          localStorage.removeItem('email')
          this.usuario.email = ''
        
      }


      this.router.navigateByUrl('/home');
      
    }, (err) => {

      console.log(err.error.error.message)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error',
        text: err.error.error.message ,
        showConfirmButton: false,
        timer: 5000,
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        },
        toast: true
      })
    })

   }

}
