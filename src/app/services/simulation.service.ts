import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Result } from '../model/result.model';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  computed: boolean = false;
  route!: Result; // It will be a result with x as longitude and y as latitude
  results!: Result[];
  parameters!: Record<string, Object>;

  constructor(private http: HttpClient) { }

  // get_route(origin, destination)
}
