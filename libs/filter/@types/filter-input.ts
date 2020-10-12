import { Allow, IsEnum, IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';
import { FilterConditions } from './filter-conditions';
import { FilterOperators } from './filter-operators';
import { Type } from 'class-transformer';

export class FilterInput {
  @Allow()
  @IsNotEmpty()
  @ValidateIf(o => !o.children?.length)
  field?: string;

  @Allow()
  @IsNotEmpty()
  @ValidateIf(o => !o.children?.length)
  search?: string | number | boolean;

  @Allow()
  @IsNotEmpty()
  @ValidateIf(o => !o.children?.length)
  @IsEnum(FilterConditions, { each: true })
  condition?: FilterConditions;

  @Allow()
  @IsNotEmpty()
  @ValidateIf(ValidateIsIsNotFilter)
  @IsEnum(FilterOperators, { each: true })
  operator?: FilterOperators = FilterOperators.And;

  @Allow()
  @IsNotEmpty()
  @ValidateNested()
  @ValidateIf(ValidateIsIsNotFilter)
  @Type(() => FilterInput)
  children?: FilterInput[];
}

function ValidateIsIsNotFilter(f: any) {
  return f.field && f.search && f.condition;
}
