import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';


@Injectable()
export class HomeService {

    constructor(private httpClient: HttpClient) {
    }

    getCompaignSummary(startDate: number, endDate: number): Promise<any> {
        return new Promise((resolve, reject) => {           
            this.httpClient.get(environment.apiURL + 'compaign-summary?startDate=' + startDate + '&endDate=' + endDate )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    //// A2.2 - Compaign/ Offer Percentage API
    getOffers(): Promise<any> {
        return new Promise((resolve, reject) => {          
            this.httpClient.get(environment.apiURL + 'offers')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getNews(): Promise<any> {
        return new Promise((resolve, reject) => {          
            this.httpClient.get(environment.apiURL + 'news')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


}
