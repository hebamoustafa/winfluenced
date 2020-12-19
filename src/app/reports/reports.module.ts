import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { ReportsComponent } from "./reports.component";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { CompaignReportComponent } from './compaign/compain-report.component';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { ReportsService } from './reports.service';
import { NativeScriptDateTimePickerModule } from "@nativescript/datetimepicker/angular";
import { ConversionReportComponent } from './conversion-report/conversion-report.component';

const routes: Routes = [
    {
      path: '',
      component: ReportsComponent
    }
  ];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes), 
        NativeScriptUIChartModule,
        NativeScriptUIDataFormModule,
        NativeScriptUIListViewModule,
        NativeScriptDateTimePickerModule,
        
                   
    ],
    declarations: [
        ReportsComponent,
        CompaignReportComponent,
        ConversionReportComponent,
        
    ],
    providers: [
        ReportsService,
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ReportsModule { }
