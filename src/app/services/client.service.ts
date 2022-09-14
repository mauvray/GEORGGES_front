import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, share } from 'rxjs';
import { API_URL } from '../env';
import { CountryPorts } from '../model/country_ports.model';
import { Port } from '../model/port.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // countryPorts!: CountryPorts[]

  constructor(private http: HttpClient) { }

  // private static _handleError(err: HttpErrorResponse | any) {
  //   return Observable.throw(err.message || 'Error: Unable to complete request.');

  // }

  getPorts(): Observable<Record<string, string[]>> {
    return this.http
      .get<Record<string, string[]>>(`${API_URL}/countries_ports`)
      .pipe(share());


      // .subscribe(
      //   (data) => {
      //     console.log("data:", typeof(data));
      //     // ret_ports = data;
      //     // this.countryPorts = data;
      //     console.log("inside:", ret_ports)
      //   }
      // )

  }

  getRoute(params: Object): Observable<{coordinates:number[][], type:string}> {
    return this.http
      .post<{coordinates:number[][], type:string}>(`${API_URL}/route`, params)
      .pipe(share());
  }

}

    // map(data => Object.keys(data)
    // .map(key:number => data[key])
    // .subscribe((data: any) => console.log(data));
    // .subscribe((ports:string[])=>this.Ports = ports);

    // .subscribe((data:any) => console.log(data));
