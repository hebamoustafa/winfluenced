export class LoginUser {
    email?: string;
    password: string;

    constructor(data?) {

        data = data || {};

        this.email = data.email || '';
        this.password = data.password || '';
    }

    hasEmail() {
        return this.email != '';
    }
}