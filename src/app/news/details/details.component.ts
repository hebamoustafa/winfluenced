import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as moment from 'moment';
import { RouterExtensions } from "@nativescript/angular";
import { NewsService } from './../news.service';
// import * as utils from "@nativescript/core";

@Component({
    selector: "news-message-details",
    templateUrl: "./details.component.html",
    styleUrls: ['./details.component.css']
})

export class NewsDetailsComponent implements OnInit {
   
    public news: any = {
        date: '',
        message: ''
    };
    
    constructor(
        private router: Router,
        private route: ActivatedRoute, 
        private routerExtensions: RouterExtensions,
        private newsService: NewsService) {
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
                    this.getNews(id);
                }
            });
    }

    getNews(id: string): void {

        this.newsService.getNewsbyId(id)
            .then((response: any) => {
                if (response.data !== null && response.data.length > 0) {

                   this.news = response.data[0] || {};                  

                }
            });

    }

    onBackButtonTap(): void {

        this.routerExtensions.back();     
    }

}
