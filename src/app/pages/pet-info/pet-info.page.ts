import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbaService } from 'src/app/services/dba.service';
import { Pets_data, Clases } from 'src/app/models/pets_data';

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.page.html',
  styleUrls: ['./pet-info.page.scss'],
})
export class PetInfoPage implements OnInit {


  pets_data:Pets_data [] = [];
  load:boolean = false;
  constructor(private router:Router,
    private dba:DbaService) {


    }
    
ngOnInit() {
  this.load = true;
  this.dba.codigo_policial()
  .subscribe(async(data:any)=>{

    let information = await data;
    this.load = false;
    for(let info of information){
      let array_tipos:Clases [] = [];
      
      if (info.data.tipos){
        let types = info.data.tipos;
        /**
         * se recorre el objeto para ubicar los parametros
         * de tipos, segun el modelo Clases
         */
        for (let tipos_data in types){
          let descripciones_tipo = types[tipos_data];
          let descripciones:Clases[] = [];
          /**
         * se recorre el objeto que se hallo en tipos
         * y se buscan las descripciones de cada tipo
         * de informacion
         */
          for(let description in descripciones_tipo){
            descripciones.push(descripciones_tipo[description]);
          }
          types[tipos_data].descripcion = descripciones
          array_tipos.push(types[tipos_data])
        }
      }
      let pets_info:Pets_data = {
        titulo:info.data.titulo,
        descripcion:info.data.descripcion,
        short:info.data.short,
        clases:info.data.clases,
        tipos:array_tipos
      }
      console.log(pets_info);
      this.pets_data.push(pets_info);
    }
  })
}
  ubicar(ubicacion){
    this.router.navigate([`/${ubicacion}`]);
  }

  full_view(data){
    console.log(data);
  }

}
