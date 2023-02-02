export function removeDuplicateObjects(arr, property) {
  return [...new Map(arr.map((obj) => [obj[property], obj])).values()];
}
