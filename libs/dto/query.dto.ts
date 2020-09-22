import { Allow, IsJSON, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export class QueryDto {
  @Allow()
  @Min(1)
  @Transform(value => parseInt(value || 1, 10))
  page: number = 1;

  @Allow()
  @Max(99)
  @Transform(value => parseInt(value || 10, 10))
  perPage: number = 10;

  @Allow()
  @IsJSON()
  @IsOptional()
  filter: string;

  @Allow()
  private sortField: string = 'createdAt';

  @Allow()
  private sortDirection: SortDirection = SortDirection.Asc;

  getSort() {
    return {
      [this.sortField]: this.sortDirection === SortDirection.Asc ? -1 : 1,
    };
  }
}
