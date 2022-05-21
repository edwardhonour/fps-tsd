//--
//-- app.routing.ts
//--
//-- The route provider transalates URL paths to Angular components.  This route provider is a stripped 
//-- down version of the FUSE template.  It is overly complication and will bite you if you get
//-- creative with it.
//--
//-- Just carefully add your paths and exist safely.  Follow the structure of the Resolvers for MIST.
//-- They are critical due to the slow performance of the backend servers.
//--
//-- ESH 2/4/22.
//--
import { Route } from '@angular/router';;
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthGuardOriginal } from './auth.guard';
import { DataResolver, MenuResolver, UserResolver } from './data.resolver';
//--
//-- These import statements will be created automatically when you create the path in the 
//-- routes section if you allow predictive typing to do it's thing when you select the 
//-- component.
//--
import { AssetDashboardComponent } from './assets/asset-dashboard/asset-dashboard.component';
import { ActiveAssessmentsComponent } from './assets/active-assessments/active-assessments.component';
import { AssetSearchComponent } from './assets/asset-search/asset-search.component';
import { FacilityAssetDashboardComponent } from './assets/facility-asset-dashboard/facility-asset-dashboard.component';
import { FacilitySearchComponent } from './assets/facility-search/facility-search.component';
import { MistLogoutComponent } from './assets/mist-logout/mist-logout.component';
import { MistLogoutHomeComponent } from './assets/mist-logout-home/mist-logout-home.component';
import { OverdueTestComponent } from './assets/overdue-test/overdue-test.component';
import { ListTemplateComponent } from './template/list-template/list-template.component';
import { DashboardTemplateComponent } from './template/dashboard-template/dashboard-template.component';
import { AddTemplateComponent } from './template/add-template/add-template.component';
import { FirstComponentComponent } from './training/first-component/first-component.component';
import { DynamicTemplateComponent } from './template/dynamic-template/dynamic-template.component';
import { DynamicListComponent } from './template/dynamic-list/dynamic-list.component';
import { TsdHomeComponent } from './tsd/tsd-home/tsd-home.component';
import { ShowFacilityComponent } from './tsd/show-facility/show-facility.component';
import { TicketListComponent } from './tsd/ticket-list/ticket-list.component';
import { FacilityListComponent } from './tsd/facility-list/facility-list.component';
import { TicketDashboardComponent } from './tsd/ticket-dashboard/ticket-dashboard.component';
import { AddTicketComponent } from './tsd/add-ticket/add-ticket.component';
import { FacilityDashboardComponent } from './tsd/facility-dashboard/facility-dashboard.component';
import { AgingReportComponent } from './tsd/aging-report/aging-report.component';
import { AccountProfileComponent } from './tsd/account-profile/account-profile.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    {path: '', pathMatch : 'full', redirectTo: 'tsd-home'},
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'tsd-home'},
    {
        path: '',
        canActivate: [AuthGuardOriginal],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        //--
        //-- Add paths for MIST here.
        //--    Resolvers:
        //--         MenuResolver - Gets the left vertical menu.
        //--         DataResolver - Gets the data presented on the screen.
        //--             Add an entry to the switch statemment in "data/index.php" on the server to return data based on the path.  
        //--         UserResolver - Gets user account information.
        //--
        children: [
            {path: 'sadmin', component: AssetDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'tsd-home', component: TsdHomeComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'show-facility', component: ShowFacilityComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'ticket-list', component: TicketListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'ticket-list/:id', component: TicketListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'facility-list', component: FacilityListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'facility-dashboard/:id', component: FacilityDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'ticket-dashboard/:id', component: TicketDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'add-ticket', component: AddTicketComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'active-assessments', component: ActiveAssessmentsComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'dynamic-list', component: DynamicTemplateComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'dynamic-list2', component: DynamicListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'first-component', component: FirstComponentComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'asset-search', component: AssetSearchComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'facility-asset-dashboard', component: FacilityAssetDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'facility-search', component: FacilitySearchComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'mist-logout', component: MistLogoutComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'mist-home', component: MistLogoutHomeComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'form-template', component: AddTemplateComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'aging-report', component: AgingReportComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'account-profile', component: AccountProfileComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'dashboard-template/:id', component: DashboardTemplateComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'list-template', component: ListTemplateComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'overdue-tests', component: OverdueTestComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, }
        ]
    },
    //--
    //-- Legacy Path from the FUSE template.  We don't use it but if it is removed, the application will stop working.
    //-- I don't know why.  (ESH: 2/4/22)
    //--
    {
        path       : '',
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'ui', children: [
                {path: 'forms', children: [
                    {path: 'fields', loadChildren: () => import('app/modules/admin/ui/forms/fields/fields.module').then(m => m.FormsFieldsModule)}
                ]},
             ]},
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
