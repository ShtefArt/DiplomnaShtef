import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { Event } from '../_models/event.model';
import { EventService } from '../_services/event.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  markers: google.maps.Marker[] = [];
  events: Event[] = [];
  map: any;
  userRoles: string[] = [];

  constructor(private readonly eventService: EventService, private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.userRoles = this.token.getUser().roles;

    let loader = new Loader({
      apiKey: environment.googleApiKey
    })

    loader.load().then(() => {
      this.eventService.getAll().subscribe(
        data => {
          this.events = data;
          this.initMap();
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    })
  }

  initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 13,
        center: { lat: 48.295066, lng: 25.935290 },
      }
    );
    this.map = map;
    const infoWindow = new google.maps.InfoWindow();

    this.events.forEach(event => {
      const marker = new google.maps.Marker({
        position: { lat: event.coordinates.lat, lng: event.coordinates.lng },
        map: map,
      });

      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(event.title);
        infoWindow.open(marker.getMap(), marker);
      });
    });
  }

  goToMarker(event: Event) {
    this.map.setZoom(17)
    this.map.panTo({ lng: event.coordinates.lng, lat: event.coordinates.lat });
  }

  editEvent(event: Event) {
    this.router.navigate(['event/' + event.id])
  }

  deleteEvent(event: Event) {
    this.eventService.delete(event.id).subscribe(() => {
      this.eventService.getAll().subscribe(
        data => {
          this.events = data;
          this.initMap();
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      )
    },
    err => {
      this.content = JSON.parse(err.error).message;
    });
  }

  isModerator(): boolean {
    return this.userRoles?.includes('ROLE_MODERATOR');
  }

}
