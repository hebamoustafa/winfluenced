import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { StorageService } from './../shared/services/storage.service';

@Injectable()
export class MyAccountService {

    constructor(private httpClient: HttpClient, 
                private storageService: StorageService) {
    }

    getAccountDetail(): Promise<any> {

        const currentUser = JSON.parse(this.storageService.getCurrentUser());          
        let affiliate_id = 0;     

        if (currentUser.role_id !== null && currentUser.role_id === 6) {
            affiliate_id = currentUser.company_id || 0;
        } 

        return new Promise((resolve, reject) => {            
            this.httpClient.get(environment.apiURL + 'account?affiliate_id=' + affiliate_id)
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
}
