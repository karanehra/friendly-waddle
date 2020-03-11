import PubSubHandler from './pubsub'

export default class Store {
  constructor(params) {
    this.actions = {}
    this.mutations = {}
    this.state = {}
    this.status = 'idle'
    this.events = new PubSubHandler()

    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions
    }
    if (params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations
    }
  }
}
