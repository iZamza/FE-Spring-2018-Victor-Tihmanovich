import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivateRouteSnaphot, RouterStateSnapshot } from '@angular/router';

@Injectable ({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(route: ActivateRouteSnaphot, state: RouterStateSnapshot){
		if (localStorage.getItem('currentUser')){
			return true;
		}

		this.router.navigate(['/'], { queryParams: {returnUrl: state.url}});
	}
}