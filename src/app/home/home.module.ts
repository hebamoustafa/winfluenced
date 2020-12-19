import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { HomeComponent } from "./home.component";
import { BrandsComponent } from './brands/brands.component';
import { NewsComponent } from './news/news.component';
import { HomeService } from './home.service';
import { DecimalPipe } from '@angular/common';

const routes: Routes = [
    {
      path: '',
      component: HomeComponent
    },    
  ];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        NativeScriptUIChartModule, 
        NativeScriptUIListViewModule, 
                    
    ],
    declarations: [
        HomeComponent,
        BrandsComponent,
        NewsComponent,  

    ],
    providers: [
        HomeService,
         DecimalPipe,  
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
