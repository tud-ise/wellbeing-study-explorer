import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
})
export class KeysPipe implements PipeTransform {
  transform<T>(value: T): string[] {
    return Object.keys(value);
  }
}
