function creditController (dependencies) {
  const _db = dependencies.db
  const _console = dependencies.console
  const _firebase = dependencies.firebaseManager
  const _utilities = dependencies.utilities
  const _controllers = dependencies.controllers
  const _models = dependencies.models

  const get = async (data) => {
    try {
      // Get values from reference as snapshot
      const docRef = _db.collection('credits')
      const docRaw = await docRef.get()
      // Cast Firebase object into an arry of credits
      const entityResponse = _firebase.cast.array(docRaw)

      if (data.filterBy && data.filterBy.status) {
        entityResponse.data = entityResponse.data
          .filter(it => data
            .filterBy
            .status
            .toLocaleLowerCase()
            .trim()
            .includes(it.status.name.toLocaleLowerCase().trim()))
      }

      return _utilities.response.success(entityResponse.data)
    } catch (error) {
      _console.error(error)
      return _utilities.response.error()
    }
  }

  const getById = async (data) => {
    try {
      if (!data || !data.id) {
        return _utilities.response.error('Please provide an id')
      }

      // Get values from reference as snapshot
      const docRef = _db.collection('credits').doc(`${data.id}`)
      const docRaw = await docRef.get()
      // Cast Firebase object into an arry of credits
      const entityResponse = _firebase.cast.object(docRaw)

      // Check if exist any data
      if (!docRaw || !docRaw.exists || !entityResponse) {
        return _utilities.response.error('No credit found')
      }

      return _utilities.response.success(_utilities.response.clean(entityResponse))
    } catch (error) {
      _console.error(error)
      return _utilities.response.error()
    }
  }

  const getAllByUserId = async (data) => {
    try {
      if (!data || !data.userId) {
        return _utilities.response.error('Please provide a userId')
      }

      // Get values from reference as snapshot
      const docRef = _db.collection('credits')
        .where('user_id', '==', `${data.userId}`)
      const docRaw = await docRef.get()
      // Cast Firebase object into an arry of users
      const entityResponse = _firebase.cast.array(docRaw)

      if (data.filterBy && data.filterBy.status) {
        entityResponse.data = entityResponse.data
          .filter(it => data
            .filterBy
            .status
            .toLocaleLowerCase()
            .trim()
            .includes(it.status.name.toLocaleLowerCase().trim()))
      }

      return _utilities.response.success(entityResponse.data)
    } catch (error) {
      _console.error(error)
      return _utilities.response.error()
    }
  }

  const create = async (data) => {
    try {
      const _functions = dependencies.functions

      if (!data || !data.userId || !data.amount_requested) {
        return _utilities.response.error('Include at least a userId, please')
      }

      if (+data.amount_requested < 10000 || +data.amount_requested > 100000) {
        return _utilities.response.error('El monto mínimo a pedir es de $10.000 y el máximo es de $100.000')
      }

      const activeCreditsResponse = await getAllByUserId({ userId: data.userId, filterBy: { status: 'active' } })
      const userResponse = await _controllers.user.getById({ id: data.userId })

      if (!_utilities.response.isValid(activeCreditsResponse)) {
        return activeCreditsResponse
      }

      if (!_utilities.response.isValid(userResponse)) {
        return userResponse
      }

      if (activeCreditsResponse.result && activeCreditsResponse.result.length) {
        return _utilities.response.error('No puedes pedir más créditos, primero paga tu crédito actual')
      }

      if (userResponse.result.credit_line_status.name === _models.User.creditLineStatuses.rejected.name) {
        data.status = _models.Credit.statuses.rejected
      } else {
        // Calculate if bank have enough budget
        const budget = await _functions.cached.bank.bankBudget()
        const difference = budget - (+data.amount_requested)

        if (difference < 0) {
          return _utilities.response.error('No podemos emitir más créditos, tenemos que pedirle dinero a tio rico mac pato :(')
        }

        await _functions.cached.bank.bankBudget(difference)
      }

      data.user_id = data.userId
      data.id = _utilities.idGenerator(15, 'cred-')
      const docRef = _db.collection('credits').doc(data.id)

      const entity = new _models.Credit(data, dependencies)
      const docResponse = await docRef.set(entity.get)

      if (!docResponse) {
        _console.error(docResponse)
        return _utilities.response.error()
      }

      return _utilities.response.success(entity.sanitized)
    } catch (error) {
      _console.error(error)
      return _utilities.response.error()
    }
  }

  const update = async (data) => {
    try {
      const _functions = dependencies.functions

      if (!data || !data.id) {
        return _utilities.response.error('Please provide an identity')
      }
      const entityResponse = await getById(data)

      if (!_utilities.response.isValid(entityResponse)) {
        return entityResponse
      }

      const docRef = _db.collection('credits').doc(entityResponse.result.id)
      const entity = new _models.Credit({ ...entityResponse.result, ...data }, dependencies)
      const docResponse = await docRef.update(entity.get)

      if (!docResponse) {
        _console.error(docResponse)
        return _utilities.response.error()
      }

      if (data.action && data.action === 'pay') {
        const currentBudget = await _functions.cached.bank.bankBudget()
        await _functions.cached.bank.bankBudget(Number(currentBudget) + Number(entity.get.amount_requested))
      }

      return _utilities.response.success(data)
    } catch (error) {
      _console.error(error)
      return _utilities.response.error()
    }
  }

  const evaluateRisk = async (data) => {
    const random = Math.round(Math.random())
    const creditStatus = _models.User.creditLineStatuses[Object.keys(_models.User.creditLineStatuses)[random]]
    return creditStatus
  }

  return {
    getAll: get,
    getById,
    getAllByUserId,
    create,
    update,
    evaluateRisk,
    status: _models.Credit.statuses,
    role: _models.Credit.roles
  }
}

module.exports = creditController
