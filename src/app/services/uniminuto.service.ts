import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniminutoService {

  constructor(
    private http: HttpClient
  ) { }

  getGraduados(correo){
    return this.http.get(`https://registros.uniminuto.edu/api_da/select/index.php?fn=da&correo=${correo}`);
  }

  getAcademia(id){
    return this.http.get(`https://zonaestudiantes.uniminuto.edu/ServiciosAPI/API/BannerEstudiante/ConsultarProgramas/${id}`);
  }

  getPersonales(id){
    return this.http.get(`https://registros.uniminuto.edu/api_egresado_act/service/banner.php?fn=datosPersonales&id=${id}`);
  }

  getRegistraduria(documento){
    return this.http.get(`https://registros.uniminuto.edu/api_registraduria/select/index.php?fn=verificacion&documento=${documento}`);
  }

  getDepartamentos(){
    return this.http.get(`https://registros.uniminuto.edu/api_egresado_act/json/dep.json`);
  }

  getMunicipios(){
    return this.http.get(`https://registros.uniminuto.edu/api_egresado_act/json/mun.json`);
  }

  gettipoDireccion(){
    return this.http.get(`https://registros.uniminuto.edu/api_egresado_act/json/residencia.json`);
  }

  getActualizarBanner(documento, correo, telefono, banner, fijo, residencia, departamento, barrio, municipio, direccion){
    //console.log(`https://registros.uniminuto.edu/api_egresado_act/service/demografia.php?fn=actu&documento=${btoa(documento)}&correo=${btoa(correo)}&telefono=${btoa(telefono)}&banner=${btoa(banner)}&fijo=${btoa(fijo)}&residencia=${btoa(residencia)}&departamento=${btoa(departamento)}&barrio=${btoa(barrio)}&municipio=${btoa(municipio)}&direccion=${btoa(direccion)}`);
    return this.http.get(`https://registros.uniminuto.edu/api_egresado_act/service/demografia.php?fn=actu&documento=${btoa(documento)}&correo=${btoa(correo)}&telefono=${btoa(telefono)}&banner=${btoa(banner)}&fijo=${btoa(fijo)}&residencia=${btoa(residencia)}&departamento=${btoa(departamento)}&barrio=${btoa(barrio)}&municipio=${btoa(municipio)}&direccion=${btoa(direccion)}`);
  }
  getPreguntas(id){
    return this.http.get(`http://10.0.36.175:90/Api/AutogestionPreguntas/All/${id}`);
    
  }
}
