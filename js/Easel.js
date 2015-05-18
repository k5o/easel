var Easel = React.createClass({
  propTypes: {
    initiated: React.PropTypes.bool,
    avatar: React.PropTypes.string,
    handle: React.PropTypes.string,
    name: React.PropTypes.string,
    title: React.PropTypes.string
  },

  render: function() {
    return (
      <div className={this.props.initiated ? "" : "hidden"}>
        <h3>
          Step 2: Edit your Easel
        </h3>

        <div className="outer">
          <div className="inner" />
          <img src={this.props.avatar} />
          <span className="text">
            <div>
              <span className="bold">
                {this.props.handle}
              </span>
              <span>
                {this.props.name}
              </span>
            </div>
            <div className="title">
              {this.props.title}
            </div>
          </span>
        </div>

        <h3>
          Step 3: Save your Easel
        </h3>
      </div>
    );
  }
});

