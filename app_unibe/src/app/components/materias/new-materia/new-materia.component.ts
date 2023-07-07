import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Materia } from 'src/app/interfaces/materia';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-new-materia',
  templateUrl: './new-materia.component.html',
  styleUrls: ['./new-materia.component.scss']
})
export class NewMateriaComponent implements OnInit {
  cargando: boolean = false
  nombre = ''
  abreviatura = ''
  creditos = ''
  valorCredito = ''
  idUpdate:number=0
  titulo='Crear Materia'
  tituloB='Guardar'
  constructor(private toastr: ToastrService,private mservices: MateriasService, private router: Router, private aRouter: ActivatedRoute) {
    this.idUpdate=Number(aRouter.snapshot.paramMap.get('id'))
  }

  ngOnInit() {
    if(this.idUpdate!=0){
      this.titulo='Editar Materia'
      this.tituloB='Editar'
      this.getMateria(this.idUpdate)

    }
   }


   guardarActualizar(){
    if(this.idUpdate!=0){
      this.updateMateria()
    }else{
      this.guardar()
    }
   }


  guardar() {
    if (this.nombre == '' || this.abreviatura == '' || this.creditos == '' || this.valorCredito == '') {
      this.toastr.error('Todos los campos son obligatorios !', 'Upps Error!');
    } else {
      const materia: Materia = {
        nombre: this.nombre,
        abreviatura: this.abreviatura,
        creditos: parseInt(this.creditos), 
        valorCredito: parseFloat(this.valorCredito)

      }

      this.cargando = true
      
      this.mservices.NuevaMateia(materia).subscribe({ 
        next: (v) => {
          this.cargando = false;
          this.toastr.success(`La materia ${this.nombre} fue registrada con exito`, 'Materia creada');
          this.router.navigate(['/ListaMaterias']);
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

  getMateria(id:number){
    this.cargando=true
    this.mservices.getMateria(id).subscribe((data:Materia)=>{
     console.log(data)
     this.cargando=false
     this.nombre=data.nombre
     this.abreviatura=data.abreviatura
     this.creditos= data.creditos.toString()
     this.valorCredito=data.valorCredito.toString()
    })
 }


 updateMateria() {
  const materia: Materia = {
    nombre: this.nombre,
   abreviatura : this.abreviatura,
   creditos: parseInt(this.creditos),
    valorCredito:parseInt(this.valorCredito)
  };

  this.cargando = true;

  this.mservices.actualizarM(this.idUpdate, materia).subscribe(
    () => {
      this.toastr.info('La Materia fue actualizada con éxito', 'Materia actualizada');
      this.cargando = false;
      this.router.navigate(['/ListaMaterias']);
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
