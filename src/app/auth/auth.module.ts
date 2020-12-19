import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthenticationLoginService } from './../shared/services/login.service';

const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    }
  ];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(routes),  
                  
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        AuthenticationLoginService,
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AuthModule { }
