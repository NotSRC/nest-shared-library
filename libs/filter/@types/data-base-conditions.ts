import { FilterConditions } from './filter-conditions';

export const DataBaseCondition = new Map([
  [FilterConditions.Equal, '$eq'],
  [FilterConditions.Greater, '$gt'],
  [FilterConditions.GreaterOrEqual, '$gte'],
  [FilterConditions.LessThen, '$lt'],
  [FilterConditions.LessThenOrEqual, '$lte'],
  [FilterConditions.Include, '$regex'],
]);
