import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { DbaService } from '../../services/dba.service';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;
  load:boolean = false;
  constructor(private dba:DbaService,
    private router:Router,
    private fireauth:AngularFireAuth,
    private alertCtrl:AlertController) { }

  ngOnInit() {
  }

  async show_alert (title,mensaje){
    let alert = await this.alertCtrl.create({
      header:title,
      animated:true,
      message:mensaje,
      buttons:[
        {
          text:'Ok',
          role:'Ok'
        }
      ]
    });
    alert.present();
  }
  async login(){
    
    const result = this.fireauth.auth.signInWithEmailAndPassword(this.email,this.password);
    try{
      let data_user;
      if(result){
        this.load = true;
        this.dba.login(this.email);
        setTimeout(()=>{
          data_user = this.dba.getUsuario();
          console.log(data_user);
          if (data_user.name){
            this.load = false;
            this.router.navigate(['/central/main']);
            
          }
          else {
            this.load = false;
            this.show_alert('Usuario','No encontrado');
            
          }
        },3000)
      }
      
    }
    catch(err){
      console.log(JSON.stringify(err));
    }
  }

}
