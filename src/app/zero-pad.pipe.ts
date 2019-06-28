import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroPad'
})
export class ZeroPadPipe implements PipeTransform {

  transform(id: number): any {
    return (id < 100 ? '0' : '') + (id < 10 ? '0' : '') + id;
  }

}
