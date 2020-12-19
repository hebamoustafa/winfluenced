import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, registerElement } from "@nativescript/angular";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { CouponsComponent } from "./coupons.component";
import { CouponDetailsComponent } from './coupon-details/coupon-details.component';
import { CouponBrandSiteComponent } from './brand-website/brand-website.component';
import { CouponsService } from './coupons.service';

registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);

const routes: Routes = [
    {
      path: '',
      component: CouponsComponent
    },
    {
        path: 'detail/:id',
        component: CouponDetailsComponent
      },
      {
        path: 'brand-website',
        component: CouponBrandSiteComponent
      }
  ];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        NativeScriptUIListViewModule
    ],
    declarations: [
        CouponsComponent,
        CouponDetailsComponent,
        CouponBrandSiteComponent,
    ],
    providers: [
        CouponsService,

    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CouponsModule { }
