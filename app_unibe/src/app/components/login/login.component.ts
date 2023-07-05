import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


interface credenciales {
  correo: string,
  clave:string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  correo:string=''
  clave:string=''

  constructor(private toastr: ToastrService,private uServices:UserService, private router: Router){}
  ngOnInit():void{}

  iniciar(){
    if(this.correo==''||this.clave==''){
      this.toastr.error('Todos los campos son obligatorios !', 'Upps Error!');
    }
  const credenciales:credenciales={
    correo:this.correo,
    clave:this.clave
  }

  this.uServices.login(credenciales).subscribe({
    next:(data)=>{
      console.log(data)
      this.router.navigate(['/home'])
      localStorage.setItem('TOKEN', data)
    }
  })
  
  }

}
