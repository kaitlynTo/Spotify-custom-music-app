import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate {

  // Initialization

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  // Methods

  canActivate(): boolean {

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
