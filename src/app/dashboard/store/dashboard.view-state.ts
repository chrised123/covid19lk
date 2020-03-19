import { Injectable } from '@angular/core';
import { autorun, observable, action, reaction, toJS } from 'mobx';
import { Operations } from './../../global.constant';
import { DashboardOperationStore } from './dashboard-operation.store';
import { LocalCases } from './localCases.model';
import { ForeignCases } from './foreignCases.model';
import { HospitalData } from './hospitalData.model';

@Injectable()
export class DashboardViewState {
  @observable localCases: LocalCases;
  @observable foreignCases: ForeignCases;
  @observable hospitals: HospitalData[] = [];

  isLoading = true;
  constructor(
    private store: DashboardOperationStore,
  ) {
    reaction(
      () =>
        (this.store.operation === Operations.completed &&
          this.store.data) ||
        (this.store.operation === Operations.error &&
          this.store.error),
      () => {
        if (this.store.error) {
          console.log('error error error');
        } else if (this.store.data) {
          // Keep this.isLoading to true to see the loading bar. Currently it wont be visible because
          // I am doing an ngif to check whether data is available.
          this.isLoading = false;
          this.constructData(this.store.data.data);
        }
      }
    );
  }

  constructData = (data) => {
    this.localCases = new LocalCases(data);
    this.foreignCases = new ForeignCases(data);
    data.hospital_data.map(item => {
      const hospital = new HospitalData(item);
      this.hospitals.push(hospital);
    });
  }
}
