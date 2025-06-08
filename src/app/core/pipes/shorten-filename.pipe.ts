import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenFilename',
})
export class ShortenFilenamePipe implements PipeTransform {

  transform(value: string, maxLength: number = 20): string {
    if (!value) return '';
    
    const extension = value.split('.').pop();
    const nameWithoutExtension = value.substring(0, value.lastIndexOf('.'));

    if (nameWithoutExtension.length <= maxLength) {
      return value;
    }

    const truncatedName = nameWithoutExtension.substring(0, maxLength) + '...';
    return `${truncatedName}.${extension}`;
  }

}
