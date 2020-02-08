import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  autenticado1: boolean =  this.auth.autenticado();
  
  
  constructor(private auth : AuthService, private router: Router) { }

  ngOnInit(){
  this.autenticado1 = this.auth.autenticado();
  }
  
  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login')
    this.autenticado1 = false;
  }

  
  


}
