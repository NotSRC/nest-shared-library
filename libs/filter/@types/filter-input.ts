import { Allow, IsEnum, IsNotEmpty, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { FilterConditions } from './filter-conditions';
import { FilterOperators } from './filter-operators';
import { Type } from 'class-transformer';

export class FilterInput {

  /**
   * Filter fields
   */
  @Allow()
  @IsNotEmpty()
  @ValidateIf(o => !o.children?.length)
  field?: string;

  @Allow()
  @IsNotEmpty()
  @ValidateIf(o => !o.children?.length)
  search?: string | number | boolean;

  @Allow()
  @IsOptional()
  @IsEnum(FilterConditions, { each: true })
  condition?: FilterConditions;

  /**
   * Group fields
   */
  @Allow()
  @IsNotEmpty()
  @ValidateIf(o => o.children?.length)
  @IsEnum(FilterOperators, { each: true })
  operator?: FilterOperators = FilterOperators.And;

  @Allow()
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterInput)
  children?: FilterInput[];
}
