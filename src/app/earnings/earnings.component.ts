import { Component, OnInit } from "@angular/core";
import * as moment from 'moment';
import { EarningsService } from './earnings.service';
import { StorageService } from './../shared/services/storage.service';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: "earnings",
    templateUrl: "./earnings.component.html",
    styleUrls: ["./earnings.component.css"]
})

export class EarningsComponent implements OnInit {

    _pending: number = 0;
    public pending: string = '0';

    _approved: number = 0;
   public approved: string = '0';

    _yearToDatePaid: number = 0;
    public yearToDatePaid: string = '0';

    _nextPayment: number = 0;
    public nextPayment: string = '0';

    currencySymbol: string = '';

    loading = false;

    constructor(private earningsService: EarningsService,
        private storageService: StorageService,
        private decimalPipe: DecimalPipe) {
    }

    ngOnInit(): void {

        //// force full logout for testing.
        //// this.storageService.setCurrentUser('');     
        
        const startDate = moment().startOf('month'); // first day of month
        const endDate = moment(); // now

        const _startDate = Math.floor(moment(startDate, 'YYYY-MM-DD').valueOf() / 1000 || 0);
        const _endDate = Math.floor(moment(endDate, 'YYYY-MM-DD').valueOf() / 1000 || 0);

        this.getEarningDetail(_startDate, _endDate);

        this.getYearToDatePaidDetail();

    }

    getEarningDetail(startDate: number, endDate: number): void {

        this.loading = true;

        const currentUser = JSON.parse(this.storageService.getCurrentUser());
        let affiliate_id = 0;

        if (currentUser.role_id !== null && currentUser.role_id === 6) {
            affiliate_id = currentUser.company_id || 0;
        }

        this.earningsService.getEarnings(startDate, endDate)
            .then((response: any) => {
                 this.loading = false;

                if (response.data !== null && response.data !== undefined) {

                    const parsedList = response.data.map(x => {
                        return x.fields;
                    }) || [];

                    let summaryList = [].concat(...parsedList) || [];

                    if (affiliate_id > 0) {
                        summaryList = summaryList.slice().filter(x => {
                            return x.source_affiliate.source_affiliate_id === affiliate_id;
                        }) || [];
                    }

                    if (summaryList !== null && summaryList.length > 0) {
                        this._pending = (summaryList.reduce((acc, val) => acc += Number(val.pending), 0)) || 0;
                        this.pending = this.decimalPipe.transform(this._pending, '1.0-2');

                        this._approved = (summaryList.reduce((acc, val) => acc += Number(val.approved), 0)) || 0;
                        this.approved = this.decimalPipe.transform(this._approved, '1.0-2');

                    }
                    else {
                        this._pending = 0;
                        this.pending = this.decimalPipe.transform(this._pending, '1.0-2');

                        this._approved = 0;
                        this.approved = this.decimalPipe.transform(this._approved, '1.0-2');

                    }
                }

            })
            .catch(() => {
                 this.loading = false;
                // this.snackBar.open('An error occurred while getting earnings', 'close', {
                //   duration: 3000
                // });
            });
    }

    getYearToDatePaidDetail(): void {

        this.loading = true;

        const currentUser = JSON.parse(this.storageService.getCurrentUser());
        let affiliate_id = 0;
        if (currentUser.role_id !== null && currentUser.role_id === 6) {
            affiliate_id = currentUser.company_id || 0;
        }

        //// Rules: next payment => SUM of bill amount where sent_payment != 1
        //// YTD payment => SUM of bill where sent_payment == 1
        this.earningsService.getYearToDatePaid()
            .then((response: any) => {
                 this.loading = false;
                if (response.export_affiliate_bills_accounting_response.success === true || response.export_affiliate_bills_accounting_response.success === 'true') {

                    // tslint:disable-next-line: max-line-length
                    if (response.export_affiliate_bills_accounting_response.affiliate_bills.affiliate_bill !== null
                        && response.export_affiliate_bills_accounting_response.affiliate_bills.affiliate_bill !== undefined) {

                        let affiliate_bill = [];
                        affiliate_bill = response.export_affiliate_bills_accounting_response.affiliate_bills.affiliate_bill || [];

                        //// filter affiliate as logged in. admin will have all values. 
                        if (affiliate_id > 0) {
                            affiliate_bill = affiliate_bill.slice().filter(x => {
                                return x.affiliate.affiliate_id === affiliate_id;
                            }) || [];
                        }

                        if (affiliate_bill !== null && affiliate_bill !== undefined && affiliate_bill.length > 0) {

                            const listNextPayment = affiliate_bill.slice().filter(x => {
                                return (x.sent_payment === 'no' || x.sent_payment === 'NO' || x.sent_payment === '0');
                            }) || [];


                            const ytdPayment = affiliate_bill.slice().filter(x => {
                                return (x.sent_payment === 'yes' || x.sent_payment === 'YES' || x.sent_payment === '1');
                            }) || [];

                            this._nextPayment = (listNextPayment.reduce((acc, val) => acc += Number(val.bill_amount.amount), 0)) || 0;
                            this.nextPayment = this.decimalPipe.transform(this._nextPayment, '1.0-2');

                            this._yearToDatePaid = (ytdPayment.reduce((acc, val) => acc += Number(val.bill_amount.amount), 0)) || 0;
                            this.yearToDatePaid = this.decimalPipe.transform(this._yearToDatePaid, '1.0-2');


                            this.currencySymbol = affiliate_bill[0].bill_amount.formatted_amount.replace(/\d+([,.]\d+)?/g, '') || '';

                        }
                        else {
                            this._nextPayment = 0;
                            this.nextPayment = this.decimalPipe.transform(this._nextPayment, '1.0-2');

                            this._yearToDatePaid = 0;
                            this.yearToDatePaid = this.decimalPipe.transform(this._yearToDatePaid, '1.0-2');

                        }
                    }
                }
                // else {
                //   this.snackBar.open('An error occurred while getting data 2', 'close', {
                //     duration: 3000
                //   });
                // }
            })
            .catch(() => {
                 this.loading = false;
                // this.snackBar.open('An error occurred while getting data', 'close', {
                //   duration: 3000
                // });
            });
    }

}
