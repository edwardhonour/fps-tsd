import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';

@Component({
  selector: 'app-tsd-home',
  templateUrl: './tsd-home.component.html',
  styleUrls: ['./tsd-home.component.scss']
})
export class TsdHomeComponent implements OnInit, OnDestroy
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
    /**
     * Constructor
     */

     constructor(
      private _activatedRoute: ActivatedRoute,
      private _navigationService: NavigationService,
      private _fuseMediaWatcherService: FuseMediaWatcherService,
      private _fuseNavigationService: FuseNavigationService,
  ) { }

    /**
     * On init
     */
    ngOnInit(): void
    {      
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
