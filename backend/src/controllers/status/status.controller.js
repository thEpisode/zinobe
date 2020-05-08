function statusController (dependencies) {
  const _utilities = dependencies.utilities

  const get = async (data) => {
    return _utilities.response.success([{ name: 'API is online', price: 12 }])
  }

  return {
    get
  }
}

module.exports = statusController
