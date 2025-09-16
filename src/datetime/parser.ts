function* stringStream(input: string): Generator<string> {
    for (const char of input) {
        yield char;
    }
}

export class SimpleStringParser {
    private stream: Generator<string>;
    private lookupValue: string | null;

    public constructor(input: string) {
        this.stream = stringStream(input);
        this.lookupValue = null;
    }

    public expectNext(char: string): boolean {
        const next: string | null = this.next();
        return !!next && next == char;
    }

    public lookupNext(char: string): boolean {
        const lookup: string | null = this.lookup();
        return !!lookup && lookup == char;
    }

    public next(): string | null {
        if (this.lookupValue) {
            const next: string = this.lookupValue;
            this.lookupValue = null;
            return next;
        }

        const next: IteratorResult<string> = this.stream.next();

        if (next.done) {
            return null;
        }

        return next.value;
    }

    public lookup(): string | null {
        if (this.lookupValue) {
            return this.lookupValue;
        }
        return (this.lookupValue = this.next());
    }
}