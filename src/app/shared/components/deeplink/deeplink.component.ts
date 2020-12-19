import { Component, OnInit } from "@angular/core";
import { DeeplinkService } from './../../services/deeplink.service';

@Component({
    selector: "app-bottom-deeplink",
    templateUrl: "./deeplink.component.html",
    styleUrls: ["./deeplink.component.css"]
})
export class BottomDeepLinkComponent implements OnInit {

    public deeplink: any;

    constructor(private deeplinkService: DeeplinkService) {

        this.deeplink = {
            "url": ""
        }  
    }

    ngOnInit(): void {

    }

    submit(): void {

        if (!this.deeplink.url) {
            this.alert('Error', 'Please provide the link to get the tracking link');
            return;
        }

        
        this.deeplinkService.getShorterLink(this.deeplink.url)
        .then((response: any) => { 
            if(response.success === true || response.success === 'true') {
                this.alert('Short Link', response.result);
            }
            else {
                this.alert('Error', response.result);
            }

            this.deeplink = {
                "url": ""
            }  

        })
        .catch((error: any) => {  
             this.alert('Error', error.statusText || '');
             this.deeplink = {
                "url": ""
            }  
         });

    }

    alert(title: string, message: string) {
        return alert({
            title: title,
            okButtonText: "OK",
            message: message
        });
    }

}