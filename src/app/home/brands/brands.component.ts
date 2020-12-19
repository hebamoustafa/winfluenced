import { Component, OnInit } from "@angular/core";
import { HomeService } from './../home.service';
import * as moment from 'moment';
import { Router } from "@angular/router";

@Component({
    selector: "dashboard-brands",
    templateUrl: "./brands.component.html",
    styleUrls: ['brands.component.css'],
})

export class BrandsComponent implements OnInit {
    
    public offerList: any[] = [];
    
    constructor(private homeService: HomeService, 
              private router: Router) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
       
        this.getOffersData();

    }

    getOffersData(): void {

        this.homeService.getOffers()
          .then((response: any) => {    
          
            if (response.offer_export_response.success === true || response.offer_export_response.success === 'true') {
                   
              if (response.offer_export_response.offers.offer !== null && response.offer_export_response.offers.offer !== undefined) {
                this.offerList = response.offer_export_response.offers.offer || [];  
                
                if (this.offerList.length >= 15)
                {
                  this.offerList = this.offerList.slice(0, 15);
                }               
              }
    
            }
            // else {
            //   this.snackBar.open(response.offer_export_response.message || 'An error occurred while getting data.', 'close', {
            //     duration: 3000
            //   });
            // }
          })
          .catch(() => {
            // this.snackBar.open('An error occurred while getting clicks', 'close', {
            //   duration: 3000
            // });
          });  
    
    }

    getPercentage(offer_contract_info: any): string {       

        if ( offer_contract_info === null || offer_contract_info === undefined)
        {
            return '';
        }

        if (offer_contract_info.length > 0)
        {
       
            const item = offer_contract_info.filter(x => {
                return x.offer_contract_name === 'Sale' || x.offer_contract_name === 'sale';
             })[0];
     
             if ( item !== null && item !== undefined)
             {
                return item.current_payout.formatted_amount;
                // payouts.payout.payout_amount.formatted_amount;
             }  
             else {
                 return  '';
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
    
    public onItemTap(args: any) {
        const itemData = args.view.bindingContext
       this.router.navigate(['/coupons/detail/' + itemData.offer_id ]);

  }
}
