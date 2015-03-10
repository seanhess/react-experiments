Functional Frontend with React
==============================

About Me
--------

Programmer, Inventor. I like to help people solve problems.

- [Contracting and consulting](https://www.linkedin.com/in/seanhess)
- Founded [I.TV](http://i.tv)
- [Projects and Blog](http://seanhess.github.io/)
- [Kuali.co](http://kuali.co)

Introduction to React
---------------------

Simple, focused view components that display a view as a function of its data and state

    var Hello = React.createClass({
      render: function() {
        return <div>Hello {this.props.name}</div>;
      }
    });

    React.render(<Hello name="John" />, mountNode);

React: Only the view
--------------------

No controller or model

React: Use a complete language to render
-------------------------------------------

Just use javascript for control flow

    <div>{users.map(u => <span>u.name</span>)}</div>

React: JSX
----------

XML, right next to your view logic

    <div id="test">hello</div>
    <Hello name="John"></Hello>

Don't be afraid. It maps to simple function calls

    [
      React.createElement("div", {id: "test"}, "hello")
      React.createElement(Hello, {name: "john"})
    ]

Brackets escape to javascript

    <div>{user.name}</div>

It's very nice in practice. Common concerns?

React: One way data flow
------------------------

Make many small components that are only render functions.
  
    var UserCard = React.createClass({
      render() {
        var {user} = this.props
        return <div>
          <div>Name: {user.firstName} {user.lastName}</span>
          <div><img src={user.avatarUrl}/></div>
        </div>
      }
    })

Immutable state changes

    getInitialState() {
      return {message: ""}
    },

    appendText(text) {
      // this won't do anything 
      // this.state.message += text

      // triggers render again from the top
      this.setState({message: this.state.message + text})
    }

    render() {
      // I never have to worry about calling render
      // ...
    }

React: The Virtual DOM
----------------------

Diffs the properties of each component to see if it needs to redraw. Performance.

React: Todo Example
-------------------

[Launch Demo](http://localhost:3000/)

[Source](./src/example-react.jsx)

Clojure and Om
--------------
Take it from here Scott!

Immutable Javascript
--------------------

State and props are already "immutable", but they don't encourage immutable programming.

    // writing your data code in an immutable style is awesome
    // I'm preaching to the choir here

    function addItem(items, item) {
      return items.concat([item])
    }

[Immutable.js](https://github.com/facebook/immutable-js)
------------

By facebook. It has a different API.
  
    var item = Immutable.Map({name: "bob"})
    var newItem = item.set("name", "henry")
    console.log(newItem.get("name"))

[Seamless-immutable](https://github.com/rtfeldman/seamless-immutable)
-------------------

Just doesn't let you update objects. Works kind of like Object.freeze

    var item = Immutable({name: "bob"})
    item.name = "henry" // throws an error!
    console.log(item.name)
    
[Ramda](http://ramdajs.com/)
-----

Like lodash or underscore but curried and immutable.

    var nums = [1,2,3]
    var newNums = push(4, nums)

Cursors
-------

Store a immutable data structure, and track changes to it.

    var data = Immutable.fromJS({message: "Hello"})
    var root = Cursor.from(data, function(newData) {

      // called whenever anything changes

      data = newData
      render(data)
    })

Pass pieces of it around to components. They can write to it, and it triggers a render.
  
    var message = root.cursor('message')

    var Message = React.createClass({
      changeIt() {
        var message = this.props.message
        message.update(() => "Goodbye")
      },

      render() {
        var message = this.props.message
        return <button onClick={this.changeIt}>{message.deref()}</button>
      },
    })

[Immutable.js has cursors](https://github.com/facebook/immutable-js/tree/master/contrib/cursor). Also consider [Easy Cursors](https://github.com/kualico/easy-cursors) if you don't want to use Immutable.js.


[Omniscient](http://omniscientjs.github.io/): Component Functions
------------------------------

More like Om. 

    var Message = component(function({message}) {
      function changeIt() {
        message.update(() => "Goodbye")
      }

      return <button onClick={changeIt}>{message.deref()}</button>
    })

They prefer functions to JSX. Consider using [omniscient-tools](https://github.com/kualico/omniscient-tools) instead if you like JSX?

Other Links
-----------

Hot module reloading

- http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html#livereload
- https://github.com/gaearon/react-hot-boilerplate
- http://gaearon.github.io/react-hot-loader/getstarted/

Flow

- http://flowtype.org/
