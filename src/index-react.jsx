const React = window.React = require('react')

console.log("INDEX REACT")

const TodoItem = React.createClass({
  render() {
    const {item, onEdit, onDelete} = this.props

    function onChange(e) {
      onEdit(item, e.target.value)
    }

    function onClickDelete() {
      onDelete(item)
    }

    return <div className="row collapse">
      <div className="small-1 columns">
        <a className="button prefix" onClick={onClickDelete}>x</a>
      </div>
      <div className="small-11 columns">
        <input type="text" value={item.text} onChange={onChange}/>
      </div>
    </div>
  }
})

const TodoList = React.createClass({
  render() {
    const {items, onEditItem, onDeleteItem} = this.props

    function renderItem(item) {
      return <TodoItem item={item} key={item.id} onEdit={onEditItem} onDelete={onDeleteItem}/>
    }

    return <div>
      {items.map(renderItem)}
    </div>
  }
})

const TodoApp = React.createClass({

  getInitialState() {
    return {
      nextItemText: "",
      items: [
        {id: 1, text: "write talk"}, 
        {id: 2, text: "think of more todo items"}, 
      ],
    }
  },

  addItem() {
    console.log("ADD ITEM")
  },

  deleteItem(item) {
    console.log("DELETE", item)
    // replace this.state
  },

  editItem(item, value) {
    console.log("EDIT", item, value)
    // replace this.state. It's immutable!
  },

  render() {
    const {items} = this.state

    return <div className="row small-12 columns">
      <h1>Todo</h1>
      <TodoInput onAdd={this.addItem}/>
      <TodoList items={items} onEditItem={this.editItem} onDeleteItem={this.deleteItem} />
    </div>
  }
      //<button onClick={onAdd}>Add Item</button>
})

const TodoInput = React.createClass({

  getInitialState() {
    return {newText: ""}
  },

  onSubmit(e) {
    e.preventDefault()
    console.log("CLICK ADD")
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
