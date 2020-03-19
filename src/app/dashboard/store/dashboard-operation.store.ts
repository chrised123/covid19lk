import { Injectable } from '@angular/core';
import { OperationBaseStore } from './../../operation.base.store';
import { CoronaService } from './../../services/corona.service';

@Injectable()
export class DashboardOperationStore extends OperationBaseStore {
  constructor(public service: CoronaService) {
    super();
  }

   onstart = () => {
    return new Promise((resolve, reject) => {
      this.service.fetch().subscribe(
        (response) => {
          resolve(response);
        },
        response => {
          reject(response.error);
        }
      );
    });
  }
}
