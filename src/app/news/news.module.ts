import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NewsDetailsComponent } from "./details/details.component";
import { NewsService } from './news.service';


const routes: Routes = [
    {
      path: '',
      component: NewsDetailsComponent
    },
    {
        path: 'detail/:id',
        component: NewsDetailsComponent
    }
  ];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        NativeScriptUIListViewModule       
    ],
    declarations: [
        NewsDetailsComponent,      

    ],
    providers: [      
        NewsService,

    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NewsModule { }
