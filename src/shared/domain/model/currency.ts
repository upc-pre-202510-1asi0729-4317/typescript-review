
type UppercaseLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

export type CurrencyCode = `${UppercaseLetter}${UppercaseLetter}${UppercaseLetter}`;


export class Currency {
    private readonly _code: CurrencyCode;

    constructor(code: CurrencyCode) {
        this._code = code;
    }

    public get code(): string {
        return this._code;
    }

}
