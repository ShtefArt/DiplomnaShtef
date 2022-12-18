import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { Coordinate } from '../_models/coordinate.model';
import { Event } from '../_models/event.model';
import { EventService } from '../_services/event.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css'],
})
export class CreateEventComponent implements OnInit {
  itemId: number = 0;
  markers: google.maps.Marker[] = [];
  form = this.formBuilder.group({
    title: [],
    description: [],
  });

  constructor(private eventService: EventService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.url[1]?.path);
    
    if(this.itemId) {
      this.eventService.getOne(this.itemId).subscribe((response) =>{
        this.form.controls['title'].setValue(response.title);
        this.form.controls['description'].setValue(response.description);
        let loader = new Loader({
          apiKey: environment.googleApiKey
        })
    
        loader.load().then(() => {
          this.initMap(response.coordinates.lng, response.coordinates.lat);
        })
      })
    } else {
      let loader = new Loader({
        apiKey: environment.googleApiKey
      })
  
      loader.load().then(() => {
        this.initMap();
      })
    }
    
  }

  initMap(_lng?: number, _lat?: number): void {
    if (_lng && _lat) {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 13,
          center: { lat: _lat, lng: _lng },
        }
      );
      const marker = new google.maps.Marker({
        position: { lat: _lat, lng: _lng },
        map: map,
      });
      this.markers.push(marker);
      map.addListener("click", (e: any) => {
        this.placeMarkerAndPanTo(e.latLng, map);
      });
    } else {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 13,
          center: { lat: 48.295066, lng: 25.935290 },
        }
      );
    
      map.addListener("click", (e: any) => {
        this.placeMarkerAndPanTo(e.latLng, map);
      });
    }

  }

  placeMarkerAndPanTo(latLng: google.maps.LatLng, map: google.maps.Map) {
    this.markers.forEach((marker) => marker.setMap(null));
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
    this.markers.push(marker);
    map.panTo(latLng);
  }

  saveEvent() {
    const eventToSave = {} as Event;
    const markerPosition = this.markers.pop()?.getPosition();
    eventToSave.title = this.form?.controls['title'].value;
    eventToSave.description = this.form?.controls['description'].value;
    const coordinate = {} as Coordinate
    if(markerPosition){
      coordinate.lat = markerPosition.lat();
      coordinate.lng = markerPosition.lng();
    }
    eventToSave.coordinates = coordinate;
    if(this.itemId){
      this.eventService.update(eventToSave, this.itemId).subscribe(() => this.router.navigate(['events']));
    } else {
      this.eventService.create(eventToSave).subscribe(() => this.router.navigate(['events']));
    }
  }

  cancel() {
    this.router.navigate(['user']);
  }
}
