import Store from './store'
export default class Component {
  constructor(attrs = {}) {
    this.render = this.render || function() {}
    if (attrs.store instanceof Store) {
      attrs.store.events.subscribe('stateChange', this.render)
    }

    if (attrs.hasOwnProperty('element')) {
      this.element = attrs.element
    }
  }
}
