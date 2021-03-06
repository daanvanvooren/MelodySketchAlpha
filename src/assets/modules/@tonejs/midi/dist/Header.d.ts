import { MidiData } from "../../../midi-file";
export interface TempoEvent {
    ticks: number;
    bpm: number;
    time?: number;
}
export interface TimeSignatureEvent {
    ticks: number;
    timeSignature: number[];
    measures?: number;
}
export interface MetaEvent {
    text: string;
    type: string;
    ticks: number;
}
export interface KeySignatureEvent {
    ticks: number;
    key: string;
    scale: string;
}
export declare const keySignatureKeys: string[];
/** The parsed midi file header */
export declare class Header {
    /**
     * The array of all the tempo events
     */
    tempos: TempoEvent[];
    /**
     * The time signatures
     */
    timeSignatures: TimeSignatureEvent[];
    /**
     * The time signatures
     */
    keySignatures: KeySignatureEvent[];
    /**
     * Additional meta events
     */
    meta: MetaEvent[];
    /**
     * The name of the midi file
     */
    name: string;
    constructor(midiData?: MidiData);
    /**
     * This must be invoked after any changes are made to the tempo array
     * or the timeSignature array for the updated values to be reflected.
     */
    update(): void;
    /**
     * Convert ticks into seconds based on the tempo changes
     */
    ticksToSeconds(ticks: number): number;
    /**
     * Convert ticks into measures based off of the time signatures
     */
    ticksToMeasures(ticks: number): number;
    /**
     * The number of ticks per quarter note
     */
    readonly ppq: number;
    /**
     * Convert seconds to ticks based on the tempo events
     */
    secondsToTicks(seconds: number): number;
    /**
     * Convert the header into an object.
     */
    toJSON(): HeaderJSON;
    /**
     * parse a header json object.
     */
    fromJSON(json: HeaderJSON): void;
}
export interface HeaderJSON {
    name: string;
    ppq: number;
    meta: MetaEvent[];
    tempos: TempoEvent[];
    timeSignatures: TimeSignatureEvent[];
    keySignatures: KeySignatureEvent[];
}
