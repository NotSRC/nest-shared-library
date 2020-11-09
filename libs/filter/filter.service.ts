import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { DataBaseCondition, DataBaseOperator } from './@types/data-base-enums';
import { FilterInput } from './@types/filter-input';
import { FilterConditions } from './@types/filter-conditions';

export class FilterService {
  filters: FilterInput[] = [];

  constructor(filtersJson: string) {
    try {
      this.filters = plainToClass(
        FilterInput,
        JSON.parse(filtersJson) as FilterInput[],
      ) || [];
    } catch (e) {}
  }

  public validateFilters() {
    return Object.keys(this.filters)
      .map((key) =>
        validateSync(this.filters[key], {
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
      )
      .map((v) => (v.length ? v : null))
      .filter((v) => v);
  }

  public getAvailableFilters(): any[] {
    return this.buildNewQuery(this.filters, []);
  }

  private buildNewQuery(filters: FilterInput[], accum: Array<any>): any[] {
    return filters.reduce((acc, filter) => {
      const operator = DataBaseOperator.get(filter.operator);

      if (filter.children?.length) {
        if (!acc[operator]) {
          acc[operator] = [];
        }

        acc.push({ [operator]: this.buildNewQuery(filter.children, []) });
        return acc;
      } else {
        if (
          !filter.field ||
          !filter.condition ||
          !this.searchIsAvailable(filter.search)
        ) {
          return acc;
        }

        const condition = DataBaseCondition.get(filter.condition);
        const filterSearch = {
          [condition]: filter.search,
        };
        if (filter.condition == FilterConditions.Include) {
          filterSearch['$options'] = 'i';
        }

        acc.push({ [filter.field]: filterSearch });
        return acc;
      }
    }, accum);
  }

  private searchIsAvailable(search: any) {
    return search || search === false || search === 0 || search === null;
  }
}
