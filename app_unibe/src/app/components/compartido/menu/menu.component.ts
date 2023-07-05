import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;


  constructor(private reuter: Router){
  }
  ngOnInit() {
    this.items = [
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
            icon: 'pi pi-fw pi-plus'
          },
          {
            label: 'Ver',
            icon: 'pi pi-fw pi-folder-open'
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
            icon: 'pi pi-fw pi-users'
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
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
      }
    ];
  }

}
