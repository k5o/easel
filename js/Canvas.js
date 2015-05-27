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

  handleBackClick: function(event) {
    event.preventDefault();

    this.props.handleBackClick();
  },

  componentDidMount: function() {
    var canvas = document.getElementById('easel-canvas');
    var context = canvas.getContext('2d');
    var avatar = new Image();
    var handle = '@' + this.props.handle;
    var canvasHelper = new CanvasHelper();

    canvasHelper.loadFonts();
    avatar.src = this.props.avatar;
    canvas.width = this.state.canvasWidth;
    canvas.height = this.state.canvasHeight;

    {/* Outer Rect */}
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#E2EFF5';
    context.fill();

    {/* Inner Rect */}
    canvasHelper.roundRect(context, 100, 57, 824, 312, 5);
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
    var metrics = context.measureText(handle);
    var width = metrics.width;

    context.fillStyle = '#313A42';
    context.fillText(handle, 290, 411);

    {/* Name */}

    {/* Default x, CSS margin, metrics.width */}
    var xOffsetForName = 290 + 19 + width;
    {/* 602 is the width limit for 300 40px Lato, measured manually */}
    var widthLimitForName = 602 - width;

    context.font = '300 40px Lato';
    context.fillText(canvasHelper.truncateText(this.props.name, context, widthLimitForName), xOffsetForName, 411);

    {/* Title */}

    {/* 623 is the width limit for 300 36px Lato, measured manually */}
    var widthLimitForTitle = 623;

    context.font = '300 36px Lato';
    context.fillStyle = '#313A42';
    context.fillText(canvasHelper.truncateText(this.props.title, context, widthLimitForTitle), 291, 463);
  },

  render: function() {
    var classSet = 'hidden';

    if (this.props.currentStep === this.state.step) {
      classSet = 'step-' + this.state.step;
    }

    return (
      <div className={classSet}>
        <h3>
          Step ({this.state.step}/3): Save your Easel
        </h3>

        <p>
          <b>Right click</b> your Easel below and select <b>Save Image As...</b>, saving it to your computer.
        </p>

        <p>
          Afterward, upload this file on <a href="http://buffer.com/pablo">Pablo</a>. For best results, deselect <b>Increased Contrast</b>.
        </p>

        <div className="canvas-wrapper">
          <canvas id="easel-canvas" width={this.state.canvasWidth} height={this.state.canvasHeight}></canvas>
        </div>

        <div className="actions">
          <button href="#" onClick={this.handleBackClick} className="button back-button">Back</button>
        </div>
      </div>
    );
  }
});
