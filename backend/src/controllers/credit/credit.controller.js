function creditController (dependencies) {
  const _db = dependencies.db
  const _console = dependencies.console
  const _firebase = dependencies.firebaseManager
  const _utilities = dependencies.utilities
  const _auth = dependencies.auth
  const _controllers = dependencies.controllers
  const _models = dependencies.models

  const get = async () => {
    try {
      // Get values from reference as snapshot
      const docRef = _db.collection('credits')
      const docRaw = await docRef.get()
      // Cast Firebase object into an arry of credits
      const entityResponse = _firebase.cast.array(docRaw)
      const entityCleaned = _utilities.response.clean(entityResponse)

      return _utilities.response.success(entityCleaned.data)
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

  const create = async (data) => {
    try {
      // TODO: Check if user is blocked or not
      data.id = _utilities.idGenerator(15, 'cred-')
      const timestamp = (new Date()).getTime() + ''
      const docRef = _db.collection('credits').doc(data.id)
      const timestampKey = _auth.encoder.base64.encode('timestamp')
      const serverUri = dependencies.config.FRONTEND_URI + dependencies.config.MAIL.VALIDATION_PATH
      const emailTokenKey = _auth.encoder.base64.encode('token')
      const emailLinkToken = _auth.encoder.base64.encode(_auth.crypto.cypherObject(_controllers.backend.getKey(), { email: data.email }))
      data.confirmEmailLink = `${serverUri}?${timestampKey}=${timestamp}&${emailTokenKey}=${emailLinkToken}`
      data.password = _auth.hash.stringToHash(data.password || '')

      const entity = new _models.Credit(data, dependencies)
      const docResponse = await docRef.set(entity.get)

      if (!docResponse) {
        _console.error(docResponse)
        return _utilities.response.error()
      }

      // Send a confirmation email
      if (data.is_account_activated) {
        _controllers.notification.create({
          to: data.email,
          notification_type: _controllers.notification.notification_type.email,
          email: {
            template: _controllers.notification.email_template.confirmEmail,
            mainActionLink: data.confirmEmailLink
          }
        })
      }

      return _utilities.response.success(entity.sanitized)
    } catch (error) {
      _console.error(error)
      return _utilities.response.error()
    }
  }

  const update = async (data) => {
    try {
      if (!data || !data.identity) {
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
    create,
    update,
    evaluateRisk,
    status: _models.Credit.statuses,
    role: _models.Credit.roles
  }
}

module.exports = creditController
