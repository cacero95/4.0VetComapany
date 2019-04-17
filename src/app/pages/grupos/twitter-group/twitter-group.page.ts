import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-twitter-group',
  templateUrl: './twitter-group.page.html',
  styleUrls: ['./twitter-group.page.scss'],
})
export class TwitterGroupPage implements OnInit {
  imagen:string;
  tema_busqueda:string;
  constructor(private modalCtrl:ModalController,
    private params:NavParams) {
      this.imagen = this.params.get('img');
      this.tema_busqueda = this.params.get('nombre');
      console.log(this.imagen,this.tema_busqueda);
    }

  ngOnInit() {
  }
  close(){
    this.modalCtrl.dismiss();
  }
}
