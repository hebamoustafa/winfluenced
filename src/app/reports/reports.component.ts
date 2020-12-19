import { Component, OnInit } from "@angular/core";

@Component({
    selector: "reports",
    templateUrl: "./reports.component.html",
    styleUrls: ["./reports.component.css"]
})

export class ReportsComponent implements OnInit {

   public categoricalSource:  { Country: string, Amount: number, SecondVal: number, ThirdVal: number }[];

   public  album: { albumName: string} = {      
    albumName: "X"
};

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
       
        // Use the "ngOnInit" handler to initialize data for the view.

        this.categoricalSource  = [
            { Country: "Germany", Amount: 15, SecondVal: 14, ThirdVal: 24 },
            { Country: "France", Amount: 13, SecondVal: 23, ThirdVal: 25 },
            { Country: "Bulgaria", Amount: 24, SecondVal: 17, ThirdVal: 23 },
            { Country: "Spain", Amount: 11, SecondVal: 19, ThirdVal: 24 },
            { Country: "USA", Amount: 18, SecondVal: 8, ThirdVal: 21 }
        ];
    }
}
