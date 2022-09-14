import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryPorts } from '../model/country_ports.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  countriesPorts!: Record<string, string[]>
  routeForm!: FormGroup

  constructor(formBuilder: FormBuilder) {
    this.routeForm = formBuilder.group({
      originCountry: [null],
      originPort: [null],
      destinationCountry: [null],
      destinationPort: [null],
      resolution: [null]
    })
  }
}
// On va sans doute le repasser comme un data service
// Ce sera pour stocker les différents états des formulaires...
