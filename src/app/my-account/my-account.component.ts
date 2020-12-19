import { Component, OnInit } from "@angular/core";
import { MyAccountService } from './my-account.service';
// import * as application from "tns-core-modules/application";

@Component({
  selector: "my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.css"]
})

export class MyAccountComponent implements OnInit {

  loading = false;
  public affiliate: any = {
    "affiliate_id": 0,
    "affiliate_name": "",
    "tier": {
      "affiliate_tier_id": 0,
      "affiliate_tier_name": ""
    },
    "account_managers": {
      "contact": {
        "contact_id": 0,
        "contact_name": ""
      }
    },
    "account_status": {
      "account_status_id": 0,
      "account_status_name": ""
    },
    "address": {
      "street_1": "",
      "street_2": "",
      "city": "",
      "state": "",
      "zip_code": "",
      "country": ""
    },
    "website": "",
    "payment_type": {
      "payment_type_id": "",
      "payment_type_name": "",
      "payment_type_info": ""
    },
    "contacts": {
      "contact_info": {
        "contact_id": 0,
        "contact_type": {
          "contact_type_id": "",
          "contact_type_name": ""
        },
        "role": {
          "role_id": 6,
          "role_name": ""
        },
        "department": {
          "department_id": "",
          "department_name": ""
        },
        "first_name": "",
        "middle_name": "",
        "last_name": "",
        "email_address": "",
        "title": "",
        "phone_work": "",
        "phone_cell": "",
        "phone_fax": "",
        "im_service": "",
        "im_name": "",
        "include_in_mass_emails": true,
        "notes": ""
      }
    },
    "tags": {
      "tag": [
        {
          "tag_id": 1,
          "tag_name": ""
        },
      ]
    },
    "traffic_types": {
      "price_formats": {
        "price_format": [
          {
            "price_format_id": 1,
            "price_format_name": "CPA"
          },
          {
            "price_format_id": 2,
            "price_format_name": "CPC"
          },
          {
            "price_format_id": 3,
            "price_format_name": "CPM"
          },
          {
            "price_format_id": 4,
            "price_format_name": "Fixed"
          },
          {
            "price_format_id": 5,
            "price_format_name": "RevShare"
          }
        ]
      },
      "media_types": {
        "media_type": [
          {
            "media_type_id": 1,
            "media_type_name": "",
            "media_type_category_id": 14,
            "media_type_category_name": ""
          },
          {
            "media_type_id": 2,
            "media_type_name": "Email",
            "media_type_category_id": 3,
            "media_type_category_name": "Email"
          },
          {
            "media_type_id": 3,
            "media_type_name": "Banner",
            "media_type_category_id": 9,
            "media_type_category_name": "Image"
          },
          {
            "media_type_id": 4,
            "media_type_name": "Contextual",
            "media_type_category_id": 9,
            "media_type_category_name": "Image"
          },
          {
            "media_type_id": 5,
            "media_type_name": "SocialSharing",
            "media_type_category_id": 14,
            "media_type_category_name": "Link"
          },
          {
            "media_type_id": 6,
            "media_type_name": "PPC",
            "media_type_category_id": 15,
            "media_type_category_name": "Organic/SERP"
          },
          {
            "media_type_id": 7,
            "media_type_name": "SEO",
            "media_type_category_id": 15,
            "media_type_category_name": "Organic/SERP"
          },
          {
            "media_type_id": 8,
            "media_type_name": "Retargeting",
            "media_type_category_id": 24,
            "media_type_category_name": "Product Feed"
          },
          {
            "media_type_id": 9,
            "media_type_name": "Aggregator",
            "media_type_category_id": 24,
            "media_type_category_name": "Product Feed"
          },
          {
            "media_type_id": 10,
            "media_type_name": "Instagram",
            "media_type_category_id": 10,
            "media_type_category_name": "In-stream"
          },
          {
            "media_type_id": 11,
            "media_type_name": "Youtube",
            "media_type_category_id": 8,
            "media_type_category_name": "Video"
          },
          {
            "media_type_id": 14,
            "media_type_name": "Native",
            "media_type_category_id": 11,
            "media_type_category_name": "Native"
          },
          {
            "media_type_id": 15,
            "media_type_name": "Content",
            "media_type_category_id": 25,
            "media_type_category_name": "Post"
          },
          {
            "media_type_id": 16,
            "media_type_name": "Display",
            "media_type_category_id": 9,
            "media_type_category_name": "Image"
          },
          {
            "media_type_id": 17,
            "media_type_name": "Coupon",
            "media_type_category_id": 20,
            "media_type_category_name": "Coupon/Voucher"
          },
          {
            "media_type_id": 18,
            "media_type_name": "",
            "media_type_category_id": 24,
            "media_type_category_name": ""
          }
        ]
      },
      "vertical_categories": "",
      "countries": ""
    },
    "minimum_payment_threshold": "",
    "auto_payment_fee": "",
    "pay_vat": false,
    "referrals_enabled": false,
    "referral_info": "",
    "billing_cycle": {
      "billing_cycle_id": 3,
      "billing_cycle_name": ""
    },
    "currency_settings": {
      "currency": {
        "currency_id": 1,
        "currency_symbol": "TRY",
        "currency_name": "Turkish Lira",
        "currency_abbr": "TRY"
      },
      "payment_setting": {
        "payment_setting_id": 1,
        "payment_setting_name": ""
      }
    },
    "quickbooks_id": "",
    "online_signup": false,
    "signup_ip_address": "",
    "pay_for_conversions": true,
    "review": false,
    "review_new_subaffiliates": false,
    "suppression": false,
    "suppression_cap": "",
    "fire_global_pixel": false,
    "blacklists": "",
    "auto_approve_campaigns": false,
    "auto_approve_pixels": false,
    "hide_offers": false,
    "api_key": "",
    "date_created": "",
    "date_last_accepted_terms": "",
    "notes": ""
  };

  // public isAndroid: boolean;
  // public isIos: boolean;

  constructor(private accountService: MyAccountService) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {

    this.getUserDetail();

    //   if (application.ios) {
    //     this.isAndroid = false;
    //     this.isIos = true;
    // } else if (application.android) {
    //     this.isAndroid = true;
    //     this.isIos = false;
    // }

  }

  getUserDetail(): void {

    this.loading = true;

    this.accountService.getAccountDetail()
      .then((response: any) => {
        this.loading = false;

        if (response.affiliate_export_response.success === true || response.affiliate_export_response.success === 'true') {

          if (response.affiliate_export_response.row_count > 0
            && response.affiliate_export_response.affiliates.affiliate !== null
            && response.affiliate_export_response.affiliates.affiliate !== undefined) {

            // tslint:disable-next-line: max-line-length
            this.affiliate = response.affiliate_export_response.row_count === 1 ? response.affiliate_export_response.affiliates.affiliate : response.affiliate_export_response.affiliates.affiliate[0];

          }

        }
        // else {
        //   this.snackBar.open(response.campaign_summary_response.message || 'An error occurred while getting data.', 'close', {
        //     duration: 3000
        //   });
        // }
      })
      .catch(() => {
        this.loading = false;
        // this.snackBar.open('An error occurred while getting data', 'close', {
        //   duration: 3000
        // });
      });
  }


}
