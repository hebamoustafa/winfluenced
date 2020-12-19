import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from './../models/user.model';
import { StorageService } from './storage.service';

@Injectable()
export class AuthenticationLoginService
{
     constructor(private httpClient: HttpClient, private storageService: StorageService) {
        // Set the defaults      
    }
   
    authenticateUser(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {       
            this.httpClient.post(environment.apiURL + 'auth/login',
                { 
                   'username': username,
                   'password':  password 
                })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    resetUserPassword(username: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.apiURL + 'auth/reset-password',
                {
                    'username': username
                })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    logoutUser(): Promise<any> {
       
        this.storageService.setCurrentUser('');     
                
        return new Promise((resolve, reject) => {
            resolve({});
        });      
    }
  
    changePassword(employeeId: number, oldPassword: string, newPassword: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.put(environment.apiURL + 'Employees/change-password/' + employeeId,
                {
                    'oldPassword': oldPassword,
                    'newPassword': newPassword
                })
                .subscribe((response: any) => {
                    this.logoutUser();
                    resolve(response);
                }, reject);
        });
    }

    changePasswordByLoggedInUser(userName: string, currentPassword: string, newPassword: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.apiURL + '',
                // this.httpClient.post(environment.apiURL + '/api/user/change-password',
                {
                    'userName': userName,
                    'currentPassword': currentPassword,
                    'newPassword': newPassword
                })
                .subscribe((response: any) => {
                    this.logoutUser();
                    resolve(response);
                }, reject);
        });
    }
}
