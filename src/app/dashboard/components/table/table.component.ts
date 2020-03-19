import { Component } from '@angular/core';
import { DashboardViewState } from '../../store/dashboard.view-state';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  constructor(
    public viewState: DashboardViewState
  ) { }

}
