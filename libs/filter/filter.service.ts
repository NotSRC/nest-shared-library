import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { DataBaseCondition, DataBaseOperator } from './@types/data-base-enums';
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
    } catch (e) {}
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

  public getAvailableFiltersWithChildren() {
    return this.buildNewQuery(this.filters, {});
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

  private buildNewQuery(filters: FilterInput[], accum: Object) {
    return filters.reduce((acc, filter) => {
      const operator = DataBaseOperator.get(filter.operator);

      let childFilters = {};
      if (filter.children?.length) {
        childFilters = this.buildNewQuery(filter.children, {});
      } else {
        if (!filter.field || !filter.condition || !filter.search) {
          return acc;
        }

        const condition = DataBaseCondition.get(filter.condition);
        childFilters = {
          [filter.field]: {
            [condition]: filter.search,
          },
        };
      }

      if (!acc[operator]) {
        acc[operator] = [];
      }

      acc[operator].push(childFilters);

      return acc;
    }, accum);
  }
}
