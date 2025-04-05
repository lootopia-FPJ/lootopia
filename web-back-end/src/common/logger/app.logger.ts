import { utilities } from 'nest-winston'
import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'

const fileFormat = format.combine(
  format.colorize({
    colors: {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      debug: 'blue',
      verbose: 'magenta',
      silly: 'cyan',
      prompt: 'grey',
      data: 'grey',
    },
  }),
  format.uncolorize(),
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  format.prettyPrint({
    depth: 5,
  }),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
)

// Si besoin de logger dans la console, sans appliquer le style de NestJS

// const consoleFormat = format.combine(
//   format.colorize(),
//   format.timestamp({
//     format: 'YYYY-MM-DD HH:mm:ss',
//   }),
//   format.prettyPrint({
//     depth: 5,
//   }),
//   format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
// )

// const consoleTransport = new transports.Console({
//   format: consoleFormat,
// })

const combinedFileTransport = new transports.DailyRotateFile({
  filename: '%DATE%_combined.log',
  format: fileFormat,
  datePattern: 'YYYY-MM-DD',
  maxSize: '2m',
  dirname: './logs/combined',
  maxFiles: '14d',
})

const errorFileTransport = new transports.DailyRotateFile({
  filename: '%DATE%_error.log',
  level: 'error',
  format: fileFormat,
  datePattern: 'YYYY-MM-DD',
  maxSize: '2m',
  dirname: './logs/errors',
  maxFiles: '14d',
})

export const customLogger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(utilities.format.nestLike('Lootopia API')),
    }),
    // consoleTransport,
    combinedFileTransport,
    errorFileTransport,
  ],
})
