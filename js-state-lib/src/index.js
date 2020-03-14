import Component from './component'
import initStore from './store'

class Homepage extends Component {
  constructor() {
    super({ store: initStore, element: document.querySelector('#main') })
  }

  render() {
    console.log('rendering')
    this.element.innerHTML = `${store.state.items.length} Items`
  }
}
console.log('hello')
let ins = new Homepage()
ins.render()
