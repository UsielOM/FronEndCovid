import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }

login(Email: string, password: string): Observable<any>{
  return this.http.post<any>(environment.apiUrl + "/login",{
    Email,
    password
  });
}

loginm(Email: string, password: string): Observable<any>{
    return this.http.post<any>(environment.apiUrl + "/loginmedic",{
      Email,
      password
    });
  }

}
