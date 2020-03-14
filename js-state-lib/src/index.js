import Component from './component/index.js'
import initStore from './store/index.js'

class Homepage extends Component {
  constructor() {
    super({ store: initStore, element: document.querySelector('#main') })
  }

  render() {
    console.log('rendering')
    this.element.innerHTML = `${initStore.state.items.length} Items`
  }
}
console.log('hello')
let ins = new Homepage()
ins.render()
