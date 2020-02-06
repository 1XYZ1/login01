import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario: UsuarioModel;

  recordarme = false ;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

    this.usuario = new UsuarioModel();

    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email')
      this.recordarme = true;
      
    } else {
      localStorage.removeItem('email')
      this.usuario.email = ''
    }
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

    this.auth.login(this.usuario)
    .subscribe( resp => {
        console.log(resp)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Correcto',
          text: 'Te has logeado correctamente' ,
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

    },
         (err) => {
            
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
