export function TransformEnumToArray(value: Object) {
  return Object.entries(value).map(e => e[1]);
}
