import { HttpClientModule } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptModule } from "@nativescript/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BottomNavigationComponent } from './shared/components/bottom-navigation/navigation.component';
import { BottomDeepLinkComponent } from './shared/components/deeplink/deeplink.component';
import { StorageService } from './shared/services/storage.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { ReactiveFormsModule } from "@angular/forms";
import { DeeplinkService } from './shared/services/deeplink.service';

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptCommonModule,
        ReactiveFormsModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        HttpClientModule,
        
        // AuthModule,
    ],
    declarations: [
        AppComponent,
        BottomNavigationComponent,
        BottomDeepLinkComponent,
        
    ],
    providers: [
        StorageService,
        DeeplinkService,
        AuthGuard,        
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
