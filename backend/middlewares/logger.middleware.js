const morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body))
morgan.token('cookies', (req) => JSON.stringify(req.cookies))
morgan.token('user-agent', (req) => req.headers['user-agent'])
morgan.token('ip', (req) => req.ip)

const customLoggerFormat = `
METHOD: :method
URL: :url
STATUS: :status
RESPONSE TIME: :response-time ms
IP: :ip
USER-AGENT: :user-agent
COOKIES: :cookies
BODY: :body
------------------------
`

const loggerMiddleware = morgan(customLoggerFormat)

module.exports = loggerMiddleware
