var EaselApp = React.createClass({
  getInitialState: function() {
    return {
      initiated: false,
      handle: '',
      avatar: '',
      name: '',
      title: '',
    }
  },

  handleTwitterName: function (name) {
    console.log("received: " + name)
    var foo = this
    debugger

    cb.__call(
      "users_show",
      { screen_name: name },
      function (reply) {
        console.log(reply)
        foo.setState({
          initiated: true,
          handle: reply.screen_name,
          avatar: reply.profile_image_url.replace("_normal", ""),
          name: reply.name,
          title: reply.description
        })
      },
      true // this parameter required
    );
  },

  componentDidUpdate: function() {
    console.log("Refreshing!");
    debugger
  },

  render: function() {
    return (
      <div>
        <Header/>

        <TwitterInput onTwitterSubmit={this.handleTwitterName} inputValue={this.state.handle} />

        <Easel {...this.state} />
      </div>
    );
  }
});

React.render( <EaselApp/>, document.getElementById('easel') );
