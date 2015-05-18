var Easel = React.createClass({
  propTypes: {
    initiated: React.PropTypes.bool,
    avatar: React.PropTypes.string,
    handle: React.PropTypes.string,
    name: React.PropTypes.string,
    title: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      name: this.props.name,
      title: this.props.title
    }
  },

  render: function() {
    return (
      <div className={this.props.initiated ? "" : "hidden"}>
        <h3>
          Step 2: Edit your Easel
        </h3>

        <p>
          Edit your name and title directly on the easel
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
                <EditableInput defaultValue={this.props.name} />
              </span>
            </div>
            <div className="title">
              <EditableInput defaultValue={this.props.title} />
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

