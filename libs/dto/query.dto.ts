import { Allow, IsEnum, IsJSON, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export class QueryDto {
  @Allow()
  @Min(1)
  @IsOptional()
  @Transform(value => parseInt(value || 1, 10))
  page?: number = 1;

  @Allow()
  @Max(99)
  @Min(1)
  @IsOptional()
  @Transform(value => parseInt(value || 10, 10))
  limit?: number = 25;

  @Allow()
  @IsJSON()
  @IsOptional()
  filter?: string;

  @Allow()
  private sortField: string = 'createdAt';

  @Allow()
  @IsEnum(SortDirection, { each: true })
  private sortDirection: SortDirection = SortDirection.Asc;

  getSort?() {
    return {
      [this.sortField]: this.sortDirection === SortDirection.Asc ? 1 : -1,
    };
  }
}
