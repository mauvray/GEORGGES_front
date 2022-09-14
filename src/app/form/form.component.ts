import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryPorts } from '../model/country_ports.model';
import { Port } from '../model/port.model';
import { ClientService } from '../services/client.service';
import { FormService } from '../services/form.service';
import { SimulationService } from '../services/simulation.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit, OnDestroy {
  countriesPortsSubs!: Subscription
  toShow: "Route" | "Engine" = "Route"

  constructor(
    private client: ClientService,
    // private simulation: SimulationService,
    private form: FormService
    ) { }
  // On va d'abord faire un petit outil pour pouvoir sélectionner la route
  // de cette façon : pour origin et destination : pays puis port
  // dans cette onglet on fera un appel pour pouvoir tracer la route dès que l'utilisateur validera ses 2 ports
  // Après on pourra passer à la paramétrisation du moteur
  // On va donc avoir en terme de layout du form :
  //
  //

  async ngOnInit(): Promise<void> {
    if (!this.form.countriesPorts) {
      this.countriesPortsSubs = this.client.getPorts().subscribe(countriesPorts => {
          this.form.countriesPorts = countriesPorts
        }
      )
      while(!this.form.countriesPorts){
        await new Promise(r => setTimeout(r, 100));
      }
    }
    // console.log("CountriesPort acquired");

  }

  ngOnDestroy(): void {
      this.countriesPortsSubs.unsubscribe()
  }

}
