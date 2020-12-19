import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from './../services/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private storageService: StorageService,

    ) { }

    // tslint:disable-next-line:typedef
    canActivate() {
        if (this.storageService.isLoggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }


}
