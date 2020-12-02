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
      // if the module node doesn't exist, create it.
      if (!Memory.settings.logging.modules[module]) {
        Memory.settings.logging.modules[module] = {}
        // if the module doesn't already have a logging level specified, then set a default
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
