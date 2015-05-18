var TwitterInput = React.createClass({
  getInitialState: function() {
    return { val: "" }
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
    return (
      <div className="step-one">
        <h3>
          Step 1: Enter Twitter Handle
        </h3>
        <span className="at">
          @
        </span>
        <input type="text" onKeyPress={this.handleSubmit} autofocus />
      </div>
    );
  }
});