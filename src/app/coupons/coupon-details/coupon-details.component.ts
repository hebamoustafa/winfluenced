import { Component, OnInit } from "@angular/core";
import { CouponsService } from './../coupons.service';
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as moment from 'moment';
import { RouterExtensions } from "@nativescript/angular";
// import * as utils from "@nativescript/core";

@Component({
    selector: "coupons-details",
    templateUrl: "./coupon-details.component.html",
    styleUrls: ['./coupon-details.component.css']
})

export class CouponDetailsComponent implements OnInit {

    public offer: any | null;

    constructor(private couponsService: CouponsService,
        private router: Router,
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {

        // Use the "ngOnInit" handler to initialize data for the view.  

        this.route.params
            .subscribe(
                (params: Params) => {
                    // tslint:disable-next-line: no-string-literal
                    const id = params['id'];

                    if (id !== null && id !== undefined && id !== '') {
                        this.getOffer(id);
                    }
                });

        //  this.offer =  this.couponsService.selectedOffer; 

    }

    getOffer(id: string): void {

        this.couponsService.getOfferById(id)
            .then((response: any) => {
                if (response.offer_export_response.success === true || response.offer_export_response.success === 'true') {

                    if (response.offer_export_response.offers.offer !== null && response.offer_export_response.offers.offer !== undefined) {
                        this.offer = response.offer_export_response.offers.offer || null;
                    }

                }
            });

    }

    public getPercentage(): string {

        if (this.offer.offer_contracts.offer_contract_info === null || this.offer.offer_contracts.offer_contract_info === undefined) {
            return '';
        }

        if (this.offer.offer_contracts.offer_contract_info.length > 0) {

            const item = this.offer.offer_contracts.offer_contract_info.filter(x => {
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
            return this.offer.offer_contracts.offer_contract_info.current_payout.formatted_amount;
        }

        return '';

    }

    public getOfferUrl(): string {

        if (this.offer.offer_contracts.offer_contract_info === null || this.offer.offer_contracts.offer_contract_info === undefined) {
            return '';
        }

        if (this.offer.offer_contracts.offer_contract_info.length > 0) {

            const item = this.offer.offer_contracts.offer_contract_info.filter(x => {
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
            return this.offer.offer_contracts.offer_contract_info.offer_link;
        }

        return '';

    }

    onBackButtonTap(): void {

        this.routerExtensions.back();

        // this.router.navigate(['/coupons']);
    }

    onBrandWebsiteTap(): void {

        const url = this.getOfferUrl();

        if (url === null || url === undefined || url === '') {
            return;
        }
        else {
            // offer_link
            this.router.navigate(['/coupons/brand-website'], { queryParams: { offer_link: url } });

        }

    }

}
