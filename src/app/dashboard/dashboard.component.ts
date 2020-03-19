import { Component, OnInit } from '@angular/core';
import { DashboardOperationStore } from './store/dashboard-operation.store';
import { DashboardViewState } from './store/dashboard.view-state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private operation: DashboardOperationStore,
    public viewState: DashboardViewState
  ) { }

  emitType = (count) => {
    if (count > 0) {
      return 'danger';
    }
    return 'success';
  }

  ngOnInit(): void {
    this.operation.start();
  }

}
