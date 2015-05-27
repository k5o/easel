var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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

  handleBack: function() {
    var currStep = this.state.currentStep;

    this.setState({currentStep: currStep - 1});
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
        } else {
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
    var component;

    if (this.state.currentStep === 1) {
      component = <TwitterInput onTwitterSubmit={this.handleTwitterName} {...this.state} />;
    }
    else if (this.state.currentStep === 2) {
      component = <Easel {...this.state} handleBackClick={this.handleBack} handleCanvasGeneration={this.handleCanvasGeneration} />
    }
    else if (this.state.currentStep === 3) {
      component = <Canvas {...this.state} handleBackClick={this.handleBack} />
    }

    return (
      <div>
        <Header />

        <p className="error">{this.state.errorMessage}</p>
        <div className="component-wrapper">
          {component}
        </div>


        <About />
      </div>
    );
  }
});

React.render( <EaselApp/>, document.getElementById('easel') );
