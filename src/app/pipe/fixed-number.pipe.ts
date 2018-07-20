import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixedNumber'
})
export class FixedNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let toFixed;
    toFixed=parseInt(value).toFixed(2);
    return toFixed;
  }
}
