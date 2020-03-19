export class LocalCases {
  newCases: number;
  totalCases: number;
  newDeaths: number;
  totalDeaths: number;
  totalRecovered: number;

  constructor(data) {
    this.newCases = data.local_new_cases ? data.local_new_cases : 0;
    this.totalCases = data.local_total_cases ? data.local_total_cases : 0;
    this.newDeaths = data.local_new_deaths ? data.local_new_deaths : 0;
    this.totalDeaths = data.local_total_deaths ? data.local_total_deaths : 0;
    this.totalRecovered = data.local_recovered ? data.local_recovered : 0;
  }
}
