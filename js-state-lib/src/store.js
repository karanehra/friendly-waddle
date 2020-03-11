import PubSubHandler from './pubsub'

export default class Store {
  constructor(params) {
    this.actions = {}
    this.mutations = {}
    this.status = 'idle'
    this.events = new PubSubHandler()

    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions
    }
    if (params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations
    }

    let self = this

    this.state = new Proxy(params.state || {}, {
      set: function(state, key, value) {
        state[key] = value
        console.log(`Key set trap: ${key}: ${value}`)

        self.events.publish('stateChange', self.state)

        if (self.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key}`)
        }

        self.status = 'resting'

        return true
      }
    })
  }

  /**
   * Redux-esque action dispatcher
   * @param {string} actionKey The key of the action
   * @param {any} payload Data payload
   */
  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`)
      return false
    }
    console.groupCollapsed(`ACTION: ${actionKey}`)

    this.status = 'action'

    this.actions[actionKey](this, payload)

    console.groupEnd()

    return true
  }

  commit(mutationKey, payload) {
    if (typeof self.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`)
      return false
    }
    this.status = 'mutation'

    let newState = this.mutations[mutationKey](this.state, payload)

    this.state = Object.assign(this.state, newState)

    return true
  }
}
