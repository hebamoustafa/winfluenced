import { Injectable } from "@angular/core";
import { getString, setString } from "tns-core-modules/application-settings";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

const currentUserKey = "currentUser";

@Injectable()
export class StorageService {
 
  onCurrentUserChanged: BehaviorSubject<any>;

  constructor() {
    // Set the defaults    
    this.onCurrentUserChanged = new BehaviorSubject({});
  }

  isLoggedIn(): boolean {
    return !!getString(currentUserKey);
  }

  getCurrentUser(): string {
    return getString(currentUserKey);
  }

  setCurrentUser(theCurrentUser: string) {
    setString(currentUserKey, theCurrentUser);
    this.onCurrentUserChanged.next(theCurrentUser);
  }

}