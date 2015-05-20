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

  roundRect: function(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  },

  componentDidMount: function() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    context.beginPath();
    context.rect(0, 0, 1024, 512);
    context.fillStyle = '#E2EFF5';
    context.fill();

    this.roundRect(context, 100, 60, 824, 312, 5);
    context.fillStyle = '#617282';
    context.fill();

    {/*Text not showing up because its z-index is lower than the rects for some reason*/}
    {/*Google font not being used*/}
    context.font = '40px Lato';
    context.fillText('Hello World!', 130, 340);
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

        <div style={{textAlign: 'center'}}>
          <canvas id="myCanvas" width="1024" height="512" style={{margin: 'auto'}}></canvas>
        </div>

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

