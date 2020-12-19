import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
    
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    {
        path: "home", 
        canActivate: [AuthGuard],      
        loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
    },
    {
        path: "coupons",
        canActivate: [AuthGuard],
        loadChildren: () => import("./coupons/coupons.module").then((m) => m.CouponsModule),
    },
    {
        path: "reports",
        canActivate: [AuthGuard],
        loadChildren: () => import("./reports/reports.module").then((m) => m.ReportsModule),
    },
    {
        path: "earnings",
        canActivate: [AuthGuard],
        loadChildren: () => import("./earnings/earnings.module").then((m) => m.EarningsModule),
    },
    {
        path: "account",
        canActivate: [AuthGuard],
        loadChildren: () => import("./my-account/my-account.module").then((m) => m.MyAccountModule),
    },
    {
        path: "news",
        canActivate: [AuthGuard],
        loadChildren: () => import("./news/news.module").then((m) => m.NewsModule),
    },

    { path: "", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
