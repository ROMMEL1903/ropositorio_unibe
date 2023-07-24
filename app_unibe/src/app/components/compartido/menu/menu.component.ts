import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  superU=false
  director=false
  finaciero=false
  estudiante=false

  itemsSuperU: MenuItem[] | undefined;
  itemsDirector:MenuItem[]| undefined
  itemsEstudiante:MenuItem[]|undefined


  constructor(private reuter: Router){
    if(localStorage.getItem('ROL')==='Super Usuario'){
      this.superU=true
    }

    if(localStorage.getItem('ROL')==='Director'){
      this.director=true
    }

    if(localStorage.getItem('ROL')==='Estudiante'){
      this.estudiante=true
    }

  }
  
  ngOnInit() {
    this.itemsSuperU = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink:'/home'

      },
      {
        label: 'Materias',
        icon: 'pi pi-fw pi-folder',
        items: [
          {
            label: 'Crear',
            icon: 'pi pi-fw pi-plus',
            routerLink:'/nuevaMateria'
          },
          {
            label: 'Ver',
            icon: 'pi pi-fw pi-folder-open',
            routerLink:'/ListaMaterias'
        
          }
        ]
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Crear',
            icon: 'pi pi-fw pi-user-plus',
            routerLink:'/crear'
          },
          {
            label: 'Listado',
            icon: 'pi pi-fw pi-users',
            routerLink:'/listaUsers'
          }
        ]
      },
      {
        label: 'Cargas Academicas',
        icon: 'pi pi-fw pi-bars',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      }
    ];


    this.itemsDirector=[
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink:'/home'

      },
      {
        label: 'Estudiantes',
        icon: 'pi pi-fw pi-id-card',
        items: [
          {
            label: 'Crear',
            icon: 'pi pi-fw pi-user-plus',
            routerLink:'/CrearEstudiante'
          },
          {
            label: 'Ver',
            icon: 'pi pi-fw pi-users',
            routerLink:'/listaEstudiante'
        
          }
        ]
      },
      {
        label: 'Matriculas',
        icon: 'pi pi-fw pi-folder',
        routerLink:'/listaMatriculas'
      },
      {
        label: 'Cargas Academicas',
        icon: 'pi pi-fw pi-table',
        routerLink:'/listaCargas'
       }
    ]

    this.itemsEstudiante=[
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink:'/home'

      },
      {
        label: 'Pagos',
        icon: 'pi pi-fw pi-dollar',
        items: [
          {
            label: 'Historial',
            icon: 'pi pi-fw pi-history',
            routerLink:'/CrearEstudiante'
          },
          {
            label: 'Pendientes',
            icon: 'pi pi-fw pi-clock',
            routerLink:'/listaEstudiante'
        
          }
        ]
        

      },
    ]

  
  }

  salir(){
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('ROL')
    localStorage.removeItem('ESCUELA')
    this.reuter.navigate(['/login'])
  }

}
