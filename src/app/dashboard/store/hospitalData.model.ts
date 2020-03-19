export class HospitalData {
  id: number;
  name: string;
  localInspection: number;
  foreignInspection: number;
  localTreatment: number;
  foreignTreatment: number;

  constructor(data){
    this.id = data.id;
    this.name = (data.hospital.name)
      .replace('TH', 'Teaching Hospital')
      .replace('DGH', 'District General Hospital')
      .replace('PGH', 'Provincial General Hospital')
      .replace('DMH', 'DeSoysa Maternity Hospital')
      .replace('LRH', 'Lady Ridgeway Hospital');
    this.localInspection = data.cumulative_local;
    this.foreignInspection = data.cumulative_foreign;
    this.localTreatment = data.treatment_local;
    this.foreignTreatment = data.treatment_foreign;
  }
}
