var AboutModal = React.createClass({
  render: function() {
    return (
      <div className="about-modal-backdrop" onClick={ this.props.onHide }>
        <div className="about-modal">
          <p>
            Easel was built by <a href="https://www.kokev.in">Kevin Ko</a> on a cold San Francisco weekend and is not affiliated with <a href="http://buffer.com">Buffer</a> in any way.
          </p>
          <p>
            You can email me at <a href="mailto:kevin@kokev.in">kevin@kokev.in</a> or tweet me at <a href="https://twitter.com/kokev">@kokev</a>.
          </p>
          <p>
            You can find Easel's source code here: <a href="http://github.com/k5o/easel">Github</a>
          </p>

        </div>
      </div>
    );
  }
});