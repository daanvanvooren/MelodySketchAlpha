import { ControlChangeInterface } from "./ControlChange";
import { ControlChangesJSON } from "./ControlChanges";
import { Header } from "./Header";
import { Instrument, InstrumentJSON } from "./Instrument";
import { MidiTrackData } from "../../../midi-file";
import { Note, NoteInterface, NoteJSON } from "./Note";
/**
 * A Track is a collection of notes and controlChanges
 */
export declare class Track {
    /**
     * The name of the track
     */
    name: string;
    /**
     * The instrument associated with the track
     */
    instrument: Instrument;
    /**
     * The track's note events
     */
    notes: Note[];
    /**
     * The channel number of the track. Applies this channel
     * to all events associated with the channel
     */
    channel: number;
    /**
     * The control change events
     */
    controlChanges: import("./ControlChanges").ControlChanges;
    constructor(trackData: MidiTrackData, header: Header);
    /**
     * Add a note to the notes array
     * @param props The note properties to add
     */
    addNote(props?: Partial<NoteInterface>): this;
    /**
     * Add a control change to the track
     * @param props
     */
    addCC(props: Partial<ControlChangeInterface>): this;
    /**
     * The end time of the last event in the track
     */
    readonly duration: number;
    /**
     * The end time of the last event in the track in ticks
     */
    readonly durationTicks: number;
    /**
     * Assign the json values to this track
     */
    fromJSON(json: TrackJSON): void;
    /**
     * Convert the track into a JSON format
     */
    toJSON(): TrackJSON;
}
export interface TrackJSON {
    name: string;
    notes: NoteJSON[];
    channel: number;
    instrument: InstrumentJSON;
    controlChanges: ControlChangesJSON;
}
