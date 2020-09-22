import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { DataBaseCondition } from './@types/data-base-conditions';
import { FilterInput } from './@types/filter-input';

interface AvailableCustomFilter {
  [key: string]: string;
}

export class FilterService {
  filters: FilterInput[] = [];

  constructor(filtersJson: string) {
    try {
      this.filters = plainToClass(
        FilterInput,
        JSON.parse(filtersJson) as FilterInput[],
      );
    } catch (e) {
    }
  }

  public validateFilters() {
    return this.filters
      .map(f =>
        validateSync(f, {
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
      )
      .map(v => (v.length ? v : null))
      .filter(v => v);
  }

  public getAvailableFilters(): AvailableCustomFilter {
    return this.buildQueryFilters();
  }

  private buildQueryFilters() {
    return this.filters.reduce((acc, filter) => {
      const condition = DataBaseCondition.get(filter.condition);
      if (acc[filter.field]) {
        acc[filter.field][condition] = filter.search;
      } else {
        acc[filter.field] = {
          [condition]: filter.search,
        };
      }
      return acc;
    }, {});
  }
}
