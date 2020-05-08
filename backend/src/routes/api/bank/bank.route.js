function route (dependencies) {
  const _functions = dependencies.functions

  const get = async (req, res) => {
    const budget = await _functions.cached.bank.bankBudget()

    res.json({ budget })
  }

  return {
    get
  }
}

module.exports = route
