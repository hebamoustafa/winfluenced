import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from './../../environments/environment';


@Injectable()
export class CouponsService {

    selectedOffer: any | null;
    onSelectedOfferChanged: BehaviorSubject<any>;

    constructor(private httpClient: HttpClient) {
        this.onSelectedOfferChanged = new BehaviorSubject({});
    }

    //// Offer Details API
    getOffers(): Promise<any> {
        return new Promise((resolve, reject) => {           
            this.httpClient.get(environment.apiURL + 'offers')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getOfferById(offer_id: string): Promise<any> {
        return new Promise((resolve, reject) => {           
            this.httpClient.get(environment.apiURL + 'offers?offer_id=' + offer_id)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    
   setSelectedOffer(offer: any | null) {
       this.selectedOffer  = offer;
       this.onSelectedOfferChanged.next(this.selectedOffer);
   }
   
}
