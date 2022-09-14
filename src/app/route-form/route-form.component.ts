import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ClientService } from '../services/client.service';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.sass']
})
export class RouteFormComponent implements OnInit {
  routeForm!: FormGroup
  // countriesPortsSubs!: Subscription
  countries!: string[]
  filteredOriginCountries!: Observable<string[]>
  filteredDestinationCountries!: Observable<string[]>
  filteredOriginPorts!: Observable<string[]|undefined>
  filteredDestinationPorts!: Observable<string[]|undefined>
  advanced = false
  waiting = false
  resolutions = [5,10,20,50,100]
  roads!: {
    suez: 0|1,
    panama: 0|1,
    malacca: 0|1,
    gibraltar: 0|1,
    dover: 0|1,
    babelmandeb: 0|1,
    kiel: 0|1,
    corinth: 0|1,
    northwest: 0|1,
    northeast: 0|1,
  }
  route!:{
    coordinates:number[][],
    type: string
  }
  graph!:{
    data:Object[],
    layout:Object
  }

  constructor(private form: FormService, private client: ClientService, private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.routeForm = this.formBuilder.group({
      originCountry: [null, [Validators.required]],
      origin_port: [null, [Validators.required]],
      destinationCountry: [null, [Validators.required]],
      destination_port: [null, [Validators.required]],
      resolution: [20, [Validators.required]],
      // roads: [null]
    })
    while(!this.form.countriesPorts){
      await new Promise(r => setTimeout(r, 100));
    }
    this.countries = Array.from(Object.keys(this.form.countriesPorts));
    this.filteredOriginCountries = this.routeForm.controls["originCountry"].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountry(value|| '')),
    );
    this.filteredOriginPorts = this.routeForm.controls["origin_port"].valueChanges.pipe(
      startWith(''),
      map(value => this._filterPort(value || '', this.routeForm.controls["originCountry"].value||''))
    );
    this.filteredDestinationCountries = this.routeForm.controls["destinationCountry"].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountry(value|| '')),
    );
    this.filteredDestinationPorts = this.routeForm.controls["destination_port"].valueChanges.pipe(
      startWith(''),
      map(value => this._filterPort(value || '', this.routeForm.controls["destinationCountry"].value||''))
    );

  }

  private _filterCountry(value: string): string[] {
    const filter_Value = value.toLowerCase();
    return this.countries.filter(option => option.toLowerCase().includes(filter_Value));
  }

  private _filterPort(value: string, country: string): string[] | undefined {
    const filter_value = value.toLowerCase();
    if (country === '') {
      console.log("empty country");
    }
    return this.form.countriesPorts[country]?.filter(port => port.toLowerCase().includes(filter_value))
  }


  async onSubmit(){
    this.waiting = true;
    this.form.routeForm = this.routeForm.value;
    console.log(this.routeForm.value);
    this.client.getRoute(this.form.routeForm).subscribe(
      data => this.route = data,
      err => this.waiting = false)
    while(!this.route){
      await new Promise(r => setTimeout(r, 100));
    }
    console.log(this.route)
    this.graph = {
      data: [
        {
          lon: this.route.coordinates[0],
          lat: this.route.coordinates[1],
          type: 'scattergeo',
          mode: 'lines'
        }
      ],
      layout: {
        geo:{
          // projection: {
            // type: 'orthographic',
            // type: 'equirectangular',
          // }, // On va sans doute rajouter un switch pour sélectionner la projection
          showocean: true,
          oceancolor: 'rgb(0, 255, 255)',
          showland: true,
          landcolor: 'rgb(230, 145, 56)',
          showlakes: true,
          lakecolor: 'rgb(0, 255, 255)',
          showcountries: true,
          lonaxis: {
              showgrid: true,
              gridcolor: 'rgb(102, 102, 102)'
          },
          lataxis: {
              showgrid: true,
              gridcolor: 'rgb(102, 102, 102)'
          }
        }
      }
    }
    this.waiting = false

  }

}
