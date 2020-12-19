import { Component, OnInit } from "@angular/core";
import { ReportsService } from './../reports.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: "compaign-report",
    templateUrl: "./compain-report.component.html",
    styleUrls: ["./compain-report.component.css"]
})

export class CompaignReportComponent implements OnInit {

    public categoricalSource: { date: string, clicks: number }[] = [];

    public summaryList: any = [];
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

        this.reportsService.getCompaignReport(startDate, endDate)
            .then((response: any) => {

                if (response.data !== null && response.data !== undefined) {

                    const parsedList = response.data.map(x => {
                        return x.fields;
                    }) || [];

                    const listData = [].concat(...parsedList) || [];

                    this.summaryList = listData.map(x => {
                        return {
                            'site_offer_name': x.site_offer.site_offer_name,
                            'brand_advertiser': x.brand_advertiser.brand_advertiser_name,
                            'clicks': x.clicks,
                            'revenue': x.revenue,
                            'epc': x.epc,
                            'cost': x.cost,
                            'margin': x.margin,
                            'profit': x.profit
                        };
                    });

                    if (this.summaryList !== null && this.summaryList !== undefined) {

                        this.summaryList = _(this.summaryList)
                            .groupBy(x => x.site_offer_name) // using groupBy                   
                            .map(g => {// mapping 
                                return {
                                    site_offer_name: g[0].site_offer_name,//take the first name because we grouped them by name
                                    clicks: _.sumBy(g, 'clicks'), // using lodash to sum
                                    revenue: _.sumBy(g, 'revenue'), // using lodash to sum
                                    epc: _.sumBy(g, 'epc'),
                                    cost: _.sumBy(g, 'cost'),
                                    margin: _.sumBy(g, 'margin'),
                                    profit: _.sumBy(g, 'profit')
                                }
                            })
                            .value();
                    }

                    this.generateChart(response.data);

                }

            })
            .catch(() => {
                // this.loading = false;
                // this.snackBar.open('An error occurred while getting earnings', 'close', {
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
                'date': moment(x.date * 1000).format('MM-DD-YYyy'),
                'clicks': x.clicks
            };

        });

        const groupArray = _(finalList)
            .groupBy(x => x.date) // using groupBy                   
            .map(g => {// mapping 
                return {
                    date: moment(g[0].date).format('DD-MM'),//take the first name because we grouped them by name                 
                    clicks: _.sumBy(g, 'clicks'), // using lodash to sum                       
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

}
