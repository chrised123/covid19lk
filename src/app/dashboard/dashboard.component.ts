import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ɵConsole } from '@angular/core';
import { DashboardOperationStore } from './store/dashboard-operation.store';
import { DashboardViewState } from './store/dashboard.view-state';
import latLong from './store/latlong.data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('gmap') gmapElement: ElementRef;
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  geocoderservices = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow({
    content: null
  });

  constructor(
    private operation: DashboardOperationStore,
    public viewState: DashboardViewState,
  ) { }

  emitType = (count) => {
    if (count > 0) {
      return 'danger';
    }
    return 'success';
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  getCode = (hospital, map) => {
    if (latLong[hospital.name]) {
      const marker = new google.maps.Marker({
        map: this.map,
        position: latLong[hospital.name],
        title: hospital.name
      });
      let contentString = `<h5>${hospital.name}</h5>
        <p>Local inspections - ${hospital.localInspection}</p><p>New Local inspections - ${hospital.localTreatment}</p>
        <p>Foreigner inspections - ${hospital.foreignInspection}</p><p>New Foreigner inspections - ${hospital.foreignTreatment}</p>`;
      marker.addListener('click', () => {
        this.infowindow.close();
        this.infowindow.setContent(contentString);
        this.infowindow.open(map, marker);
      });
      this.markers.push(marker);
    } else {
      this.geocoderservices.geocode({address: `${hospital.name}, Sri Lanka`}, (results, status) => {
        if (status === 'OK') {
          console.log(`${hospital.name} => ${results[0].geometry.location}`)
          const marker = new google.maps.Marker({
            map: this.map,
            position: results[0].geometry.location,
            title: hospital.name
          });
          let contentString = `<h5>${hospital.name}</h5>
            <p>Local inspections - ${hospital.localInspection}</p><p>New Local inspections - ${hospital.localTreatment}</p>
            <p>Foreigner inspections - ${hospital.foreignInspection}</p><p>New Foreigner inspections - ${hospital.foreignTreatment}</p>`;
          marker.addListener('click', () => {
            this.infowindow.close();
            this.infowindow.setContent(contentString);
            this.infowindow.open(map, marker);
          });
          this.markers.push(marker);
        } else {
          return false;
        }
      });
    }


  }


  generateMap = () => {
    const mapProp = {
      center: new google.maps.LatLng(7.8731, 80.7718),
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.viewState.hospitals.map(hospital => {

      this.getCode(hospital, this.map);
    });
  }

  ngOnInit(): void {
    this.operation.start().then(() => {
      this.generateMap();
    });
  }

  ngAfterViewInit() {


  }

}
