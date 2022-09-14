export class Port {
  country!: Number
  latitude!: Number
  longitude!: Number
  name!: string

  constructor(source: Partial<Port>) {
    Object.assign(this, source)
    // console.log(this)
  }
}
