import { Component, OnInit } from "@angular/core";
import { HomeService } from './../home.service';
import * as moment from 'moment';
import { Router } from "@angular/router";

@Component({
    selector: "dashboard-news",
    templateUrl: "./news.component.html",
    styleUrls: ['news.component.css'],
})

export class NewsComponent implements OnInit {

    public newsList: any[] = [];

    constructor(private homeService: HomeService, 
         private router: Router ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
       this.getNewsData();
    }

    getNewsData(): void {

        this.homeService.getNews()
          .then((response: any) => { 
            this.newsList = response.data;

            if(this.newsList !== null && this.newsList !== undefined) {

                this.newsList = this.newsList.slice().map(x => {
                    return {
                        'date':moment(moment(x.date).toDate()).format('DD-MM-YYYY'),
                        'message': x.message
                    };
                })

                //// Descending     
                this.newsList.sort((a: any, b: any) => b.date - a.date);

                if (this.newsList.length > 20) {
                    this.newsList = this.newsList.splice(0, 20);                       
                }

            }

          });
    }

    public onItemTap(args: any) {
       const itemData = args.view.bindingContext
       this.router.navigate(['/news/detail/' + itemData.id ]);

   }


}
