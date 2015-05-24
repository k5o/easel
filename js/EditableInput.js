var EditableInput = React.createClass({
  getInitialState: function() {
    return { val: this.props.defaultValue }
  },

  componentWillReceiveProps: function(props) {
    if (props != null) {
      this.setState({val: props.defaultValue})
    }
  },

  handleChange: function(event) {
    var value = event.target.value;

    this.setState({val: value}, function(){
      this.props.onChange(value)
    }.bind(this));
  },

  render: function() {
    return (
      <input type="text" value={this.state.val} onChange={this.handleChange} className="editable" />
    );
  }
});