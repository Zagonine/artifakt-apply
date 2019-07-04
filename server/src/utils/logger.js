import winston from 'winston'

const logger = winston.createLogger({
  level: 0,
  format: winston.format.combine(
    // level to uppercase
    winston.format(function (info, opts) {
      info.level = info.level.toUpperCase()
      return info
    })(),
    // Format output
    winston.format.printf(info => `${info.level} [${info.label}]: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      // Do NOT log anything in console when running unit tests
      silent: process.env.NODE_ENV === 'test',
      format: winston.format.combine(
        // Colorize output (just in local env)
        winston.format.colorize({
          all: process.env.NODE_ENV !== 'production'
        })
      )
    })
  ]
})

const formatObject = function (param) {
  if (typeof param !== 'object') {
    return param
  }

  if (param instanceof Error) {
    return param.stack
  }

  for (let l in param) {
    if (param[l] instanceof Error) {
      param[l] = param[l].stack
    }
  }

  return JSON.stringify(param, null, 2)
}

const formatMessages = function (messages) {
  let message = ''
  return (message += `${messages.map(formatObject).join('\n')}`)
}

export default {
  _log (type, label, messages) {
    const message = formatMessages(messages)

    return logger.log({
      level: type,
      label,
      message
    })
  },

  info (label, ...messages) {
    return this._log('info', label, messages)
  },

  warn (label, ...messages) {
    return this._log('warn', label, messages)
  },

  error (label, ...messages) {
    return this._log('error', label, messages)
  },

  verbose (label, ...messages) {
    return this._log('verbose', label, messages)
  },

  debug (label, ...messages) {
    return this._log('debug', label, messages)
  },

  silly (label, ...messages) {
    return this._log('silly', label, messages)
  }
}
