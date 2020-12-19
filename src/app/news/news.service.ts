import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from '../shared/services/storage.service';

@Injectable()
export class NewsService {

    constructor(private httpClient: HttpClient, 
                private storageService: StorageService) {
    }

  
    getNews(): Promise<any> {
        return new Promise((resolve, reject) => {          
            this.httpClient.get(environment.apiURL + 'news')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getNewsbyId(id: string): Promise<any> {
        return new Promise((resolve, reject) => {          
            this.httpClient.get(environment.apiURL + 'news?id=' + id )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


}
