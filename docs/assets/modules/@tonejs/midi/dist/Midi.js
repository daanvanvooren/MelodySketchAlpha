"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var midi_file_1 = require("../../../midi-file");
var Encode_1 = require("./Encode");
var Header_1 = require("./Header");
var Track_1 = require("./Track");
/**
 * The main midi parsing class
 */
var Midi = /** @class */ (function () {
    /**
     * Parse the midi data
     */
    function Midi(midiArray) {
        var _this = this;
        // parse the midi data if there is any
        var midiData = null;
        if (midiArray) {
            if (midiArray instanceof ArrayBuffer) {
                midiArray = new Uint8Array(midiArray);
            }
            midiData = midi_file_1.parseMidi(midiArray);
            // add the absolute times to each of the tracks
            midiData.tracks.forEach(function (track) {
                var currentTicks = 0;
                track.forEach(function (event) {
                    currentTicks += event.deltaTime;
                    event.absoluteTime = currentTicks;
                });
            });
        }
        this.header = new Header_1.Header(midiData);
        this.tracks = [];
        // parse the midi data
        if (midiArray) {
            // format 0, everything is on the same track
            this.tracks = midiData.tracks.map(function (trackData) { return new Track_1.Track(trackData, _this.header); });
            // if it's format 1 and there are no notes on the first track, remove it
            if (midiData.header.format === 1 && this.tracks[0].duration === 0) {
                this.tracks.shift();
            }
        }
    }
    /**
     * Download and parse the MIDI file. Returns a promise
     * which resolves to the generated midi file
     * @param url The url to fetch
     */
    Midi.fromUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, arrayBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 2:
                        arrayBuffer = _a.sent();
                        return [2 /*return*/, new Midi(arrayBuffer)];
                    case 3: throw new Error("could not load " + url);
                }
            });
        });
    };
    Object.defineProperty(Midi.prototype, "name", {
        /**
         * The name of the midi file, taken from the first track
         */
        get: function () {
            return this.header.name;
        },
        set: function (n) {
            this.header.name = n;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Midi.prototype, "duration", {
        /**
         * The total length of the file in seconds
         */
        get: function () {
            // get the max of the last note of all the tracks
            var durations = this.tracks.map(function (t) { return t.duration; });
            return Math.max.apply(Math, durations);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Midi.prototype, "durationTicks", {
        /**
         * The total length of the file in ticks
         */
        get: function () {
            // get the max of the last note of all the tracks
            var durationTicks = this.tracks.map(function (t) { return t.durationTicks; });
            return Math.max.apply(Math, durationTicks);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a track to the midi file
     */
    Midi.prototype.addTrack = function () {
        var track = new Track_1.Track(undefined, this.header);
        this.tracks.push(track);
        return track;
    };
    /**
     * Encode the midi as a Uint8Array.
     */
    Midi.prototype.toArray = function () {
        return Encode_1.encode(this);
    };
    /**
     * Convert the midi object to JSON.
     */
    Midi.prototype.toJSON = function () {
        return {
            header: this.header.toJSON(),
            tracks: this.tracks.map(function (track) { return track.toJSON(); }),
        };
    };
    /**
     * Parse a JSON representation of the object. Will overwrite the current
     * tracks and header.
     */
    Midi.prototype.fromJSON = function (json) {
        var _this = this;
        this.header = new Header_1.Header();
        this.header.fromJSON(json.header);
        this.tracks = json.tracks.map(function (trackJSON) {
            var track = new Track_1.Track(undefined, _this.header);
            track.fromJSON(trackJSON);
            return track;
        });
    };
    /**
     * Clone the entire object midi object
     */
    Midi.prototype.clone = function () {
        var midi = new Midi();
        midi.fromJSON(this.toJSON());
        return midi;
    };
    return Midi;
}());
exports.Midi = Midi;
//# sourceMappingURL=Midi.js.map