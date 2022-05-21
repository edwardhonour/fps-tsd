import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';

@Component({
  selector: 'app-dynamic-template',
  templateUrl: '../dynamic-template/dynamic-template.component.html',
  styleUrls: ['./dynamic-template.component.scss']
})
export class DynamicTemplateComponent implements OnInit, OnDestroy
{
  //--
  //-- Variables
  //--
  navigation: Navigation;
  isScreenSmall: boolean;
  term: any;
  p: any;
  data: any;
  currentYear: any;
  email: any;
  user: any;
  index: any;
  title: any;

  columnHeaders: any;
  columnFields: any;
  columnCount: any;
  link: any;
  params: any;
  rowsPerPage: any;
  nStyle: any;

  constructor(
      private _activatedRoute: ActivatedRoute,
      private _navigationService: NavigationService,
      private _fuseMediaWatcherService: FuseMediaWatcherService,
      private _fuseNavigationService: FuseNavigationService,
  ) { }
    
  ngOnInit(): void
  {      
      // ED'S DYNAMIC FORM 
      // Fill these out and 
      this.title="System Users";
      this.columnCount=5;
      this.columnHeaders=[
          "User Id","User Name","Full Name","Region", "Role",""
      ];
      this.columnFields=[
          "USER_ID","USER_NAME","FULL_NAME","REGION_ID","ROLE"
      ];
      this.link="/dashboard-template";
      this.params=[ "USER_ID" ];
      this.nStyle={
        columnName: "INACTIVE",     // if this column
        columnValue: "Y",           // equals this value
        newValue: "#F9C6B8",        // background color is set to this.
        defaultValue: ""            // otherwise its set to this.
      };
      this.rowsPerPage=25;

      this._activatedRoute.data.subscribe(({ 
          data, menudata, userdata })=> { 
          this.data=data;
          this.navigation=menudata
          this.user=userdata
      }) 
            
      this._navigationService.navigation$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((navigation: Navigation) => {
           this.navigation = navigation;
      });

        this._fuseMediaWatcherService.onMediaChange$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(({matchingAliases}) => {
            // Check if the screen is small
          this.isScreenSmall = !matchingAliases.includes('md');
        });
    }
    
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            navigation.toggle();
        }
    }

}
