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

  componentDidMount: function() {
    var canvasHelper = new CanvasHelper();

    canvasHelper.loadFonts();
  },

  componentWillReceiveProps: function(props) {
    var canvas = document.getElementById('easel-canvas');
    var context = canvas.getContext('2d');
    var avatar = new Image();
    var handle = '@' + props.handle;
    var canvasHelper = new CanvasHelper();

    avatar.src = props.avatar;
    canvas.width = 1024;
    canvas.height = 512;

    {/* Outer Rect */}
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#E2EFF5';
    context.fill();

    {/* Inner Rect */}
    canvasHelper.roundRect(context, 100, 60, 824, 312, 5);
    context.fillStyle = '#617282';
    context.fill();

    {/* Avatar */}

    avatar.onload = function(){
      context.save();
      canvasHelper.roundRect(context, 130, 340, 140, 140, 5);
      context.clip();
      context.drawImage(canvasHelper.halvedImage(avatar), 130, 340, 140, 140);
      context.restore();
      context.lineWidth = 4;
      context.strokeStyle = '#313A42';
      context.stroke();
    }

    {/* Handle */}
    context.font = '700 40px Lato';
    context.fillStyle = '#313A42';
    var metrics = context.measureText(handle);
    var width = metrics.width;
    context.fillText(handle, 290, 410);

    {/* Name */}
    context.font = '300 40px Lato';
    context.fillText(props.name, 290 + width + 20, 410);

    {/* Title */}
    context.font = '300 36px Lato';
    context.fillStyle = '#313A42';
    var widthLimit = 623;
    context.fillText(canvasHelper.truncateText(props.title, context, widthLimit), 290, 460);
  },

  render: function() {
    return (
      <div className={this.props.initiated ? "" : "hidden"}>
        <h3>
          Step 2: Edit your Easel
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

        <p>
          <b>Right click</b> your Easel below and select <b>Save Image As...</b>, saving it to your computer. You can then upload this file on{' '}
          <a href="http://buffer.com/pablo">Pablo</a>.
        </p>

        <div className="canvas-wrapper">
          <canvas id="easel-canvas" width="1024" height="512"></canvas>
        </div>
      </div>
    );
  }
});

