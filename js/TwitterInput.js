var TwitterInput = React.createClass({
  getInitialState: function() {
    return { step: 1, val: "" }
  },

  handleSubmit: function(event) {
    var enterCharCode = '13';
    var value = event.target.value;

    if ( event.charCode == enterCharCode ) {
      this.setState({val: value}, function(){
        this.props.onTwitterSubmit(value)
      }.bind(this));
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps != null) {
      this.setState({val: nextProps.inputValue})
    }
  },

  render: function() {
    var classSet = 'hidden';

    if (this.props.currentStep === this.state.step) {
      classSet = 'step-' + this.state.step;
    }

    return (
      <div className={classSet}>
        <h3>
          <strong>Step ({this.state.step}/3):</strong> Enter Twitter Handle
        </h3>
        <p>
          Press <b>enter</b> when you're done
        </p>
        <span className="at">
          @
        </span>
        <input type="text" className="twitter-input" onKeyPress={this.handleSubmit} autofocus />
      </div>
    );
  }
});