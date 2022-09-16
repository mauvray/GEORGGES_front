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
  // suez!: boolean
  // panama!: boolean
  // malacca!: boolean
  // gibraltar!: boolean
  // dover!: boolean
  // babelmandeb!: boolean
  // kiel!: boolean
  // corinth!: boolean
  // northwest!: boolean
  // northeast!: boolean

  route!:{
    coordinates:number[][],
    type: string
  }
  // graph!:{
    data!:Object[]
    layout = {
      geo:{
        projection: {
          type: "equirectangular",
        }, // On va sans doute rajouter un switch pour sélectionner la projection
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
    config = {}//responsive:true}
  // } | null

  constructor(private form: FormService, private client: ClientService, private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.routeForm = this.formBuilder.group({
      originCountry: [null, [Validators.required]],
      originPort: [null, [Validators.required]],
      destinationCountry: [null, [Validators.required]],
      destinationPort: [null, [Validators.required]],
      resolution: [20, [Validators.required]],
      suez: [true, [Validators.required]],
      panama: [true, [Validators.required]],
      malacca: [true, [Validators.required]],
      gibraltar: [true, [Validators.required]],
      dover: [true, [Validators.required]],
      babelmandeb: [true, [Validators.required]],
      kiel: [true, [Validators.required]],
      corinth: [true, [Validators.required]],
      northwest: [false, [Validators.required]],
      northeast: [false, [Validators.required]],
    })
    while(!this.form.countriesPorts){
      await new Promise(r => setTimeout(r, 100));
    }
    this.countries = Array.from(Object.keys(this.form.countriesPorts));
    this.filteredOriginCountries = this.routeForm.controls["originCountry"].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountry(value|| '')),
    );
    this.filteredOriginPorts = this.routeForm.controls["originPort"].valueChanges.pipe(
      startWith(''),
      map(value => this._filterPort(value || '', this.routeForm.controls["originCountry"].value||''))
    );
    this.filteredDestinationCountries = this.routeForm.controls["destinationCountry"].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountry(value|| '')),
    );
    this.filteredDestinationPorts = this.routeForm.controls["destinationPort"].valueChanges.pipe(
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
      // let result = [];
      // for (let index = 0; index < this.countries.length; index++) {
      //   result.push(this.form.countriesPorts[this.countries[index]])
      // }
      // return result.flat()
      //TODO: test with a curated list of ports and countries
    }
    return this.form.countriesPorts[country]?.filter(port => port.toLowerCase().includes(filter_value))
  }


  async onSubmit(){
    // this.graph = null;
    this.waiting = true;
    this.form.routeForm = this.routeForm.value;
    console.log(this.routeForm.value);
    this.client.getRoute(this.form.routeForm).subscribe({
      next: data => this.route = data,
      error: (err) => {
        this.waiting = false;
        console.log(err)
      }
    })
    while(!this.route){
      await new Promise(r => setTimeout(r, 100));
    }
    console.log(this.route)
    this.data = [
      {
        lon: this.route.coordinates[0],
        lat: this.route.coordinates[1],
        type: 'scattergeo',
        mode: 'lines'
      }
    ]
    this.waiting = false

  }

  toggleProjection() {
    console.log('toggle')
    if (this.layout.geo.projection.type === 'equirectangular') {
      this.layout.geo.projection.type = 'orthographic'
    }
    else if (this.layout.geo.projection.type === 'orthographic') {
      this.layout.geo.projection.type = 'equirectangular'
    }
  }


    // this.graph = {
    //   data: [
    //     {
    //       lon: this.route.coordinates[0],
    //       lat: this.route.coordinates[1],
    //       type: 'scattergeo',
    //       mode: 'lines'
    //     }
    //   ],
    //   layout: {
    //     geo:{
    //       projection: {
    //         type: this.projection,
    //         // type: 'equirectangular',
    //       }, // On va sans doute rajouter un switch pour sélectionner la projection
    //       showocean: true,
    //       oceancolor: 'rgb(0, 255, 255)',
    //       showland: true,
    //       landcolor: 'rgb(230, 145, 56)',
    //       showlakes: true,
    //       lakecolor: 'rgb(0, 255, 255)',
    //       showcountries: true,
    //       lonaxis: {
    //           showgrid: true,
    //           gridcolor: 'rgb(102, 102, 102)'
    //       },
    //       lataxis: {
    //           showgrid: true,
    //           gridcolor: 'rgb(102, 102, 102)'
    //       }
    //     }
    //   },
    //   config:{responsive: true}
    // }

}
//Ship first, route... Propulsion instead of engine,
