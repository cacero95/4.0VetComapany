import { Component, OnInit } from '@angular/core';
import { DbaService } from 'src/app/services/dba.service';
import { Tips } from 'src/app/models/pets_data';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {
  
  tips:Tips[] = [];
  buscarTexto:string = '';
  constructor(private dba:DbaService) {
    this.dba.get_tips().subscribe((tip_info:any)=>{
      for(let tip of tip_info){
        let consejo:Tips = {
          titulo: tip.data.titulo,
          short: tip.data.short,
          descripcion: tip.data.descripcion
        }
        
        this.tips.push(consejo);
      }
      
    });

  }

  ngOnInit() {

  }
  completo(tip){
    console.log(tip);
  }
  search(event){

    /**
     * se almacena el valor que el usuario
     * este digitando en el navbar
     */
    this.buscarTexto = event.target.value;
    
  }

}
