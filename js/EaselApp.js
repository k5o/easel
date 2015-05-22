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
    cb.__call(
      "users_show",
      { screen_name: name },
      function (reply) {
        this.setState({
          initiated: true,
          handle: reply.screen_name,
          avatar: reply.profile_image_url.replace("_normal", ""),
          name: reply.name,
          title: reply.description
        })
      }.bind(this),
      true
    )
  },

  render: function() {
    return (
      <div>
        <Header />

        <TwitterInput onTwitterSubmit={this.handleTwitterName} inputValue={this.state.handle} />

        <Easel {...this.state} />

        <About />
      </div>
    );
  }
});

React.render( <EaselApp/>, document.getElementById('easel') );
