import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UniminutoService } from '../../services/uniminuto.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html'
})
export class DashboardPage implements OnInit {

  //usuario
  nombre:    string = '';
  apellido:  string = '';
  documento: string = '';
  usuario:   string = '';
  id:        string = '';

  //personales
  telefono:       any = '';
  celular:        any = '';
  correo:         any = '';
  direccion:      any = '';
  barrio:         any = '';
  tipoDireccion:  any = '';
  municipio:      any = '';
  departamento:   any = '';
  pais:           any = '';
  
  modificar: any = {
    tel: false,
    cel: false,
    cor: false,
    dir: false,
    bar: false,
    tip: false,
    mun: false,
    dep: false,
    pai: false
  }

  //array
  departamentos: any = [];
  municipios: any = [];
  tiposDirecciones: any = [];

  //extra
  via: any = '';
  numVia: any = '';
  complementoUno: any = '';
  complementoDos: any = '';
  complementoTres: any = '';
  tipoComplemento: any = '';

  //Preguntas de seguridad

  puntaje:  number;

  //servicios
  academica:  any = [];

  constructor(
    private route: ActivatedRoute,
    private uniminutoSrv: UniminutoService,
    private msgServ: MessageService
  ) {
    let data: any = []; 
    data = atob(this.route.snapshot.paramMap.get('data'));

    let dato = data.split('/');

    this.puntaje = 1;
    this.nombre = dato[0];
    this.apellido = dato[1];
    this.documento = dato[2];
    this.usuario = dato[3];
    this.id = dato[4];
    this.correo = dato[5];

    this.infoAcademica(this.id);
    this.infoPersonal(this.id);
  }

  ngOnInit() {
    this.uniminutoSrv.getDepartamentos()
      .subscribe( data => {
        this.departamentos = data;
      });
    
    this.uniminutoSrv.gettipoDireccion()
      .subscribe (dataD => {
        this.tiposDirecciones = dataD;
      });
  }

  infoAcademica(id){
    this.uniminutoSrv.getAcademia(id)
      .subscribe( dataA => {
        this.academica = dataA;
      });
  }

  infoPersonal(id){
    this.uniminutoSrv.getPersonales(id)
      .subscribe( resp => {
        this.telefono = resp['Estudiante']['TelefonoResidencia'];
        this.celular = resp['Estudiante']['TelefonoMovil'];
        this.correo = resp['Estudiante']['Email'];
        this.direccion = resp['Estudiante']['Direccion']['Direccion'];
        this.barrio = resp['Estudiante']['BarrioResidencia'];
        this.tipoDireccion = resp['Estudiante']['Direccion']['Tipo'];
        this.municipio = resp['Estudiante']['Municipio']['Id'];
        this.departamento = resp['Estudiante']['Municipio']['Departamento']['Id'];
        this.pais = resp['Estudiante']['Municipio']['Departamento']['Pais']['Id'];
      });
  }

  obtenerMinicipio(event){
    this.uniminutoSrv.getMunicipios()
      .subscribe( data => {
        this.municipios = data[0][event.detail.value];
      });
  }

  guardar(){
    //telefono
    let tel = '';
    if(!this.modificar.tel){
      tel = this.telefono;
    }else{
      if(this.telefono === null){
        this.msgServ.presentToastMsg('Escriba un teléfono válido', 'danger');
      }else{
        tel = this.telefono;
      }
    }

    //celular
    let cel = '';
    if(!this.modificar.cel){
      cel = this.celular;
    }else{
      if(this.celular === null){
        this.msgServ.presentToastMsg('Escriba un celular válido', 'danger');
      }else{
        cel = this.celular;
      }
    }

    //correo
    let cor = '';
    if(!this.modificar.cor){
      cor = this.correo;
    }else{
      if(this.correo === null){
        this.msgServ.presentToastMsg('Escriba un correo válido', 'danger');
      }else{
        let divisionMail:any = this.correo.split("@");
        if(divisionMail[1] == undefined){
          this.msgServ.presentToastMsg('Escriba un correo válido', 'danger');
        }else{
          cor = this.correo;
        }
      }
    }

    //municipio
    let mun = '';
    let tipD = '';
    let dir = '';
    let bar = '';
    let pais = '';
    let dep = '';

    if(!this.modificar.dir){
      mun = this.municipio;
      tipD = this.tipoDireccion;
      dir = this.direccion;
      bar = this.barrio;
      pais = this.pais;
      dep = this.departamento;
      console.log(cor);
      this.uniminutoSrv.getActualizarBanner(this.documento, cor, cel, this.id, tel, tipD, dep, bar, mun, dir)
        .subscribe( data => this.ngOnInit());
        this.msgServ.presentLoading('Guardando', 3000);
        this.msgServ.presentToastMsg('Datos guardados correctamente', 'success');
    }else{
      mun = this.municipio;
      tipD = this.tipoDireccion;
      bar = this.barrio;
      pais = this.pais;
      dep = this.departamento;
      this.direccion = `${this.via} ${this.numVia} # ${this.complementoUno} - ${this.complementoDos} ${this.tipoComplemento} ${this.complementoTres}`;
      let rep = / /g;
      let modificacionDir = this.direccion.replace(rep, "");
      let divisionDir = modificacionDir.split("#");
      if(this.complementoDos === ""){
        this.msgServ.presentToastMsg('Escriba una dirección válida', 'danger');
      }
      else if(divisionDir[1] == "-"){
        this.msgServ.presentToastMsg('Escriba una dirección válida', 'danger');
      }else{
        //console.log(`${this.documento}, ${cor}, ${cel}, ${this.id}, ${tel}, ${tipD}, ${dep}, ${bar}, ${mun}, ${this.direccion}`);
        this.uniminutoSrv.getActualizarBanner(this.documento, cor, cel, this.id, tel, tipD, dep, bar, mun, this.direccion)
        .subscribe( data => this.ngOnInit());
        this.modificar.tel = false;
        this.modificar.cel = false;
        this.modificar.cor = false;
        this.modificar.dir = false;
        this.msgServ.presentLoading('Guardando', 3000);
        this.msgServ.presentToastMsg('Datos guardados correctamente', 'success');
      }
    }
  }

}
