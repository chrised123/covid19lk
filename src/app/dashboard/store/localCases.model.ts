import { toJS } from 'mobx';

export class LocalCases {
  newCases: number;
  totalCases: number;
  newDeaths: number;
  totalDeaths: number;
  totalRecovered: number;

  constructor(data) {
    console.log(toJS(data));
    this.newCases = data.local_new_cases ? data.local_new_cases : 0;
    this.totalCases = data.local_total_cases ? data.local_total_cases : 0;
    this.newDeaths = data.local_new_deaths ? data.local_new_deaths : 0;
    this.totalDeaths = data.local_deaths ? data.local_deaths : 0;
    this.totalRecovered = data.local_recovered ? data.local_recovered : 0;
  }
}
