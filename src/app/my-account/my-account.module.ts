import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { MyAccountComponent } from "./my-account.component";
import { MyAccountService } from './my-account.service';

const routes: Routes = [
    {
      path: '',
      component: MyAccountComponent
    }
  ];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),       
    ],
    declarations: [
        MyAccountComponent
    ],
    providers: [
        MyAccountService,
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MyAccountModule { }
