export class ForeignCases {
  newCases: number;
  totalCases: number;
  newDeaths: number;
  totalDeaths: number;
  totalRecovered: number;

  constructor(data) {
    this.newCases = data.global_new_cases ? data.global_new_cases : 0;
    this.totalCases = data.global_total_cases ? data.global_total_cases : 0;
    this.newDeaths = data.global_new_deaths ? data.global_new_deaths : 0;
    this.totalDeaths = data.global_deaths ? data.global_deaths : 0;
    this.totalRecovered = data.global_recovered ? data.global_recovered : 0;
  }
}
