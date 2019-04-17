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
      let data_user = {};
      if(result){
        this.dba.login(this.email);
        
        setTimeout(()=>{
          data_user = this.dba.getUsuario();
          if (data_user == {}){
            this.show_alert('Usuario','No encontrado');
          }
          else {
            this.router.navigate(['/central/main']);
          }
        },3000)
      }
      
    }
    catch(err){
      console.log(JSON.stringify(err));
    }
  }

}
