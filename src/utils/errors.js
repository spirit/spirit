export class TimelineError extends Error {
  transformObject = null

  constructor(message, transformObject, stack = null) {
    super(message)

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, TimelineError)
    }

    this.transformObject = transformObject
    this.name = 'TimelineError'
    this.message = message
  }
}
