import { CanActivateFn,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CatServiceService } from '../shared/cat-service.service';


export const catGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router = inject(Router)
  const data:CatServiceService = inject(CatServiceService)
  if(data.isMatchFound==true){
    return true
  }else{
    return router.parseUrl('/error');
  }
  
};
