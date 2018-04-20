import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dataFilter"
})
export class DataFilterPipe implements PipeTransform {
  transform(array: any[], query: string): any {
    if (!array) return [];
    if (!query) return array;
    query = query.toLowerCase();
    return array.filter(it => {
      return JSON.stringify(it)
        .toLowerCase()
        .includes(query);
    });
  }
}
