import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "@nativescript/core/ui/page";
import { AuthenticationLoginService } from './../../shared/services/login.service';
import { User } from "./../../shared/models/user.model";
import { StorageService } from './../../shared/services/storage.service';
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

    public user: any;
    loading = false;

    @ViewChild("password", { static: true }) password: ElementRef;

    constructor(private page: Page,
                private router: Router,
                private loginService: AuthenticationLoginService,
                private storageService: StorageService) {
        // Use the component constructor to inject providers.
        this.page.actionBarHidden = true;

        this.user = {
            "email": "baris.putun@winfluenced.com",
            "password": "wflflag4%26A"
        }
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    focusPassword(): void {
        this.password.nativeElement.focus();

    }

    submit() {

        if (!this.user.email || !this.user.password) {
            this.alert("Please provide both an email address and password.");
            return;
        }

        this.loading = true;

        this.loginService.authenticateUser(this.user.email, this.user.password)
        .then((response: any) => {
             this.loading = false;
            if (response.login_response.success === 'true' || response.login_response.success === true) {

                const currentUser = new User(response.login_response.login_info);
                this.storageService.setCurrentUser(JSON.stringify(currentUser));

                // Load Employees permissions
                // this.permissionService.getEmployeePermissions();

                this.router.navigate(['home']);
            }
            else {
               // this.hasFormErrors = true;
                // this.snackBar.open('Invalid username or password', 'close', {
                //     duration: 3000
                // });

                this.alert("Invalid username or password");
            }

        })
        .catch(() => {
            this.loading = false;
           // this.loading = false;
           // this.hasFormErrors = true;
            // this.snackBar.open('Invalid username or password', 'close', {
            //     duration: 3000
            // });

            this.alert("Invalid username or password");
        });

    }

    alert(message: string) {
        return alert({
            title: "Winfluenced",
            okButtonText: "OK",
            message: message
        });
    }
}

