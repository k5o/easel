var Canvas = React.createClass({
  propTypes: {
    currentStep: React.PropTypes.number,
    avatar: React.PropTypes.string,
    handle: React.PropTypes.string,
    name: React.PropTypes.string,
    title: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      step: 3,
      canvasWidth: 1024,
      canvasHeight: 512
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
    canvas.width = this.state.canvasWidth;
    canvas.height = this.state.canvasHeight;

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
      context.shadowColor = '#777';
      context.shadowBlur = 1;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.lineWidth = 8;
      context.strokeStyle = 'white';
      context.stroke();
      context.clip();
      context.drawImage(canvasHelper.halvedImage(avatar), 130, 340, 140, 140);
      context.restore();
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
    {/* 623 is the width limit for 300 36px Lato, measured manually */}
    var widthLimit = 623;
    context.fillText(canvasHelper.truncateText(props.title, context, widthLimit), 290, 460);
  },

  render: function() {
    return (
      <div className={this.props.currentStep >= this.state.step ? "step-" + this.state.step : "hidden"}>
        <h3>
          Step {this.state.step}: Save your Easel
        </h3>

        <p>
          <b>Right click</b> your Easel below and select <b>Save Image As...</b>, saving it to your computer. You can then upload this file on{' '}
          <a href="http://buffer.com/pablo">Pablo</a>.
        </p>

        <div className="canvas-wrapper">
          <canvas id="easel-canvas" width={this.state.canvasWidth} height={this.state.canvasHeight}></canvas>
        </div>
      </div>
    );
  }
});
