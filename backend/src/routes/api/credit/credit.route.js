function route (dependencies) {
  const _utilities = dependencies.utilities
  const _controllers = dependencies.controllers

  const get = async (req, res) => {
    let result = {}
    const params = _utilities.request.getParameters(req)
    const { id, userId } = params

    if (id) {
      result = await _controllers.credit.getById(params)
    } else if (userId) {
      result = await _controllers.credit.getAllByUserId(params)
    } else {
      result = await _controllers.credit.getAll(params)
    }

    res.json(result)
  }

  /**
   * Create user
   *
   * route to show message (POST http://<<URL>>/api/user/create)
   */
  const create = async (req, res) => {
    const params = _utilities.request.getParameters(req)
    const result = await _controllers.credit.create(params)

    res.json(result)
  }

  /**
     * Update
     *
     * route to show message (POST http://<<URL>>/api/user/update)
     */
  const update = async (req, res) => {
    const params = _utilities.request.getParameters(req)
    const result = await _controllers.credit.update(params)

    res.json(result)
  }

  return {
    get,
    create,
    update
  }
}

module.exports = route
