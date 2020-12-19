import { Component, OnInit } from "@angular/core";
import { CouponsService } from './../coupons.service';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { WebView, LoadEventData } from "@nativescript/core/ui/web-view";
// import * as utils from "@nativescript/core";
import * as SocialShare from "nativescript-social-share";

@Component({
    selector: "coupons-brand-website",
    templateUrl: "./brand-website.component.html",
    styleUrls: ['./brand-website.component.css']
})

export class CouponBrandSiteComponent implements OnInit {

    public webViewSrc = "";

    constructor(private couponsService: CouponsService,
        private router: Router,
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {

        // Use the "ngOnInit" handler to initialize data for the view.
        this.route.queryParams
        .subscribe(
            (params: Params) => {
                // tslint:disable-next-line: no-string-literal
                const url = params['offer_link'];
                if (url !== null && url !== undefined && url !== '') {
                    this.webViewSrc = url;
                }
            });

    }

    onBackButtonTap(): void {
        this.routerExtensions.back();
    }

    onLoadStarted(args: LoadEventData): void {
       // const webView = args.object as WebView;
        // if (!args.error) {
        //     console.log("Load Start");
        //     console.log(`EventName: ${args.eventName}`);
        //     console.log(`NavigationType: ${args.navigationType}`);
        //     console.log(`Url: ${args.url}`);
        // } else {
        //     console.log(`EventName: ${args.eventName}`);
        //     console.log(`Error: ${args.error}`);
        // }
    }

    onLoadFinished(args: LoadEventData): void {
        // const webView = args.object as WebView;

        // if (!args.error) {
        //     console.log("Load Finished");
        //     console.log(`EventName: ${args.eventName}`);
        //     console.log(`NavigationType: ${args.navigationType}`);
        //     console.log(`Url: ${args.url}`);
        // } else {
        //     console.log(`EventName: ${args.eventName}`);
        //     console.log(`Error: ${args.error}`);
        // }
    }

     shareToFB(): void {
        SocialShare.shareUrl(this.webViewSrc, "Home of NativeScript", "How would you like to share this url?");

        }

}
