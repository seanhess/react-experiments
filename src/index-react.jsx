const React = window.React = require('react')

console.log("INDEX REACT")

const TodoItem = React.createClass({

  onChange(e) {
    this.props.onEdit(this.props.item, e.target.value)
  },

  onClickDelete() {
    this.props.onDelete(this.props.item)
  },

  render() {
    const {item} = this.props

    return <div className="row collapse">
      <div className="small-1 columns">
        <a className="button prefix" onClick={this.onClickDelete}>x</a>
      </div>
      <div className="small-11 columns">
        <input type="text" value={item.text} onChange={this.onChange}/>
      </div>
    </div>
  }
})

const TodoList = React.createClass({

  renderItem(item) {
    const {onEditItem, onDeleteItem} = this.props
    return <TodoItem item={item} key={item.id} onEdit={onEditItem} onDelete={onDeleteItem}/>
  },

  render() {
    const {items} = this.props

    return <div>
      {items.map(this.renderItem)}
    </div>
  }
})

const TodoApp = React.createClass({

  getInitialState() {
    return {
      items: [
        {id: 1, text: "write talk"}, 
        {id: 2, text: "think of more todo items"}, 
      ],
    }
  },

  addItem(text) {
    const {items} = this.state
    let newItem = {id: Math.random(), text: text}
    this.setState({items: items.concat([newItem])})
  },

  deleteItem(item) {
    // make a new array excluding this item
    let newItems = this.state.items.filter(i => i.id != item.id)
    this.setState({items: newItems})
  },

  editItem(editedItem, value) {
    const {items} = this.state

    let updatedItems = items.map(function(item) {
      if (item.id == editedItem.id) {
        item.text = value
      } 
      return item
    })

    this.setState({items: updatedItems})
  },

  render() {
    const {items} = this.state

    return <div className="row small-12 columns">
      <h1>Todo</h1>
      <TodoInput onAdd={this.addItem}/>
      <TodoList items={items} onEditItem={this.editItem} onDeleteItem={this.deleteItem} />
    </div>
  }
})

const TodoInput = React.createClass({

  getInitialState() {
    return {newText: ""}
  },

  onSubmit(e) {
    e.preventDefault()
    this.props.onAdd(this.state.newText)
    this.setState({newText: ""})
  },

  onChange(e) {
    this.setState({newText: e.target.value})
  },

  render() {
    const {newText} = this.state

    return <form className="row collapse" onSubmit={this.onSubmit}>
      <div className="small-10 columns">
        <input type="text" placeholder="New thing to do" value={newText} onChange={this.onChange}/>
      </div>
      <div className="small-2 columns">
        <input type="submit" className="button postfix" value="Add Todo" />
      </div>
    </form>
  }
})

// Put our react app in the DOM
React.render(
  <TodoApp/>,
  document.getElementById('content')
)
