declare module 'comlink-loader!*' {
  class WebpackWorker extends Worker {
    constructor();

    generateValidSequences(sci: string, validCovN: number): Promise<string[]>;

    generateInvalidSequences(sci: string, validCovN: number): Promise<string[]>;
  }

  export = WebpackWorker;
}
