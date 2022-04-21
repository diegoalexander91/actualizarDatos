import { Component } from '@angular/core';
import { UniminutoService } from '../../services/uniminuto.service';
import { MessageService } from '../../services/message.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  expedicion: Date     = new Date();
  documento:  any      = '';
  correo:     string      = '';
  politica:   boolean  = false;

  constructor(
    public uniminutoSrv: UniminutoService,
    private msgServ: MessageService,
    private navCtrl: NavController
  ) {}

  fechaExpedicion(evento){
    let fecha = evento.detail.value.split("T");
    let expedir = fecha[0].split("-");
    expedir = `${expedir[2]}/${expedir[1]}/${expedir[0]}`;
    this.expedicion = expedir;
  }
  

  // Inicia funcion para atender las preguntas y respuestas a los datos personales

  seguridad(){
    
  }

  login(){

    console.log("Clic presionado con éxito, ejecutando el inicio de sesión");

    let dominio: string[] = this.correo.split("@");
    console.log(dominio); // Verificar dominio recibido
    if(this.correo === '' || dominio[1] != "uniminuto.edu.co"){
      this.msgServ.presentToastMsg('Digite el correo institucional de forma correcta', 'danger');
      return;
    }
    console.log("Primer if superado. El correo no está en blanco y el dominio está ok");

    if(this.documento === ''){
      this.msgServ.presentToastMsg('Digite el documento de forma correcta', 'danger');
      return;
    }
    console.log("Segundo if superado. La cedula no está en blanco.");
    
    if(this.politica === false){
      this.msgServ.presentToastMsg('Para continuar, debe aceptar nuestra política de tratamiento de datos.', 'danger');
      return;
    }
    console.log("Tercer if superado. Check aceptado");
    
    this.uniminutoSrv.getGraduados(this.correo)
      .subscribe( data => {
        
        if (data['Cn'] === null && data['Pager'] != this.documento){
          this.msgServ.presentToastMsg('Verifique el correo y documento', 'danger');
        }else{
          if(data['Uid'] === "" || data['Uid'] === null ){
            data['Uid'] = "Usuario no registra";
          }
          console.log(data);
          console.log(data['FirstName']);
          let informacion = btoa(`${data['FirstName']}/${data['LastName']}/${data['Pager']}/${data['Uid']}/${data['Cn']}/${data['Mail']}`);
          console.log(informacion);
          //servicio de registraduria
          // this.uniminutoSrv.getRegistraduria(this.documento)
          // .subscribe( dataR => {
          //     if(dataR['fecha'] === this.expedicion){
          this.navegar(informacion, 'dashboard');
          console.log(this.correo, this.documento);
          //     }else{
          //       this.msgServ.presentToastMsg('Verifique su fecha de expedición', 'danger');
          //     }
          //   });
        }

      });

    return;
  }

  navegar(datos, pagina: string){
    this.msgServ.presentLoading('Cargando', 1000);
    return this.navCtrl.navigateForward(`/${pagina}/${datos}`);
  }

}


  

  

  

  

  

  // onSubmitTemplate(){
  //   if( this.rol === 'grad'){
  //     this.uniminutoService.getGraduados(this.usuario.documento, this.nacimiento)
  //       .subscribe( data => {
  //         this.items = data;
  //         if(this.items['Cn'] === null){
  //           this.usuario.documento = '';
  //           this.msgToast.presentToastMsg('Documento o fecha de nacimiento incorrectos', 'danger');
  //         }else{
  //           if(this.items['Uid'] === "" || this.items['Uid'] === null ){
  //             this.items['Uid'] = "noregistra";
  //           }
  //           this.navCtrlCarnet(this.items['FirstName'], this.items['LastName'], this.items['Pager'], this.items['Descripcion'], this.items['Uid'], this.items['Cn'], this.items['Title']);
  //         }
  //       }, (err) => {
  //         this.msgToast.presentToastMsg('Documento o fecha de nacimiento incorrectos', 'danger');
  //       });
  //   }else{ 
  //     this.uniminutoService.getLdap(this.usuario.usuario, this.usuario.password, this.rol)
  //       .subscribe( data => {
  //         this.items = data;
  //         if(data['Id'] === "999"){
  //           this.msgToast.presentToastMsg('Usuario o contraseña incorrectos', 'danger');
  //         }else{
  //           this.navCtrlCarnet(this.items['FirstName'], this.items['LastName'], this.items['Pager'], this.items['Descripcion'], this.items['Uid'], this.items['Cn'], this.items['Title']);
  //         }
  //       }, (err) => {
  //         this.usuario.password = '';
  //         this.msgToast.presentToastMsg('Usuario o contraseña incorrectos', 'danger');
  //       });
  //   }
  // }

  

  // navCtrlCarnet(FirstName, LastName, Pager, Descripcion, Uid, Cn, Title){
  //   this.msgToast.presentToastPlatform('Bienvenido', 'amarilloW');
  //   this.rol = '';
  //   if(this.rol === 'grad'){
  //     this.usuario.documento = '';
  //   }else{
  //     this.usuario.usuario = '';
  //     this.usuario.password = '';
  //   }

  //   let documento = '';
  //   if(Descripcion === 'ESTUDIANTE'){
  //     documento = Cn;
  //   }else{
  //     documento = Pager;
  //   }

  //   this.uwService.getUser(documento)
  //     .subscribe( data => {

  //       setTimeout(() => {
  //         this.loading.dismiss();
  //       }, 2500);
  //       this.presentLoading('Cargando');

  //       if(data['status'] !== false){

  //         let so = '';
  //         if(this.plt.is('ios')) {
  //           so = 'ios';
  //         }else if(this.plt.is('android')) {
  //           so = 'android';
  //         }else if(this.plt.is('desktop')) {
  //           so = 'desktop';
  //         }else if(this.plt.is('pwa')) {
  //           so = 'desktop';
  //         }else if(this.plt.is('mobileweb')) {
  //           so = 'desktop';
  //         }

  //         let link = btoa(`${ FirstName }/${ LastName }/${ Pager }/${ Descripcion }/${ Uid }/${ Cn }/${ Title }`);

  //         if(so === data['plataforma']){
  //           return this.navCtrl.navigateForward(`/carnet/${ link }`);
  //         }else if(data['plataforma'] === 'desktop'){
  //           return this.navCtrl.navigateForward(`/carnet/${ link }`);
  //         }else if(so === 'desktop'){
  //           return this.navCtrl.navigateForward(`/carnet/${ link }`);
  //         }else{
  //           this.msgToast.presentToastMsg('El usuario se encuentra registrado en otro dispositivo', 'danger');
  //         }
  //       }else{
  //         let link = btoa(`${ FirstName }/${ LastName }/${ Pager }/${ Descripcion }/${ Uid }/${ Cn }/${ Title }`);
  //         return this.navCtrl.navigateForward(`/politica/${ link }`);
  //       }
  //     });
  // }

