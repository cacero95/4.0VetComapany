import { Pipe, PipeTransform } from '@angular/core';
import { Tips } from '../models/pets_data';


@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(tips: Tips[], text: string): Tips[] {
    if (text.length == 0){
      return tips;
    }
    text = text.toLocaleLowerCase();

    return tips.filter(tip=>{
      return tip.titulo.toLocaleLowerCase().includes(text);
      /**
       * si quisieramos filtrar por otra condicion
       * por ejemplo la descripcion se usuaria
       *  || tip.descripcion.toLowerCase().includes(text)
       */
    })
  }

}
