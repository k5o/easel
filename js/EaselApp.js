var EaselApp = React.createClass({
  getInitialState: function() {
    return {
      currentStep: 1,
      handle: '',
      avatar: '',
      name: '',
      title: '',
      errorMessage: '',
    }
  },

  handleTwitterName: function (name) {
    cb.__call(
      "users_show",
      { screen_name: name },
      function (reply) {
        if (reply.httpstatus === 404) {
          this.setState({
            errorMessage: "That Twitter handle doesn't exist, please try again."
          });
        } else{
          this.setState({
            currentStep: 2,
            handle: reply.screen_name,
            avatar: reply.profile_image_url.replace("_normal", ""),
            name: reply.name,
            title: reply.description,
            errorMessage: ''
          });
        }
      }.bind(this),
      true
    );
  },

  handleCanvasGeneration: function(state) {
    this.setState({currentStep: 3, name: state.name, title: state.title});
  },

  render: function() {
    return (
      <div>
        <Header />

        <TwitterInput onTwitterSubmit={this.handleTwitterName} inputValue={this.state.handle} />

        <p className="error">{this.state.errorMessage}</p>

        <Easel {...this.state} handleCanvasGeneration={this.handleCanvasGeneration}/>

        <Canvas {...this.state} />

        <About />
      </div>
    );
  }
});

React.render( <EaselApp/>, document.getElementById('easel') );
