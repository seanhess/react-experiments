// @flow

type Item = {
  id: number;
  text: string;
}

var React = window.React = require('react')

var TodoItem = React.createClass({

  onChange(e) {
    this.props.onEdit(this.props.item, e.target.value)
  },

  onClickDelete() {
    this.props.onDelete(this.props.item)
  },

  render() {
    var item:Item = this.props.item

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

var TodoList = React.createClass({

  renderItem(item) {
    var {onEditItem, onDeleteItem} = this.props
    return <TodoItem item={item} key={item.id} onEdit={onEditItem} onDelete={onDeleteItem}/>
  },

  render() {
    var {items} = this.props

    return <div>
      {items.map(this.renderItem)}
    </div>
  }
})

var TodoApp = React.createClass({

  getInitialState() {
    return {
      items: [
        {id: 1, text: "write talk"}, 
        {id: 2, text: "think of more todo items"}, 
      ],
    }
  },

  addItem(text:string) {
    var {items} = this.state
    var newItem = {id: Math.random(), text: text}
    this.setState({items: items.concat([newItem])})
  },

  deleteItem(item:Item) {
    // make a new array excluding this item
    var newItems = this.state.items.filter(i => i.id != item.id)
    this.setState({items: newItems})
  },

  editItem(editedItem:Item, value:string) {
    var {items} = this.state

    var updatedItems = items.map(function(item) {
      if (item.id == editedItem.id) {
        item.text = value
      } 
      return item
    })

    this.setState({items: updatedItems})
  },

  render():any {
    var {items} = this.state

    return <div className="row small-12 columns">
      <h1>Todo</h1>
      <TodoInput onAdd={this.addItem}/>
      <TodoList items={items} onEditItem={this.editItem} onDeleteItem={this.deleteItem} />
    </div>
  }
})

var TodoInput = React.createClass({

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
    var {newText} = this.state

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

function render() {
  React.render(<TodoApp/>, document.body)
}

render()
