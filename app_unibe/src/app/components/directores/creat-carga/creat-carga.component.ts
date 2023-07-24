import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from 'src/app/interfaces/materia';
import { MateriasService } from 'src/app/services/materias.service';
import { ToastrService } from 'ngx-toastr';
import { CargaAcademica, MateriasCarga } from 'src/app/interfaces/carga-academica';
import { CargasService } from 'src/app/services/cargas.service';
import { UserService } from 'src/app/services/user.service';
import { ThisReceiver } from '@angular/compiler';
import { FacturasService } from 'src/app/services/facturas.service';
import { Factura } from 'src/app/interfaces/factura';
import { catchError, finalize, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-creat-carga',
  templateUrl: './creat-carga.component.html',
  styleUrls: ['./creat-carga.component.scss']
})
export class CreatCargaComponent implements OnInit {
  titulo = 'Crear Carga'
  actualizarCarga=false
  idCarga: number | null
  nombreEst = ''
  cargaCreada = false
  ciEstudiante = ''
  fecha = ''
  periodo = ''
  modalidad = ''
  cargando = false
  sourceMateria!: Materia[]
  targetMateria!: Materia[]
  subtotal = 0
prueba:any[]=[]
  guardarcargaFactura() {
    if (this.targetMateria.length > 6 || this.targetMateria.length < 5 &&  this.actualizarCarga==false ) {
      this.toastr.error('No se puede seleccionar más de 6 materias', 'Error');
      this.targetMateria = [];
      this.getMaterias()

      return;
    }
    if(this.actualizarCarga==false){
      this.obtenerObjetosMateria()
      this.factura()
      localStorage.removeItem('idC')
      this.router.navigate(['/listaEstudiante']);
    }
    if(this.actualizarCarga==true){
     this.actualizarMaterias()
     this.router.navigate(['/listaEstudiante']);
    }
    
    

  }

  actualizarMaterias() {
   this.cServices.getMateriascarga(this.idCarga??0).subscribe((data:any[])=>{
    this.prueba=data
    console.log('eSTAS SON LAS MATERIAS'+this.prueba)
   })

  }
  

