import { Component, OnInit } from "@angular/core";
import { CouponsService } from './coupons.service';
import * as moment from 'moment';
import { Router } from "@angular/router";

@Component({
    selector: "coupons",
    templateUrl: "./coupons.component.html",
    styleUrls: ['./coupons.component.css']
})

export class CouponsComponent implements OnInit {
    
    public offerList: any[] = [];
    loading = false;
    
    constructor(private couponsService: CouponsService, 
        private router: Router) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        
        // Use the "ngOnInit" handler to initialize data for the view. 
        
        this.getOffersData();
        
    }

    getOffersData(): void {

        this.loading = true;
        this.couponsService.getOffers()
            .then((response: any) => {

                this.loading = false;

                if (response.offer_export_response.success === true || response.offer_export_response.success === 'true') {

                    if (response.offer_export_response.offers.offer !== null && response.offer_export_response.offers.offer !== undefined) {
                        this.offerList = response.offer_export_response.offers.offer || [];                       
                    }

                }
                // else {
                //     this.snackBar.open(response.offer_export_response.message || 'An error occurred while getting data.', 'close', {
                //         duration: 3000
                //     });
                // }
            })
            .catch(() => {
                
                this.loading = false;
                // this.snackBar.open('An error occurred while getting clicks', 'close', {
                //     duration: 3000
                // });
            });



    }

    getPercentage(offer_contract_info: any): string {

        if (offer_contract_info === null || offer_contract_info === undefined) {
            return '';
        }

        if (offer_contract_info.length > 0) {

            const item = offer_contract_info.filter(x => {
                return x.offer_contract_name === 'Sale' || x.offer_contract_name === 'sale';
            })[0];

            if (item !== null && item !== undefined) {
                return item.current_payout.formatted_amount;
                // payouts.payout.payout_amount.formatted_amount;
            }
            else {
                return '';
            }

        }
        else {
            return offer_contract_info.current_payout.formatted_amount;
        }

        return '';

    }

    getTimeFrom(dateCreated: any): string {

        return moment(dateCreated).fromNow();

        return '';
    }

    getOfferUrl(offer_contract_info: any): string {

        if (offer_contract_info === null || offer_contract_info === undefined) {
            return '';
        }

        if (offer_contract_info.length > 0) {

            const item = offer_contract_info.filter(x => {
                return x.offer_contract_name === 'Sale' || x.offer_contract_name === 'sale';
            })[0];

            if (item !== null && item !== undefined) {
                return item.offer_link;
            }
            else {
                return '';
            }

        }
        else {
            return offer_contract_info.offer_link;
        }

        return '';

    }


    onBrandWebsiteTap(offer_contract_info: any): void {

        const url = this.getOfferUrl(offer_contract_info);
      
        if (url === null || url === undefined || url === '') {
            return;
        }
        else {
            // offer_link
            this.router.navigate(['/coupons/brand-website'], { queryParams: { offer_link: url } });

        }

    }


    public onItemTap(args: any) {
         const itemData = args.view.bindingContext

         // this.couponsService.setSelectedOffer(itemData);       
        this.router.navigate(['/coupons/detail']);

    }

}
