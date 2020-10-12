import { FilterConditions } from './filter-conditions';
import { FilterOperators } from './filter-operators';

export const DataBaseCondition = new Map([
  [FilterConditions.Equal, '$eq'],
  [FilterConditions.Greater, '$gt'],
  [FilterConditions.GreaterOrEqual, '$gte'],
  [FilterConditions.LessThen, '$lt'],
  [FilterConditions.LessThenOrEqual, '$lte'],
  [FilterConditions.Include, '$regex'],
]);

export const DataBaseOperator = new Map([
  [FilterOperators.And, '$and'],
  [FilterOperators.Or, '$or'],
]);
