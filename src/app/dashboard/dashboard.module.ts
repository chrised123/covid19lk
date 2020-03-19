import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { TableComponent } from './components/table/table.component';
import { DashboardOperationStore } from './store/dashboard-operation.store';
import { DashboardViewState } from './store/dashboard.view-state';

@NgModule({
  declarations: [DashboardComponent, CardComponent, TableComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [
    DashboardOperationStore,
    DashboardViewState
  ]
})
export class DashboardModule { }
