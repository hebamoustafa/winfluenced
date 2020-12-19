import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service'
import { environment } from './../../../environments/environment';



@Injectable()
export class DeeplinkService {

    constructor(private httpClient: HttpClient, 
        private storageService: StorageService) {
        // Set the defaults        
    }

    getShorterLink(url: string): Promise<any> {

       const currentUser = JSON.parse(this.storageService.getCurrentUser());          
        let affiliate_id = 0;     

        if (currentUser.role_id !== null && currentUser.role_id === 6) {
            affiliate_id = currentUser.company_id || 0;
        } 
      
        return new Promise((resolve, reject) => {          
            this.httpClient.get(environment.apiURL + 'deeplink?affiliate_id=' + affiliate_id + '&url=' + url)
                .subscribe((response: any) => {                                   
                    resolve(response);
                }, reject);
        });
    }

}