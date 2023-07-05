import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';




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
  cargando= false
  value = ''
  cedula = ''
  nombres = ''
  correo = ''
  clave = ''


  escuelas: Escuela[] | undefined
  selectescuela: Escuela | undefined
  roles: Rol[] | undefined
  selectRol: Rol | undefined
  constructor(private toastr: ToastrService,private uServices:UserService, private router: Router) {

  }

  ngOnInit() {
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
  
      this.uServices.singIn(usuario).subscribe(data=>{
        this.cargando=false
        this.toastr.success('El usuario se registro exitosamente !', 'Bien!!!');
        this.router.navigate(['/home'])
      }, (event: HttpErrorResponse) =>{
        this.cargando=false
        if(event.error.msg){
          this.toastr.error(event.error.msg, 'Upps Error!');
          
        }else{
          this.toastr.error('Ocurrio un error comuniquese con el administrador', 'Upps Error!');
        }
       
      })

    }

  
    
  }
}
