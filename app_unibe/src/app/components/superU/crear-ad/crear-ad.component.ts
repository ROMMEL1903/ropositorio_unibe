import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';




interface Rol {
  name: string;
}

interface Escuela {
  name: string
}

@Component({
  selector: 'app-crear-ad',
  templateUrl: './crear-ad.component.html',
  styleUrls: ['./crear-ad.component.scss'],
})
export class CrearAdComponent implements OnInit {
  titulo:string='Crear Usuario'
  tituloB:string='Guardar'
  cargando= false
  value = ''
  cedula = ''
  nombres = ''
  correo = ''
  clave = ''
  priemerI!:boolean

  ci:string=''

  escuelas: Escuela[] | undefined
  selectescuela: Escuela | undefined
  roles: Rol[] | undefined
  selectRol: Rol | undefined
  constructor(private toastr: ToastrService,private uServices:UserService, private router: Router,private aRoute:ActivatedRoute) {
   
    this.ci=String(aRoute.snapshot.paramMap.get('cedula'))
  }

  ngOnInit() {

    if(this.ci!='null'){
      this.titulo='Editar Usuario'
      this.tituloB='Editar'
      this.getUsuario(this.ci)

    }
    this.roles = [
      { name: ' Super Usuario' },
      { name: 'Director', },
      { name: 'Financiero', }
    ];
    this.escuelas = [
      { name: 'Software' },
      { name: 'Enfermeria' },
      { name: 'Derecho' },
      { name: 'Fisioterapia' },
      { name: 'Economia' },
    ];

  }


  guaradActualizar(){
    if(this.ci!='null'){
      this.updateU()
    }else{
      this.guardar()
    }
    
  }
 
  guardar() {
    if (this.nombres == '' || this.correo == '' || this.cedula == '' || this.clave == '' || this.selectescuela==undefined || this.selectescuela==undefined) {
      this.toastr.error('Todos los campos son obligatorios !', 'Upps Error!');
    }else{
      const usuario:Usuario={
        cedula: this.cedula,
        nombres: this.nombres,
        rol: this.selectRol?.name ?? 'null',
        escuela:  this.selectescuela?.name ?? 'null' ,
        correo: this.correo,
        clave: this.clave,
        primer_Inicio: true,
  
      }
  
      this.cargando=true
  
      this.uServices.singIn(usuario).subscribe({ 
        next: (v) => {
          this.cargando = false;
          this.toastr.success(`El usuario ${this.cedula} fue registrado con exito`, 'Usuario registrado');
          this.router.navigate(['/listaUsers']);
        }, error: (e: HttpErrorResponse) => {
          this.cargando = false;
          if (e.error.msg) {
            this.toastr.error(e.error.msg, 'Error');
          } else {
            this.toastr.error('Upps ocurrio un error, comuniquese con el administrador', 'Error');
          }
        
        }
      })

    }

  
    
  }


  getUsuario(cedula:string){
     this.cargando=true
     this.uServices.getUser(cedula).subscribe((data:Usuario)=>{
      console.log(data)
      this.cargando=false
      this.cedula=data.cedula
      this.selectRol={name:data.rol}
      this.selectescuela={name:data.escuela}
      this.nombres=data.nombres
      this.correo=data.correo
      this.clave=data.clave
      this.priemerI=data.primer_Inicio
     })
  }

  updateU() {
    const usuario: Usuario = {
      cedula: this.cedula,
      nombres: this.nombres,
      rol: this.selectRol?.name ?? 'null',
      escuela: this.selectescuela?.name ?? 'null',
      correo: this.correo,
      clave: this.clave,
      primer_Inicio: this.priemerI
    };
  
    this.cargando = true;
  
    this.uServices.actualizarU(this.ci, usuario).subscribe(
      () => {
        this.toastr.info('El Usuario fue actualizado con éxito', 'Usuario actualizado');
        this.cargando = false;
        this.router.navigate(['/listaUsers']);
      },
      (error: HttpErrorResponse) => {
        this.cargando = false;
        if (error.error.msg) {
          this.toastr.error(error.error.msg, 'Error');
        } else {
          this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
        }
      }
    );
  }
}
