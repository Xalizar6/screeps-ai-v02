/* This header is placed at the beginning of the output file and defines the
	special `__require`, `__getFilename`, and `__getDirname` functions.
*/
(function() {
	/* __modules is an Array of functions; each function is a module added
		to the project */
var __modules = {},
	/* __modulesCache is an Array of cached modules, much like
		`require.cache`.  Once a module is executed, it is cached. */
	__modulesCache = {},
	/* __moduleIsCached - an Array of booleans, `true` if module is cached. */
	__moduleIsCached = {};
/* If the module with the specified `uid` is cached, return it;
	otherwise, execute and cache it first. */
function __require(uid, parentUid) {
	if(!__moduleIsCached[uid]) {
		// Populate the cache initially with an empty `exports` Object
		__modulesCache[uid] = {"exports": {}, "loaded": false};
		__moduleIsCached[uid] = true;
		if(uid === 0 && typeof require === "function") {
			require.main = __modulesCache[0];
		} else {
			__modulesCache[uid].parent = __modulesCache[parentUid];
		}
		/* Note: if this module requires itself, or if its depenedencies
			require it, they will only see an empty Object for now */
		// Now load the module
		__modules[uid].call(this, __modulesCache[uid], __modulesCache[uid].exports);
		__modulesCache[uid].loaded = true;
	}
	return __modulesCache[uid].exports;
}
/* This function is the replacement for all `__filename` references within a
	project file.  The idea is to return the correct `__filename` as if the
	file was not concatenated at all.  Therefore, we should return the
	filename relative to the output file's path.

	`path` is the path relative to the output file's path at the time the
	project file was concatenated and added to the output file.
*/
function __getFilename(path) {
	return require("path").resolve(__dirname + "/" + path);
}
/* Same deal as __getFilename.
	`path` is the path relative to the output file's path at the time the
	project file was concatenated and added to the output file.
*/
function __getDirname(path) {
	return require("path").resolve(__dirname + "/" + path + "/../");
}
/********** End of header **********/
/********** Start module 0: D:\Games\Screeps\screeps-ai-v02\src\main.js **********/
__modules[0] = function(module, exports) {
const creepLogic = __require(1,0)
const roomLogic = __require(2,0)
const prototypes = __require(3,0)
const utils = __require(4,0)

module.exports.loop = function () {
  Log.Output({ t: 'info', mN: 'main', lb: true, gt: true }, 'Begin - Main loop routine')
  const timer = Game.cpu.getUsed()
  Game.myRooms = _.filter(Game.rooms, r => r.controller && r.controller.level > 0 && r.controller.my)
  _.forEach(Game.myRooms, r => roomLogic.spawning(r))
  for (const name in Game.creeps) {
    const creep = Game.creeps[name]

    const role = creep.memory.role
    if (creepLogic[role]) {
      creepLogic[role].run(creep)
    }
  }
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name]
      console.log('Clearing non-existing creep memory:', name)
    }
  }
  Log.Output({ t: 'Info', mN: 'main', gt: true }, `End - Main loop routine. CPU used: ${Game.cpu.getUsed() - timer}`)
}

