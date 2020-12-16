declare var global: any

// Based on my research I'm not sure fi this is a linting issue or what but it doesn't really seem worth resolving.
declare namespace NodeJS {
    interface Global {
        Xal: Xal
        Log: Logger
    }
}

/**
 * My custom library for global constants, functions, and utilities.
 */
interface Xal {
    /**
     * Converts a numerical return value from an in-game method to the text value from the global object
     * Reference: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
     * @param {number|string} value - Return value
     * @param {object} object - The GLOBAL object which we pass in by default so we can search it
     */
    getGlobalKeyByValue (value, object = global): string | number
    STATE_SPAWNING: 0
    STATE_MOVING: 1,
    STATE_HARVESTING: 2,
    STATE_DEPOSIT_RESOURCE: 3,
    STATE_GRAB_RESOURCE: 4,
    STATE_IDLE: 5,
    STATE_DISPATCH: 6,

    TERMINAL_ENERGY_STORAGE_TARGET: 10000,
    TERMINAL_OXYGEN_STORAGE_TARGET: 10000,
    TERMINAL_UTRIUM_STORAGE_TARGET: 10000,

    STORAGE_ENERGY_STORAGE_TARGET: 100000,
    STORAGE_UTRIUM_STORAGE_TARGET: 100000
}
declare const Xal: Xal

/**
 * My custom global object containing logging functions and settings.
 */
interface Log {
    /**
     * @param {Object} options - Object for passing in multiple parameters.
     * @param {string} t - (Type) The type of output message you want this to be [Alert, Error, Warning, Info, Debug]
     * @param {string} mN - (Module Name) The name of the module the output is coming from
     * @param {boolean} [lb] - (Line Break) - Indicate if you want a line break before this message
     * @param {boolean} [i] - (Indent) Indicate if you want to indent this message
     * @param {boolean} [gt] - (Game Tick) Indicate if you want to include the current Game Tick in this message
     * @param {object} [obj] - (Object) Indicate an object you want to include in this message
     * @param {boolean} [so] - (Stringify) Indicate if you want to stringify the included object in this message
     * @param {string} message - The message you want to display
     */
    Output (options: { t: string, mN: string, lb?: boolean, i?: boolean, gt?: boolean, obj?: object, so?: boolean }, message: string, any?: any): void
}
declare const Log: Log

interface Game {
    myRooms: any[];
}

interface Memory {
    logging: any;
    settings: any;
}

interface RoomMemory {
    sources: any;
    minerals: any;
    mineral: any;
    construction: any;
    extractor: any;
}

interface Room {
    mineral: any;
    extractor: any;
    sources: any;
}

interface CreepMemory {
    containerNearControllerID: string;
    energySource: string;
    hauling: boolean;
    role: string;
    state: number;
}
