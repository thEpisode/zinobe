const functions = {
  cached: [
    { name: 'bankBudget', route: '/functions/cached/bank.function', storage: 'RAM', expire: 'never' }
  ],
  timed: [
    { name: 'runEvery24H', route: '/functions/timed/exampleTimed.function', startAt: '23:59:59', intervalTime: '24', intervalMeasure: 'hours' }
  ]
}

module.exports = functions
