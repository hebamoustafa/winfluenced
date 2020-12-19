import { Component, OnInit } from "@angular/core";
import { ReportsService } from '../reports.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: "conversion-report",
    templateUrl: "./conversion-report.component.html",
    styleUrls: ["./conversion-report.component.css"]
})

export class ConversionReportComponent implements OnInit {

    public categoricalSource: { date: string, order_total: number, paid: number, received: number }[] = [];
    
    public conversionList: any = [];
    public startDate = moment().subtract(7, 'day').startOf('day').toDate(); // last 7 days
    public endDate = moment().endOf('day').toDate(); // now
    public maxDate = moment().toDate();

    apiCall: number = 0;

    //// url for date: https://github.com/NativeScript/nativescript-datetimepicker/blob/master/demo-angular/src/app/home/home.component.html


    constructor(private reportsService: ReportsService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.

        this.searchRecord();

    }

    searchRecord(): void {

        const _startDate = Math.floor(moment(this.startDate, 'YYYY-MM-DD').valueOf() / 1000 || 0);
        const _endDate = Math.floor(moment(this.endDate, 'YYYY-MM-DD').valueOf() / 1000 || 0);

        this.getEarningDetail(_startDate, _endDate);

    }

    getEarningDetail(startDate: number, endDate: number): void {

        this.reportsService.getConversionReport(startDate, endDate)
            .then((response: any) => {

                if (response.data !== null && response.data !== undefined) {

                    const parsedList = response.data.map(x => {
                        return x.fields;
                    }) || [];

                    const listData = [].concat(...parsedList) || [];

                    this.conversionList = listData.map(x => {
                        return {
                            'source_affiliate': x.source_affiliate.source_affiliate_name,
                            'brand_advertiser': x.brand_advertiser.brand_advertiser_name,
                            'paid': x.paid.amount,       
                            'paid_unbilled': x.paid_unbilled.amount,                     
                            'received': x.received.amount,
                            'received_unbilled': x.received_unbilled.amount,
                            'order_total': x.order_total.amount,
                            'event_conversion_date': x.event_conversion_date                           
                        };
                    });

                   this.generateChart( this.conversionList);
                                       
                    if (this.conversionList !== null && this.conversionList !== undefined) {

                        this.conversionList = _(this.conversionList)
                            .groupBy(x => x.site_offer_name) // using groupBy                   
                            .map(g => {// mapping 
                                return {
                                    source_affiliate: g[0].source_affiliate,//take the first name because we grouped them by name
                                    paid: _.sumBy(g, 'paid'), // using lodash to sum
                                    paid_unbilled: _.sumBy(g, 'paid_unbilled'), // using lodash to sum
                                    received: _.sumBy(g, 'received'),
                                    received_unbilled: _.sumBy(g, 'received_unbilled'),
                                    order_total: _.sumBy(g, 'order_total')
                                }
                            })
                            .value();
                    }

                }

            })
            .catch(() => {
                // this.loading = false;
                // this.snackBar.open('An error occurred while getting earnings', 'close', {
                //   duration: 3000
                // });
            });
    }

    onStartDateChanged(args: any): void {
        this.startDate = moment(args.value).startOf('day').toDate();
        this.apiCall += 1;
        if (this.apiCall > 2) {
            this.searchRecord();
        }
    }

    onEndDateChanged(args: any): void {
        this.endDate = moment(args.value).endOf('day').toDate();
        this.apiCall += 1;
        if (this.apiCall > 2) {
            this.searchRecord();
        }
    }
    
    generateChart(_data: any): void {
      
        const finalList = _data.slice().map(x => {

            return {
                'date': moment(x.event_conversion_date).format('MM-DD-YYYY'), 
                'paid': x.paid,
                'received': x.received,                           
                'order_total': x.order_total
            };

        });

        const groupArray = _(finalList)
            .groupBy(x => x.date) // using groupBy                   
            .map(g => {// mapping 
                return {
                    date: moment(g[0].date).format('DD-MM'),//take the first name because we grouped them by name                 
                    order_total: _.sumBy(g, 'order_total'), // using lodash to sum 
                    paid: _.sumBy(g, 'paid'),
                    received: _.sumBy(g, 'received'),                      
                }
            })
            .value();

        //// Descending
        groupArray.sort((a: any, b: any) =>  b.date - a.date);
     
        if (groupArray !== null && groupArray !== undefined
            && groupArray.length > 15) {
            this.categoricalSource = groupArray.splice(0, 15);
            this.categoricalSource.sort().reverse();
        }
        else {
            this.categoricalSource = groupArray || []; 
            this.categoricalSource.sort().reverse();
        }

       

    }

}
