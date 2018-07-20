import { Injectable } from '@angular/core';

@Injectable()
export class LoopService {

  constructor() { }
  getDom(clas:string,options:Options){
    let opts=options;
    let doms=document.getElementsByClassName('clas');
  }
}
class Options{
    number:string;
}
