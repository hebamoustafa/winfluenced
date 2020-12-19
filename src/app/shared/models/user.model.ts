export class User {
    contact_id: string;
    contact_first_name: string;
    contact_last_name: string;
    role_id: string;
    role_name: string;
    company_id: string;
    company_name: string;
    api_key: string;

    constructor(data?) {

        data = data || {};

        this.contact_id = data.contact_id || '';
        this.contact_first_name = data.contact_first_name || '';
        this.contact_last_name = data.contact_last_name || '';
        this.role_id = data.role_id || '';
        this.role_name = data.role_name || '';
        this.company_id = data.company_id || '';
        this.company_name = data.company_name || '';
        this.api_key = data.api_key || '';
    }
}