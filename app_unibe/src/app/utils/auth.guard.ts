import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)

  const token =localStorage.getItem('TOKEN')
  if(token==undefined){
    router.navigate(['/login'])
    return false;
  
   
  }
  return true;
};