return module.exports;
}
/********** End of module 0: D:\Games\Screeps\screeps-ai-v02\src\main.js **********/
/********** Start module 1: D:\Games\Screeps\screeps-ai-v02\src\creeps\index.js **********/
__modules[1] = function(module, exports) {
const creepLogic = {
  harvester: __require(5,1),
  upgrader: __require(6,1)
}

module.exports = creepLogic

return module.exports;
}
/********** End of module 1: D:\Games\Screeps\screeps-ai-v02\src\creeps\index.js **********/
/********** Start module 2: D:\Games\Screeps\screeps-ai-v02\src\room\index.js **********/
__modules[2] = function(module, exports) {
let roomLogic = {
    spawning:     __require(7,2),
}

module.exports = roomLogic;
return module.exports;
}
/********** End of module 2: D:\Games\Screeps\screeps-ai-v02\src\room\index.js **********/
/********** Start module 3: D:\Games\Screeps\screeps-ai-v02\src\prototypes\index.js **********/
__modules[3] = function(module, exports) {
// eslint-disable-next-line no-unused-vars
const files = {
  creep: __require(8,3)
}

return module.exports;
}
/********** End of module 3: D:\Games\Screeps\screeps-ai-v02\src\prototypes\index.js **********/
/********** Start module 4: D:\Games\Screeps\screeps-ai-v02\src\utils\index.js **********/
__modules[4] = function(module, exports) {
// eslint-disable-next-line no-unused-vars
const files = {
  memory: __require(9,4),
  globals: __require(10,4),
  constants: __require(11,4),
  log: __require(12,4)
}

return module.exports;
}
/********** End of module 4: D:\Games\Screeps\screeps-ai-v02\src\utils\index.js **********/
/********** Start module 5: D:\Games\Screeps\screeps-ai-v02\src\creeps\harvester.js **********/
__modules[5] = function(module, exports) {
const harvester = {

  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.store.getFreeCapacity() > 0) {
      const sources = creep.room.find(FIND_SOURCES)
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0])
      }
    } else {
      creep.sayHello()

      if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns.Spawn1)
      }
    }
  },
  spawn: function (room) {
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.room.name === room.name)

    if (harvesters.length < 2) {
      return true
    }
  },
  spawnData: function (room) {
    const name = 'Harvester' + Game.time
    const body = [WORK, CARRY, MOVE]
    const memory = {
      role: 'harvester'
    }

    return {
      name,
      body,
      memory
    }
  }
}

module.exports = harvester

return module.exports;
}
/********** End of module 5: D:\Games\Screeps\screeps-ai-v02\src\creeps\harvester.js **********/
/********** Start module 6: D:\Games\Screeps\screeps-ai-v02\src\creeps\upgrader.js **********/
__modules[6] = function(module, exports) {
var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.store[RESOURCE_ENERGY] == 0) {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    } else {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  },
  spawn: function (room) {
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == room.name);

    if (upgraders.length < 2) {
      return true;
    }
  },
  spawnData: function (room) {
    let name = 'Upgrader' + Game.time;
    let body = [WORK, CARRY, MOVE];
    let memory = {
      role: 'upgrader'
    };

    return {
      name,
      body,
      memory
    };
  }
};

module.exports = roleUpgrader;

return module.exports;
}
/********** End of module 6: D:\Games\Screeps\screeps-ai-v02\src\creeps\upgrader.js **********/
/********** Start module 7: D:\Games\Screeps\screeps-ai-v02\src\room\spawning.js **********/
__modules[7] = function(module, exports) {
const creepLogic = __require(1,7)
const creepTypes = _.keys(creepLogic)

/* global FIND_MY_SPAWNS */

function spawnCreeps (room) {
  Log.Output({ t: 'info', mN: 'spawning', i: true }, 'Begin - spawnCreeps routine')
  const timer = Game.cpu.getUsed()
  const creepTypeNeeded = _.find(creepTypes, function (type) {
    return creepLogic[type].spawn(room)
  })
  const creepSpawnData = creepLogic[creepTypeNeeded] && creepLogic[creepTypeNeeded].spawnData(room)

  if (creepSpawnData) {
    const spawn = room.find(FIND_MY_SPAWNS)[0]
    const result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {
      memory: creepSpawnData.memory
    })

    Log.Output({ t: 'event', mN: 'spawning', i: true }, `Tried to Spawn a [${creepTypeNeeded}] with result [${Xal.getGlobalKeyByValue(result)}]`)
  }

  Log.Output({ t: 'Info', mN: 'spawning', i: true }, `End - spawnCreeps routine. CPU used: ${Game.cpu.getUsed() - timer}`)
}

module.exports = spawnCreeps

