import { Component, OnInit } from "@angular/core";
import * as moment from 'moment';
import { HomeService } from './home.service';
import { StorageService } from './../shared/services/storage.service';
import { DecimalPipe } from '@angular/common';
import * as _ from 'lodash';
import { action } from '@nativescript/core/ui/dialogs'
// 'tns-core-modules/ui/dialogs'; // old version


@Component({
    selector: "home-page",
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

   
    public selectedDateFilter = 'Last 7 Days';
    public categoricalSource: { date: string, clicks: number }[] = [];

    _clicks: number | 0;
    public clicks: string | '0';

    _conversions: number | 0;
    public conversions: string | '0';

    _earnings: number | 0;
    public earnings: string | '0';

    constructor(private homeService: HomeService,
        private storageService: StorageService,
        private decimalPipe: DecimalPipe) {

    }

    ngOnInit(): void {
        
        const startDate = moment().subtract(7, 'day').startOf('day').format('YYYY-MM-DD'); // first day of year
        const endDate = moment().format('YYYY-MM-DD'); // now

        const _startDate = Math.floor(moment(startDate, 'YYYY-MM-DD').valueOf() / 1000 || 0);
        const _endDate = Math.floor(moment(endDate, 'YYYY-MM-DD').valueOf() / 1000 || 0);

        this.getReportData(_startDate, _endDate);

    }

    onBackButtonTap(): void {

    }

    getReportData(startDate: number, endDate: number): void {

        const currentUser = JSON.parse(this.storageService.getCurrentUser());
        let affiliate_id = 0;

        if (currentUser.role_id !== null && currentUser.role_id === 6) {
            affiliate_id = currentUser.company_id || 0;
        }

        this.homeService.getCompaignSummary(startDate, endDate)
            .then((response: any) => {

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

                        this._clicks = (summaryList.reduce((acc, val) => acc += Number(val.clicks), 0));
                        this.clicks = this.decimalPipe.transform(this._clicks, '1.0-2');

                        this._conversions = (summaryList.reduce((acc, val) => acc += Number(val.macro_event_conversions), 0));
                        this.conversions = this.decimalPipe.transform(this._conversions, '1.0-2');

                        this._earnings = (summaryList.reduce((acc, val) => acc += Number(val.profit), 0));
                        this.earnings = this.decimalPipe.transform(this._earnings, '1.0-2');

                    }
                    else {

                        this._clicks = 0;
                        this.clicks = this.decimalPipe.transform(this._clicks, '1.0-2');

                        this._conversions = 0;
                        this.conversions = this.decimalPipe.transform(this._conversions, '1.0-2');

                        this._earnings = 0;
                        this.earnings = this.decimalPipe.transform(this._earnings, '1.0-2');
                    }

                    this.generateChart(response.data);

                }



            })
            .catch(() => {
                // this.snackBar.open('An error occurred while getting clicks', 'close', {
                //   duration: 3000
                // });
            });

    }

    generateChart(_data: any): void {


        const parsedList = _data.map(x => {

            if (Array.isArray(x.fields)) {
                return x.fields.map(f => {
                    return {
                        'date': x.date,
                        // moment(x.date * 1000).format('DD-MM-YYYY'),
                        'clicks': f.clicks
                    };
                });
            }
            else {
                return {
                    'date': x.date,
                    // moment(x.date * 1000).format('DD-MM-YYYY'),
                    'clicks': x.fields.clicks || 0
                };
            }

        }) || [];

        const listData = [].concat(...parsedList) || [];

        const finalList = listData.slice().map(x => {

            return {
                'date': moment(x.date * 1000).format('MM-DD-YYYY'),
                'clicks': x.clicks
            };

        });

        const groupArray = _(finalList)
            .groupBy(x => x.date) // using groupBy                   
            .map(g => {// mapping 
                return {
                    date: moment(g[0].date).format('DD'),//take the first name because we grouped them by name                 
                    clicks: _.sumBy(g, 'clicks'), // using lodash to sum                       
                }
            })
            .value();

        //// Descending     
        groupArray.sort((a: any, b: any) => b.date - a.date);

        //  && groupArray.length > 5
        if (groupArray !== null && groupArray !== undefined) {
            this.categoricalSource = groupArray || [] //.splice(0, 5);
            this.categoricalSource.sort().reverse();
        }
        else {
            this.categoricalSource = groupArray || [];
            this.categoricalSource.sort().reverse();
        }

      
    }   

    filterAction(): void {
        action({
            message: "Filter",
            cancelButtonText: "Cancel",
            actions: ["Last 7 Days", "Last 10 Days" ,"Last 15 Days"]
        }).then((result) => {
            if (result === "Last 7 Days") {

                this.selectedDateFilter = 'Last 7 Days'

                const startDate = moment().subtract(7, 'day').startOf('day').format('YYYY-MM-DD'); // first day of year
                const endDate = moment().format('YYYY-MM-DD'); // now
        
                const _startDate = Math.floor(moment(startDate, 'YYYY-MM-DD').valueOf() / 1000 || 0);
                const _endDate = Math.floor(moment(endDate, 'YYYY-MM-DD').valueOf() / 1000 || 0);
        
                this.getReportData(_startDate, _endDate);
        
               
            } 
            else if (result === "Last 10 Days") {

                this.selectedDateFilter = 'Last 10 Days'
               
                const startDate = moment().subtract(10, 'day').startOf('day').format('YYYY-MM-DD'); // first day of year
                const endDate = moment().format('YYYY-MM-DD'); // now
        
                const _startDate = Math.floor(moment(startDate, 'YYYY-MM-DD').valueOf() / 1000 || 0);
                const _endDate = Math.floor(moment(endDate, 'YYYY-MM-DD').valueOf() / 1000 || 0);
        
                this.getReportData(_startDate, _endDate);
        

            } 
            else if (result === "Last 15 Days") {

                this.selectedDateFilter = 'Last 15 Days'

                const startDate = moment().subtract(15, 'day').startOf('day').format('YYYY-MM-DD'); // first day of year
                const endDate = moment().format('YYYY-MM-DD'); // now
        
                const _startDate = Math.floor(moment(startDate, 'YYYY-MM-DD').valueOf() / 1000 || 0);
                const _endDate = Math.floor(moment(endDate, 'YYYY-MM-DD').valueOf() / 1000 || 0);
        
                this.getReportData(_startDate, _endDate);
        
               
            }            
        });
    }

}