  getMaterias() {
    this.mServies.getMaterias().subscribe((data: Materia[]) => {
      this.sourceMateria = data
      this.targetMateria = []
      this.cdr.markForCheck()
      console.log(this.targetMateria)
    })

  }
  siguiente() {
    if (this.ciEstudiante == '' || this.fecha == '' || this.periodo == '' || this.modalidad == '') {
      this.toastr.error('Todos los campos son obligatorios !', 'Upps Error!');
    } else {
      const carga: CargaAcademica = {
        ciEstudiante: this.ciEstudiante,
        fecha: this.fecha,
        periodo: this.periodo,
        modalidad: this.modalidad
      }
      this.cargando = true
      this.cServices.NuevaCarga(carga).subscribe({
        next: (v) => {
          const Idcarga = v.cargaid
          localStorage.setItem('idC', Idcarga)
          this.cargando = false;
          this.toastr.success(`Porfavor selecciones las materias`, 'Carga Academica');
          this.cargaCreada = true
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
  obtenerObjetosMateria() {
    if (this.targetMateria.length > 6) {
      this.toastr.error('No se puede seleccionar más de 6 materias', 'Error');
      this.targetMateria = [];
      this.getMaterias()

      return;
    }
    if (this.targetMateria.length >= 1) {
      const materia1: Materia = this.targetMateria[0];
      const idCargaStr = (localStorage.getItem('idC'));
      const idCarga = idCargaStr !== null ? +idCargaStr : 0;
      const creditos = +materia1.creditos
      const valorCreditos = +materia1.valorCredito
      const mateia=materia1.nombre
      const totalMateria = creditos * valorCreditos
      this.subtotal = this.subtotal + totalMateria

      const detalleCarga1: MateriasCarga = {
        idCarga: idCarga,
        idMateria: materia1.id,
        materia:mateia,
        totalMateria: totalMateria
      }


      console.log(detalleCarga1)

      this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
        next: (v) => {
          this.toastr.success('Exito');
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

    if (this.targetMateria.length >= 2) {
      const materia2: Materia = this.targetMateria[1];
      const idCargaStr = (localStorage.getItem('idC'));
      const idCarga = idCargaStr !== null ? +idCargaStr : 0;
      const creditos = +materia2.creditos
      const valorCreditos = +materia2.valorCredito
      const materia=materia2.nombre
      const totalMateria = creditos * valorCreditos
      this.subtotal = this.subtotal + totalMateria
      const detalleCarga: MateriasCarga = {
        idCarga: idCarga,
        idMateria: materia2.id,
        materia:materia,
        totalMateria: totalMateria
      }


      console.log(detalleCarga)

      this.cServices.MateriasIntoCargas(detalleCarga).subscribe({
        next: (v) => {
          this.toastr.success('Exito');
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

    if (this.targetMateria.length >= 3) {
      const materia3: Materia = this.targetMateria[2];
      const idCargaStr = (localStorage.getItem('idC'));
      const idCarga = idCargaStr !== null ? +idCargaStr : 0;
      const creditos = +materia3.creditos
      const valorCreditos = +materia3.valorCredito
      const materia=materia3.nombre
      const totalMateria = creditos * valorCreditos
      this.subtotal = this.subtotal + totalMateria

      const detalleCarga: MateriasCarga = {
        idCarga: idCarga,
        idMateria: materia3.id,
        materia:materia,
        totalMateria: totalMateria
      }


      console.log(detalleCarga)

      this.cServices.MateriasIntoCargas(detalleCarga).subscribe({
        next: (v) => {
          this.toastr.success('Exito');
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

    if (this.targetMateria.length >= 4) {
      const materia4: Materia = this.targetMateria[3];
      const idCargaStr = (localStorage.getItem('idC'));
      const idCarga = idCargaStr !== null ? +idCargaStr : 0;
      const creditos = +materia4.creditos
      const valorCreditos = +materia4.valorCredito
      const materia=materia4.nombre
      const totalMateria = creditos * valorCreditos
      this.subtotal = this.subtotal + totalMateria
      const detalleCarga: MateriasCarga = {
        idCarga: idCarga,
        idMateria: materia4.id,
        materia:materia,
        totalMateria: totalMateria
      }


      console.log(detalleCarga)

      this.cServices.MateriasIntoCargas(detalleCarga).subscribe({
        next: (v) => {
          this.toastr.success('Exito');
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

    if (this.targetMateria.length >= 5) {
      const materia5: Materia = this.targetMateria[4];
      const idCargaStr = (localStorage.getItem('idC'));
      const idCarga = idCargaStr !== null ? +idCargaStr : 0;
      const creditos = +materia5.creditos
      const valorCreditos = +materia5.valorCredito
      const materia=materia5.nombre
      const totalMateria = creditos * valorCreditos
      this.subtotal = this.subtotal + totalMateria
      const detalleCarga: MateriasCarga = {
        idCarga: idCarga,
        idMateria: materia5.id,
        materia:materia,
        totalMateria: totalMateria
      }


      console.log(detalleCarga)

      this.cServices.MateriasIntoCargas(detalleCarga).subscribe({
        next: (v) => {
          this.toastr.success('Exito');
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

    if (this.targetMateria.length >= 6) {
      const materia6: Materia = this.targetMateria[5];
      const idCargaStr = (localStorage.getItem('idC'));
      const idCarga = idCargaStr !== null ? +idCargaStr : 0;
      const creditos = +materia6.creditos
      const valorCreditos = +materia6.valorCredito
      const materia=materia6.nombre
      const totalMateria = creditos * valorCreditos
      this.subtotal = this.subtotal + totalMateria
      const detalleCarga: MateriasCarga = {
        idCarga: idCarga,
        idMateria: materia6.id,
        materia:materia,
        totalMateria: totalMateria
      }


      console.log(detalleCarga)

      this.cServices.MateriasIntoCargas(detalleCarga).subscribe({
        next: (v) => {
          this.toastr.success('Exito');
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
  factura() {
    const idCargaStr = localStorage.getItem('idC');
    const idCarga = idCargaStr !== null ? +idCargaStr : 0;

    this.uServices.getUser(this.ciEstudiante).subscribe(data => {
      this.nombreEst = data.nombres;

      const factura: Factura = {
        ci: this.ciEstudiante,
        nombre: this.nombreEst,
        Fecha: new Date().toLocaleDateString(),
        Razon: 'Carga Academica',
        idRazon: idCarga,
        pagado: false,
        descuentoBeca: 0,
        subtotal: this.subtotal,
        total: this.subtotal
      };

      this.fservices.NuevaFactura(factura).subscribe({
        next: (v) => {
          this.cargando = false;
          this.toastr.success(`Factura Creada`, 'Factura creada');
        }, error: (e: HttpErrorResponse) => {
          this.cargando = false;
          if (e.error.msg) {
            this.toastr.error(e.error.msg, 'Error');
          } else {
            this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
          }
        }
      });
    });
  }

  getCargaForUpdate(id: number) {
    this.cargando = true
    this.cServices.getCarga(id).subscribe((data: CargaAcademica) => {
      console.log(data)
      this.idCarga=data.id??0
      this.ciEstudiante = data.ciEstudiante
      this.fecha = data.fecha
      this.periodo = data.periodo
      this.modalidad = data.modalidad
    })


  }
  updateCarga() {
    const carga: CargaAcademica = {
      fecha: this.fecha,
      ciEstudiante: this.ciEstudiante,
      modalidad: this.modalidad,
      periodo: this.periodo
    };
    this.cServices.actualizarC(this.idCarga ?? 0, carga).subscribe(
      () => {
     
        this.toastr.info('Actualice las materias', 'Exito');
        this.actualizarMaterias()
      },
      (error: HttpErrorResponse) => {

        if (error.error.msg) {
          this.toastr.error(error.error.msg, 'Error');
        } else {
          this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
        }
      }
    );
  }


  actualizarCrear() {
    if (this.idCarga !== null && this.idCarga !== 0) {
      this.updateCarga()
      this.actualizarCarga=true
      this.cargaCreada = true
    }else{
      this.siguiente()
    }
  }
  constructor(private uServices: UserService, private fservices: FacturasService, private mServies: MateriasService, private cdr: ChangeDetectorRef, private toastr: ToastrService, private cServices: CargasService, private router: Router, private aRoute: ActivatedRoute) {
    this.ciEstudiante = String(aRoute.snapshot.paramMap.get('cedula'))
    const idParam = aRoute.snapshot.paramMap.get('id');
    this.idCarga = idParam !== null ? +idParam : null;
    console.log(this.idCarga)

  }
  ngOnInit() {
    this.fecha = new Date().toLocaleDateString()
    this.getMaterias()
    if (this.idCarga !== null && this.idCarga !== 0) {
      this.actualizarCarga==true
      this.titulo = 'Editar carga'
      this.getCargaForUpdate(this.idCarga);
      
    }
  }

}
