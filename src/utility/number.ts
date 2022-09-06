export function useOverflow(number: number | undefined, cut: number = 1000) {
  if (!number) {
    return 0;
  }
  if (number >= cut) {
    return `${cut - 1}+`;
  } else {
    return number;
  }
}
