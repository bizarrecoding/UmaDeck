/**
 * Capitalizes the first character of the given string.
 * Returns an empty string for empty input.
 */
export const capitalize = (str?: string): string =>{
  if(!str) return '';
  return str.length === 0 ? '' : str.charAt(0).toUpperCase() + str.slice(1);
}
