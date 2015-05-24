var Easel = React.createClass({
  propTypes: {
    currentStep: React.PropTypes.number,
    avatar: React.PropTypes.string,
    handle: React.PropTypes.string,
    name: React.PropTypes.string,
    title: React.PropTypes.string,
    handleCanvasGeneration: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
      step: 2,
      name: this.props.name,
      title: this.props.title
    }
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      name: props.name,
      title: props.title
    });
  },

  handleClick: function(event) {
    event.preventDefault();

    this.props.handleCanvasGeneration(this.state);
  },

  handleNameEdit: function(value) {
    this.setState({name: value});
  },

  handleTitleEdit: function(value) {
    this.setState({title: value});
  },

  render: function() {
    return (
      <div className={this.props.currentStep >= this.state.step ? "step-" + this.state.step : "hidden"}>
        <h3>
          Step {this.state.step}: Edit your Easel
        </h3>

        <p>
          Edit your name and title directly on the easel.
        </p>

        <p>
          If/when you're happy with your results, click <b>Generate Easel</b>.
        </p>

        <div className="outer">
          <div className="inner" />
          <img src={this.props.avatar} />
          <span className="text">
            <div>
              <span className="bold">
                @{this.props.handle}
              </span>
              <span className="name">
                <EditableInput defaultValue={this.state.name} onChange={this.handleNameEdit} />
              </span>
            </div>
            <div className="title">
              <EditableInput defaultValue={this.state.title} onChange={this.handleTitleEdit} />
            </div>
          </span>
        </div>

        <div className="generate-trigger">
          <a href="#" onClick={this.handleClick}>Generate Easel</a>
        </div>

      </div>
    );
  }
});

