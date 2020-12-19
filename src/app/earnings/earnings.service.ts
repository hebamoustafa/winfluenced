import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';


@Injectable()
export class EarningsService {

    constructor(private httpClient: HttpClient) {
    }

    getEarnings(startDate: number, endDate: number): Promise<any> {
        return new Promise((resolve, reject) => {
           
            this.httpClient.get(environment.apiURL + 'compaign-summary?startDate=' + startDate + '&endDate=' + endDate )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getYearToDatePaid(): Promise<any> {
        return new Promise((resolve, reject) => {           
            this.httpClient.get(environment.apiURL + 'affiliate/bills')
                .subscribe((response: any) => {                  
                    resolve(response);
                }, reject);
        });
    }

}
