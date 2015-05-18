var About = React.createClass({
  getInitialState: function () {
    return {clicked: false}
  },

  handleClick: function() {
    this.setState({clicked: !this.state.clicked});
  },

  render: function() {
    var modal = this.state.clicked ? (<AboutModal onHide={this.handleClick} key="modal" />) : (<span/>);

    return (
      <span>
        <div className="about" onClick={this.handleClick}>
          About
        </div>

        {modal}
      </span>
    );
  }
});