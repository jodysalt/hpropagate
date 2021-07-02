
const { headersToCollect } = require('./config');
const tracer = require('./tracer');

const wrapLambdaHandler = fn => (event, ...args) => {
  const { headers } = event;
  if (headers) {
    headersToCollect.forEach(name => {
      const value = headers[name];
      if (value !== undefined) {
        tracer.currentTrace.context.set(name, value);
      }
    });
  }
  return fn(event, ...args);
};

module.exports = wrapLambdaHandler;
