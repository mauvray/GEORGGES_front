import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-propulsion-form',
  templateUrl: './propulsion-form.component.html',
  styleUrls: ['./propulsion-form.component.sass']
})
export class PropulsionFormComponent implements OnInit {

  propulsionType!: "engine" | "fuelcell"

  constructor() { }

  ngOnInit(): void {
  }

}
