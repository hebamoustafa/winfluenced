import { Component, OnDestroy, OnInit } from "@angular/core";
import { StorageService } from './shared/services/storage.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/internal/operators/takeUntil";

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {

  public isLoggedIn: boolean = false;
  private _unsubscribeAll: Subject<any>;

  constructor(private storageService: StorageService) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {

    this.isLoggedIn = this.storageService.isLoggedIn();

    this.storageService.onCurrentUserChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.isLoggedIn = this.storageService.isLoggedIn();
      });

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
