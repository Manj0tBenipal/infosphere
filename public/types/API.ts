export class API_RES {
  success : boolean
  res: any;
  err: string | null;
  constructor() {
    this.res = null;
    this.err = null;
    this.success = false
  }
}
