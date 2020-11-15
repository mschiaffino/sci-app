import { SciParser } from 'sci-parser';

export function generateValidSequences(
  sci: string,
  validCovN: number
): string[] {
  const parsedSci = SciParser.parse(sci);
  return parsedSci ? parsedSci.validSequences(validCovN) : [];
}

export function generateInvalidSequences(
  sci: string,
  invalidCovN: number
): string[] {
  const parsedSci = SciParser.parse(sci);
  return parsedSci ? parsedSci.invalidSequences(invalidCovN) : [];
}
