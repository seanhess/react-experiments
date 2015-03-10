Functional Frontend with React
==============================

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
      // I never have to wory about calling render
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

Code in an immutable style. Compose functions

Projects

- [immutable-js](https://github.com/facebook/immutable-js)
- [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)
- [ramda](http://ramdajs.com/)

Cursors
-------

Raw demo

Component Functions
-------------------

Performance

- [omniscient](http://omniscientjs.github.io/)






Other Links
-----------

Hot module reloading
- http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html#livereload
- https://github.com/gaearon/react-hot-boilerplate
- http://gaearon.github.io/react-hot-loader/getstarted/
