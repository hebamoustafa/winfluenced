import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { filter } from "rxjs/operators";
// import * as app from "application";
// import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
	selector: "app-bottom-navigation",	
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.css"]
})
export class BottomNavigationComponent implements OnInit {
	private _activatedUrl: string;

	constructor(
		private router: Router,
        private routerExtensions: RouterExtensions
        ) 
    {
	}

	ngOnInit(): void {
		this._activatedUrl = "/home";

		this.router.events
			.pipe(filter((event: any) => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
	}

	onDrawerButtonTap(): void {
		// const sideDrawer = <RadSideDrawer>app.getRootView();
		// sideDrawer.showDrawer();
	}

	isComponentSelected(url: string): boolean {
		return this._activatedUrl === url;
	}

	onNavItemTap(navItemRoute: string): void {
		this.routerExtensions.navigate([navItemRoute], {
			transition: {
				name: "fade"
			},
			clearHistory: true
		});
		// this.router.navigate['/account'];

		// const sideDrawer = <RadSideDrawer>app.getRootView();
		// sideDrawer.closeDrawer();
	}
}

