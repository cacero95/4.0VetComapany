import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { TypeUserPage } from './pages/type-user/type-user.page';
import { DbaService } from './services/dba.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  

  public appMenu = [
    
    {title: 'login', url: '/login', icon: 'md-contact'},
    {title: 'registrarse', url:'/register', icon:'md-arrow-round-up'}
  
  ]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private modalCtrl:ModalController,
    private dba:DbaService
  ) {
    this.initializeApp();
  }

  


  async navegar(url){

    
    if (url == '/login'){
      this.router.navigate(['/login']);
    }
    else {
      
      let modal = await this.modalCtrl.create({
        component:TypeUserPage,
        componentProps:{
          tipo:url
        }
      });
      modal.present();
      const data = await modal.onDidDismiss();
      this.dba.setTipo(data.data.result);
      this.router.navigate([`/${url}`]);
      

    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
