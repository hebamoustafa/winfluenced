import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';


@Injectable()
export class ReportsService {

    constructor(private httpClient: HttpClient) {
    }

    getCompaignReport(startDate: number, endDate: number): Promise<any> {
        return new Promise((resolve, reject) => {           
            this.httpClient.get(environment.apiURL + 'compaign-summary?startDate=' + startDate + '&endDate=' + endDate )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getConversionReport(startDate: number, endDate: number): Promise<any> {
        return new Promise((resolve, reject) => {          
            this.httpClient.get(environment.apiURL + 'event-conversion?startDate=' + startDate + '&endDate=' + endDate)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getOrderReport(start_date: string, end_date: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = 'http://panel.winfluenced.com/api/1/reports.asmx/OrderDetails?api_key=SBk19sWfJyeAJwSYmquWfQ&start_date=' + start_date + '&end_date=' + end_date + '&affiliate_id=0&conversion_id=0&order_id=&start_at_row=0&row_limit=10000&sort_field=conversion_id&sort_descending=true';
            this.httpClient.post(environment.apiURL + 'cake-integration', {
                'url': url
            }, { responseType: 'text' })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

}
