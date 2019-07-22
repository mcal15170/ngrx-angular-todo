import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ISELECT } from '../store/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  serverURl = 'http://127.0.0.1:3000/';

  httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/Json'})
  };
  constructor(private http: HttpClient) { }

  getCollection(): Observable<ISELECT[]> {
    return this.http.get<ISELECT[]>(this.serverURl + 'getSelect');
  }
}
