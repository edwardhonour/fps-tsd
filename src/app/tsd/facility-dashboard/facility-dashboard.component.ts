import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { DataService } from 'app/data.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-facility-dashboard',
  templateUrl: './facility-dashboard.component.html',
  styleUrls: ['./facility-dashboard.component.scss']
})
export class FacilityDashboardComponent implements OnInit, OnDestroy {
  navigation: Navigation;
  isScreenSmall: boolean;
  term: any;
  p: any;
  formFieldHelpers: string[] = [''];
  uploadData: any;

    data: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    index: any;
    user: any;
    editing: any;
    interaction_msg: any;
    source_msg: any;
    vulnerability_msg: any;
    ticket_type_msg: any;
    contact_name_msg: any;
    phone_msg: any;


    show_open: any;
    show_closed: any;
    show_facility: any;
    show_contacts: any;
    show_add_contact: any;
    show_add_ticket: any;
    show_contact_field: any;
    priority_msg: any;
  
    
    /**
     * Constructor
     */

     constructor(
      private _activatedRoute: ActivatedRoute,
      private _router: Router,
      private _navigationService: NavigationService,
      private _fuseMediaWatcherService: FuseMediaWatcherService,
      private _fuseNavigationService: FuseNavigationService,
      private _dataService: DataService,
      private _formBuilder: FormBuilder,
      public http: HttpClient  // used by upload
  ) { }

  startTicket() {
    this.data.ticketData['ASSET_ID']="";
    this.data.ticketData['VULNERABILITY_ID']="0";
    this.data.ticketData['SECTIONID']="";
    this.data.ticketData['ENTRYID']="";
    this.data.ticketData['EVENT_ID']="";
    this.data.ticketData['VULNERABILITY']="";
    this.data.ticketData['RECOMMENDATION']="";
    this.data.ticketData['CONTACT_ID']="";
    this.data.ticketData['CONTACT_PHONE']="";
    this.data.ticketData['CONTACT_NAME']="";
    this.data.ticketData['CONTACT_EMAIL']="";
    this.data.ticketData['CONTACT_TITLE']="";
    this.data.ticketData['CONTACT_AGENCY_CODE']="";
    this.data.ticketData['CONTACT_AGENCY_NAME']="";
    this.data.ticketData['CONTACT_CALL_SIGN']="";
    this.data.ticketData['ASSET_NAME']="";
    this.data.ticketData['ASSET_ID']="";
    this.data.ticketData['MFG']="";
    this.data.ticketData['MODEL']="";
    this.data.ticketData['SERIAL']="";
    this.data.ticketData['LOCATION']="";
  }

  getAsset(m: any) {
    this.data.ticketData['ASSET_ID']=m.ASSET_ID;
    this.data.ticketData['MFG']=m.MFG;
    this.data.ticketData['MODEL']=m.MODEL;
    this.data.ticketData['SERIAL']=m.SERIAL;
    this.data.ticketData['LOCATION']=m.LOCATION_DSC;
  }

  getContact(m: any) {
    this.data.ticketData['CONTACT_ID']=m.CONTACT_ID;
    this.data.ticketData['CONTACT_NAME']=m.CONTACT_NAME;
    this.data.ticketData['CONTACT_PHONE']=m.CONTACT_PHONE;
    this.data.ticketData['CONTACT_EMAIL']=m.CONTACT_EMAIL;
    this.data.ticketData['CONTACT_TITLE']=m.CONTACT_TITLE;
    this.data.ticketData['CONTACT_AGENCY_NAME']=m.CONTACT_AGENCY_NAME;
    this.data.ticketData['CONTACT_AGENCY_CODE']=m.CONTACT_AGENCY_CODE;
    this.data.ticketData['CONTACT_CALL_SIGN']=m.CONTACT_CALL_SIGN;
    this.data.ticketData['ADD_CONTACT']="N";
    this.show_add_contact='Y';
  }

    showEdit() {
      if (this.editing=='Y') {
           this.editing='N';
      } else {
           this.editing='Y';
      }
    }

    showOpen() {
      if (this.show_open=='Y') {
           this.show_open='N';
      } else {
           this.show_open='Y';
      }
    }

    showClosed() {
      if (this.show_closed=='Y') {
           this.show_closed='N';
      } else {
           this.show_closed='Y';
      }
    }

    showFacility() {
      if (this.show_facility=='Y') {
           this.show_facility='N';
      } else {
           this.show_facility='Y';
      }
    }

    showContacts() {
      if (this.show_contacts=='Y') {
           this.show_contacts='N';
      } else {
           this.show_contacts='Y';
      }
    }

    showContactField() {
           this.show_contact_field='Y';
    }
    hideContactField() {
      this.show_contact_field='N';
    }

