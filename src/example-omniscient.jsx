// @flow

var React = window.React = require('react')
var {component} = require('omniscient-tools')
var Immutable = require('immutable')
var immstruct = require('immstruct')
var {curry} = require('ramda')

type Todo = {
  id: number;
  text: string;
}

var state = immstruct({
  todos: [
    {id: 1, text: "write talk"}, 
    {id: 2, text: "think of more todo items"}, 
  ],
})

var TodoItem = component(function({todo, onDelete}) {

  function onChange(e) {
    todo.update('text', () => e.target.value)
  }

  function onClickDelete() {
    onDelete(todo)
  }

  return <div className="row collapse">
    <div className="small-1 columns">
      <a className="button prefix" onClick={onClickDelete}>x</a>
    </div>
    <div className="small-11 columns">
      <input type="text" value={todo.get('text')} onChange={onChange}/>
    </div>
  </div>
})

var TodoList = component(function({todos, onEditTodo, onDeleteTodo}) {

  function deleteTodo(todo) {
    todos.update(function(ts) { 
      return ts.filter(t => t.get('id') != todo.get('id'))
    })
  }

  function renderTodo(todo) {
    return <TodoItem todo={todo} key={todo.get('id')} onEdit={onEditTodo} onDelete={deleteTodo}/>
  }

  return <div>
    {todos.toArray().map(renderTodo)}
  </div>
})

var TodoApp = component(function({cursor}) {
  var todos = cursor.cursor('todos')
  var newText = cursor.cursor('newText')

  function addTodo(text:string) {
    var newTodo = Immutable.Map({id: Math.random(), text: text})
    todos.update((ts) => ts.push(newTodo))
  }

  return <div className="row small-12 columns">
    <h1>Todo Omniscient</h1>
    <TodoInput onAdd={addTodo} newText={newText}/>
    <TodoList todos={todos} />
    <div><pre>{JSON.stringify(cursor.toJS(), null, " ")}</pre></div>
  </div>
})

var TodoInput = component(function({newText, onAdd}) {

  function onSubmit(e) {
    e.preventDefault()
    onAdd(newText.deref())
    newText.update(() => "")
  }

  function onChange(e) {
    newText.update(() => e.target.value)
  }

  return <form className="row collapse" onSubmit={onSubmit}>
    <div className="small-10 columns">
      <input type="text" placeholder="New thing to do" value={newText.deref()} onChange={onChange}/>
    </div>
    <div className="small-2 columns">
      <input type="submit" className="button postfix" value="Add Todo" />
    </div>
  </form>
})

var isId = curry(function(id, item) {
  return item.get('id') == id
})

function render() {
  React.render(<TodoApp cursor={state.cursor()}/>, document.body)
}
render()
state.on('swap', render)
