export interface Tips {
    titulo:string;
    short:string;
    descripcion:string;
  }
  export interface Pets_data {
    titulo:string;
    short?:string;
    descripcion?:string;
    clases?:Clases;
    tipos?:Clases[];
  }
  export interface Clases{
    titulo?:string;
    descripcion?:string[];
  }