return module.exports;
}
/********** End of module 7: D:\Games\Screeps\screeps-ai-v02\src\room\spawning.js **********/
/********** Start module 8: D:\Games\Screeps\screeps-ai-v02\src\prototypes\creep.js **********/
__modules[8] = function(module, exports) {
Creep.prototype.sayHello = function sayHello () {
  this.say('Hello', true)
}

return module.exports;
}
/********** End of module 8: D:\Games\Screeps\screeps-ai-v02\src\prototypes\creep.js **********/
/********** Start module 9: D:\Games\Screeps\screeps-ai-v02\src\utils\memory.js **********/
__modules[9] = function(module, exports) {
if (!Memory.settings) { Memory.settings = {} }

return module.exports;
}
/********** End of module 9: D:\Games\Screeps\screeps-ai-v02\src\utils\memory.js **********/
/********** Start module 10: D:\Games\Screeps\screeps-ai-v02\src\utils\globals.js **********/
__modules[10] = function(module, exports) {
// Adds a custom global object under which I publish constants, utilities, etc that I want available at a global scope.
global.Xal = {}

/**
 * Converts a numerical return value from an in-game method to the text value from the global object
 * Reference: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
 * @param {number|string} value - Return value
 * @param {object} object - The GLOBAL object which we pass in by default so we can search it
 */
global.Xal.getGlobalKeyByValue = function (value, object = global) {
  return Object.keys(object).find(key => object[key] === value)
}

return module.exports;
}
/********** End of module 10: D:\Games\Screeps\screeps-ai-v02\src\utils\globals.js **********/
/********** Start module 11: D:\Games\Screeps\screeps-ai-v02\src\utils\constants.js **********/
__modules[11] = function(module, exports) {

return module.exports;
}
/********** End of module 11: D:\Games\Screeps\screeps-ai-v02\src\utils\constants.js **********/
/********** Start module 12: D:\Games\Screeps\screeps-ai-v02\src\utils\log.js **********/
__modules[12] = function(module, exports) {
class Logger {
  constructor () {
    this.LogLevels = {
      ALERT: 1,
      ERROR: 2,
      WARNING: 3,
      EVENT: 4,
      INFO: 5,
      DEBUG: 6
    }

    this.modules = ['Main', 'Spawning', 'Harvester', 'Upgrader']

    if (!Memory.settings.logging) {
      Memory.settings.logging = {}
    }

    if (!Memory.settings.logging.modules) {
      Memory.settings.logging.modules = {}
    }

    this.modules.forEach(module => {
      module = module.toLowerCase()
      if (!Memory.settings.logging.modules[module]) {
        Memory.settings.logging.modules[module] = {}
        if (!Memory.settings.logging.modules[module].LoggingLevel) {
          Memory.settings.logging.modules[module].LoggingLevel = this.LogLevels.EVENT
        }
      }
    })
  }

  SetLoggingLevel (moduleName, logLevel) {
    console.log(`Update logging level for [${moduleName}] module`)
    console.log(`Logging Level specified: ${logLevel}`)
    const convertedLogLevel = this.LogLevels[logLevel.toUpperCase()]

    if (!Memory.settings.logging.modules[moduleName]) {
      Memory.settings.logging.modules[moduleName] = {}
      console.log(`Created  ${moduleName} name in Memory`)
    }
    if (Memory.settings.logging.modules[moduleName]) {
      Memory.settings.logging.modules[moduleName].LoggingLevel = convertedLogLevel
      console.log(`Logging level for [${moduleName}] set to [${convertedLogLevel}]`)
    }
  }

  Output (options, message) {
    const messageType = this.LogLevels[options.t.toUpperCase()]
    const module = options.mN.toLowerCase()
    const moduleLoggingLevelInMemory = Memory.settings.logging.modules[module].LoggingLevel

    if (moduleLoggingLevelInMemory >= messageType) {
      let outputString = ''
      if (options.lb) {
        console.log('\n')
      }
      if (options.i) {
        outputString += '\t'
      }
      if (options.gt) {
        outputString += `[${Game.time}]`
      }
      outputString += `[${options.t.toLowerCase()}][${module}]: ${message}`
      if (options.obj) {
        if (options.so) {
          outputString += `${JSON.stringify(options.obj)}`
        }
        outputString += `${options.obj}`
      }
      console.log(outputString)
    }
  }
}

global.Log = new Logger()

return module.exports;
}
/********** End of module 12: D:\Games\Screeps\screeps-ai-v02\src\utils\log.js **********/
/********** Footer **********/
if(typeof module === "object")
	module.exports = __require(0);
else
	return __require(0);
})();
/********** End of footer **********/
