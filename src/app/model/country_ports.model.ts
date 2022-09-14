import { Port } from "./port.model"

export class CountryPorts {
  name!: string
  ports!: Port[]

  constructor(source: Partial<CountryPorts>) {
    Object.assign(this, source)
    source.ports?.map(orig => new Port(orig))
  }
}
