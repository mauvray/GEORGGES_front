import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ClientService } from '../services/client.service';
import { FormService } from '../services/form.service';

// interface ConfigNode {
//   name: string;
//   children?: ConfigNode[]
// }

// const CONFIG_TREE: ConfigNode[] = [
//   {
//     name: 'Ship Parameters',
//     children:[
//       {
//         name: 'Type'
//       },
//       {
//         name: 'Load'
//       },
//       {
//         name: 'Propulsion',
//         children: [
//           {name: 'Engine'},
//           {name: 'Battery'},
//           {name: 'Fuel Cell'},
//         ]
//       },
//       {
//         name: 'Hull'
//       },
//       {
//         name: 'HVAC'
//       },
//     ]
//   },
//   {
//     name: 'Route',
//     children: [
//       {
//         name: 'Armateur route'
//       },
//       {
//         name: 'Free route'
//       }
//     ]
//   },
// ]



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit, OnDestroy {
  countriesPortsSubs!: Subscription;
  toShowSidenav: "Route" | "Ship" | "Landing" = "Landing"
  toShowForm: "Route" | "Ship" | "Landing" = "Landing";
  // treeControl = new NestedTreeControl<ConfigNode>(node => node.children);
  // dataSource = new MatTreeNestedDataSource<ConfigNode>();

  constructor(
    private client: ClientService,
    // private simulation: SimulationService,
    private form: FormService
    ) {
      // this.dataSource.data = CONFIG_TREE;
    }
  // On va d'abord faire un petit outil pour pouvoir sélectionner la route
  // de cette façon : pour origin et destination : pays puis port
  // dans cette onglet on fera un appel pour pouvoir tracer la route dès que l'utilisateur validera ses 2 ports
  // Après on pourra passer à la paramétrisation du moteur
  // On va donc avoir en terme de layout du form :
  //
  //
  // hasChild = (_: number, node: ConfigNode) => !!node.children && node.children.length > 0;

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
