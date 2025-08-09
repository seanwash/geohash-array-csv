export interface ConvertToCsvResult {
    csv: string;
    error?: string;
}

const ERROR_EMPTY_INPUT = "Please paste your array";
const ERROR_NO_ITEMS = "No valid items found in the array";

export function convertToCsv(input: string, header: string = ""): ConvertToCsvResult {
    const trimmedInput = input.trim();
    if (!trimmedInput) return {csv: "", error: ERROR_EMPTY_INPUT};

    const normalized = stripOuterBrackets(trimmedInput);
    const items = splitAndCleanItems(normalized);
    if (items.length === 0) return {csv: "", error: ERROR_NO_ITEMS};

    const trimmedHeader = header.trim();
    const csv = trimmedHeader ? [trimmedHeader, ...items].join("\n") : items.join("\n");

    return {csv};
}

function stripOuterBrackets(value: string): string {
    return value.replace(/^\[/, "").replace(/\]$/, "");
}

function splitAndCleanItems(value: string): string[] {
    return value
        .split(",")
        .map((s) => unquote(s.trim()))
        .filter((s) => s.length > 0);
}

function unquote(value: string): string {
    return value.replace(/^["']|["']$/g, "").trim();
}