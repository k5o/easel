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
    this.setState({val: event.target.value});
  },

  render: function() {
    return (
      <input type="text" value={this.state.val} onChange={this.handleChange} className="editable" />
    );
  }
});