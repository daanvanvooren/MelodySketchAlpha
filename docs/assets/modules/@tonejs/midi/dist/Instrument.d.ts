import { MidiTrackData } from "../../../midi-file";
/**
 * Describes the midi instrument of a track
 */
export declare class Instrument {
    /**
     * The instrument number
     */
    number: number;
    /**
     * @param {Array} [trackData]
     * @param {Track} track
     */
    constructor(trackData: MidiTrackData, track: any);
    /**
     * The common name of the instrument
     */
    name: string;
    /**
     * The instrument family, e.g. "piano".
     */
    readonly family: string;
    /**
     * If the instrument is a percussion instrument
     */
    readonly percussion: boolean;
    /**
     * Convert it to JSON form
     */
    toJSON(): InstrumentJSON;
    /**
     * Convert from JSON form
     */
    fromJSON(json: InstrumentJSON): void;
}
export interface InstrumentJSON {
    number: number;
    name: string;
    family: string;
}
