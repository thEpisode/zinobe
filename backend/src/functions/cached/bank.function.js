function bankFunction (dependencies) {
  /* Dependencies */
  const _console = dependencies.console
  const _config = dependencies.config

  /* Properties */
  let _budget = process.env.BANK_BUDGET || _config.BANK_BUDGET || 0

  /**
   * Cached function to handle data, in this example, _budget
   * @param {any} data parameters to be handled in the function
   */
  const bankBudget = (data) => {
    if (data) {
      return setCachedBudget(data)
    }

    return getCachedBudget()
  }

  /**
   * Getter property function
   */
  const getCachedBudget = async () => {
    return _budget
  }

  /**
   * Setter property function
   * @param {any} data is the new data to be saved
   */
  const setCachedBudget = async (data) => {
    if (!data) {
      return null
    }

    _budget = data
    _console.success('budget are setted succesfully')
  }

  return {
    bankBudget,
    getCachedBudget,
    setCachedBudget
  }
}

module.exports = bankFunction
