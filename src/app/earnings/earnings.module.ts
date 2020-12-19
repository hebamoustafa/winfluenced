import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { EarningsComponent } from "./earnings.component";
import { EarningsService } from './earnings.service';
import {DecimalPipe} from '@angular/common';

const routes: Routes = [
    {
      path: '',
      component: EarningsComponent
    }
  ];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),  
         
    ],
    declarations: [
        EarningsComponent
    ],
    providers: [
        EarningsService,
        DecimalPipe,           
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EarningsModule { }
