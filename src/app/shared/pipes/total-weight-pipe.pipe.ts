import { Pipe, PipeTransform } from '@angular/core';
import { WasteItem } from '../../core/models/collect-request.model';

@Pipe({
  name: 'totalWeightPipe'
})
export class TotalWeightPipePipe implements PipeTransform {

  transform(wasteItems: WasteItem[]): number {
    return wasteItems.reduce((total, item) => total + item.estimatedWeight, 0);
  }

}