    showAddContact() {
      if (this.show_add_contact=='Y') {
           this.show_add_contact='N';
      } else {
           this.show_add_contact='Y';
           this.checkContact();
      }
    }

    showAddTicket() {
      if (this.show_add_ticket=='Y') {
           this.show_add_ticket='N';
      } else {
           this.show_add_ticket='Y';
           this.startTicket();
      }
    }

    ngOnInit(): void
    {   
      this.editing='N';
      this.show_open='N';
      this.show_contact_field='N';
      this.show_closed='N';
      this.show_facility='N';
      this.show_contacts='N';
      this.show_add_contact='N';
      this.show_add_ticket='N';
      this.interaction_msg='';
      this.source_msg='';
      this.vulnerability_msg='';
      this.ticket_type_msg='';
      this.contact_name_msg='';
      this.phone_msg='';
      this.priority_msg='';
      this._activatedRoute.data.subscribe(({ 
        data, menudata, userdata })=> { 
          this.data=data;
          this.user=userdata;
          this.navigation=menudata
      }) 

            this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {
                this.isScreenSmall = !matchingAliases.includes('md');
            });
              
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }


    private _fixSvgFill(element: Element): void
    {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
             .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
             .forEach((el) => {
                 const attrVal = el.getAttribute('fill');
                 el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
             });
    }

    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    getFormFieldHelpersAsString(): string
    {
        return this.formFieldHelpers.join(' ');
    }


    editBlur(id: any) {
      this.data.colForm['message_'+id]="";
    }

    postForm() {
      let e = 'N';
      if (this.data['ticketData']['CALL_TYPE']=='') { this.interaction_msg = 'Required!'; e='Y'; } else { this.interaction_msg = ''; }
      if (this.data['ticketData']['CALL_SOURCE']=='') { this.source_msg = 'Required!'; e='Y'; } else { this.source_msg = ''; }
      if (this.data['ticketData']['PRIORITY']=='') { this.priority_msg = 'Required!'; e='Y'; } else { this.priority_msg = ''; }
      if (this.data['ticketData']['CONTACT_PHONE']=='') { this.phone_msg = 'Required!'; e='Y'; } else { this.phone_msg = ''; }
      if (this.data['ticketData']['CONTACT_NAME']=='') { this.contact_name_msg = 'Required!'; e='Y'; } else { this.contact_name_msg = ''; }
      if (this.data['ticketData']['VULNERABILITY']=='') { this.vulnerability_msg = 'Required!'; e='Y'; } else { this.vulnerability_msg = ''; }

      if (e=='N') {
        this._dataService.postForm("post-add-ticket", this.data['ticketData']).subscribe((data:any)=>{
          this.data=data;
          this.editing='N';
        });
      }
      }



      checkContact() {
        if (this.data['ticketData']['CONTACT_PHONE']=='') {
            this.data.ticketData['CONTACT_ID']="";
            this.data.ticketData['CONTACT_PHONE']="";
            this.data.ticketData['CONTACT_NAME']="";
            this.data.ticketData['CONTACT_EMAIL']="";
            this.data.ticketData['CONTACT_TITLE']="";
            this.data.ticketData['CONTACT_AGENCY_CODE']="";
            this.data.ticketData['CONTACT_AGENCY_NAME']="";
            this.data.ticketData['CONTACT_CALL_SIGN']="";
        } else {
            this._dataService.postForm("check-contact", this.data['ticketData']).subscribe((data:any)=>{
            if (data.error_code=="0") {
              this.data.ticketData['CONTACT_ID']=data.CONTACT_ID;
              this.data.ticketData['CONTACT_NAME']=data.CONTACT_NAME;
              this.data.ticketData['CONTACT_PHONE']=data.CONTACT_PHONE;
              this.data.ticketData['CONTACT_EMAIL']=data.CONTACT_EMAIL;
              this.data.ticketData['CONTACT_AGENCY_NAME']=data.CONTACT_AGENCY_NAME;
              this.data.ticketData['CONTACT_AGENCY_CODE']=data.CONTACT_AGENCY_CODE;
              this.data.ticketData['CONTACT_CALL_SIGN']=data.CONTACT_CALL_SIGN;
            } else {
              this.data.ticketData['CONTACT_ID']="";
              this.data.ticketData['CONTACT_PHONE']="";
              this.data.ticketData['CONTACT_NAME']="";
              this.data.ticketData['CONTACT_EMAIL']="";
              this.data.ticketData['CONTACT_TITLE']="";
              this.data.ticketData['CONTACT_AGENCY_CODE']="";
              this.data.ticketData['CONTACT_AGENCY_NAME']="";
              this.data.ticketData['CONTACT_CALL_SIGN']="";
            }
            });
        }
      }
  }
  