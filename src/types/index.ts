export type InteractionSymbolMap = {
  [symbol: string]: string;
};

export type Report = {
  id: string;
  sci: string;
  mappedSci?: string;
  symbolMap?: InteractionSymbolMap;
  coverageCriteria: CoverageCriteria;
  validSequenceTestCases: TestCase[];
  invalidSequenceTestCases: TestCase[];
  passed: boolean | null;
  comments: string;
};

export type CoverageCriteria = {
  validSequences: number;
  invalidSequences: number;
};

export type TestCase = {
  interactions: Interaction[];
  comment: string;
  passed: boolean | null;
};

export type Interaction = {
  symbol: string;
  checked: boolean;
  comment: string;
};
