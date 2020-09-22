import { Allow, IsNotEmpty } from 'class-validator';
import { FilterConditions } from './filter-conditions';

export class FilterInput {
  @Allow()
  @IsNotEmpty()
  field: string;

  @Allow()
  @IsNotEmpty()
  search: string | number | boolean;

  @Allow()
  @IsNotEmpty()
  condition: FilterConditions;
}
