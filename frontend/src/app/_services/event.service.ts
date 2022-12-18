import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Event } from "../_models/event.model";

const API_URL = 'http://localhost:8080/api/events/';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(API_URL);
  }

  getOne(id: number): Observable<Event> {
    return this.http.get<Event>(API_URL + id);
  }

  create(event: Event): Observable<Event> {
    const headers = new HttpHeaders()
      .append('Access-Control-Allow-Origin', '*');
    return this.http.post<Event>(API_URL + 'new', event, { headers });
  }
  
  update(event: Event, id: number): Observable<Event> {
    const headers = new HttpHeaders()
      .append('Access-Control-Allow-Origin', '*');
    return this.http.put<Event>(API_URL + id, event, { headers });
  }

  delete(id: number): Observable<any> {
    const headers = new HttpHeaders()
      .append('Access-Control-Allow-Origin', '*');
    return this.http.delete(API_URL + id, { headers });
  }
}