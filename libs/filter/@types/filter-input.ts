import { Allow, IsOptional } from 'class-validator';
import { FilterConditions } from './filter-conditions';
import { FilterOperators } from './filter-operators';
import { Type } from 'class-transformer';

export class FilterInput {
  @Allow()
  @IsOptional()
  field?: string;

  @Allow()
  @IsOptional()
  search?: string | number | boolean;

  @Allow()
  @IsOptional()
  condition?: FilterConditions;

  @Allow()
  @IsOptional()
  operator: FilterOperators = FilterOperators.And;

  @Allow()
  @IsOptional()
  @Type(() => FilterInput)
  children?: FilterInput[];
}
