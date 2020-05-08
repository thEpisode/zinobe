const baseModel = require('../base/base.model')

class CreditModel extends baseModel {
  constructor (args, dependencies) {
    if (!args || !dependencies) {
      throw new Error('Required args and dependencies to build this entity')
    }

    super(dependencies)
    this.dependencies = dependencies

    /* const { name, level } = args */
    const timestamp = (new Date()).getTime() + ''

    /* Base */
    this.last_modification = { value: timestamp, type: dependencies.dal.types.timestamp }
    this.id = { value: args.id, type: dependencies.dal.types.bigserial, isPK: true }
    this.date_creation = { value: timestamp, type: dependencies.dal.types.timestamp }
    this.last_user_modification = { value: args.user_id, type: dependencies.dal.types.object }
    this.status = { value: args.status || CreditModel.statuses.active, type: dependencies.dal.types.object }

    /* Custom fields */
    this.payment_deadline = { value: args.payment_deadline, type: dependencies.dal.types.date }
    this.amount_requested = { value: args.amount_requested, type: dependencies.dal.types.number }
    this.amount = { value: args.amount_requested, type: dependencies.dal.types.number }
    this.user_id = { value: args.user_id, type: dependencies.dal.types.string }
  }

  // Return entity sanitized
  get sanitized () {
    return {
      id: this.id.value || this.id.type.default,
      payment_deadline: this.payment_deadline || this.payment_deadline.default,
      amount_requested: this.amount_requested || this.amount_requested.default,
      amount: this.amount || this.amount.default,
      user_id: this.user_id || this.user_id.default
    }
  }

  get get () {
    return {
      id: this.id.value || this.id.type.default,
      date_creation: this.date_creation.value || this.date_creation.type.default,
      last_modification: this.last_modification.value || this.last_modification.type.default,
      last_user_modification: this.last_user_modification.value || this.last_user_modification.type.default,
      status: this.status.value || this.status.type.default,
      payment_deadline: this.payment_deadline || this.payment_deadline.default,
      amount_requested: this.amount_requested || this.amount_requested.default,
      amount: this.amount || this.amount.default,
      user_id: this.user_id || this.user_id.default
    }
  }
}

CreditModel.statuses = {
  inactive: { id: 1, name: 'inactive', title: 'Inactivo' },
  active: { id: 2, name: 'active', title: 'Activo' },
  payed: { id: 3, name: 'payed', title: 'Pagado' },
  inDefault: { id: 4, name: 'in-default', title: 'En Mora' },
  deleted: { id: 99, name: 'deleted', title: 'Eliminado' }
}

module.exports = CreditModel
