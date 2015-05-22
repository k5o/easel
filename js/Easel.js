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

  // Image resizing in canvas only preserves quality if resized by factors of 2 or less.
  // This takes 512x512 => 256x256, which is later transformed into 140x140
  halvedImage: function(imageObj) {
    var cc = document.createElement("canvas");
    var ctx = cc.getContext("2d");
    cc.width = imageObj.width / 2;
    cc.height = imageObj.height / 2;
    ctx.drawImage(imageObj, 0, 0, cc.width, cc.height);
    return cc;
  },

  componentWillReceiveProps: function(props) {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    var handle = '@' + props.handle;

    imageObj.src = props.avatar;
    canvas.width = 1024;
    canvas.height = 512;

    {/* Outer Rect */}
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#E2EFF5';
    context.fill();

    {/* Inner Rect */}
    this.roundRect(context, 100, 60, 824, 312, 5);
    context.fillStyle = '#617282';
    context.fill();

    {/* Avatar */}

    imageObj.onload=function(){
      context.save();
      this.roundRect(context, 130, 340, 140, 140, 5);
      context.clip();
      context.drawImage(this.halvedImage(imageObj), 130, 340, 140, 140);
      context.restore();
      context.lineWidth = 4;
      context.strokeStyle = '#313A42';
      context.stroke();
    }.bind(this)

    {/* Handle */}
    context.font = '40px Lato';
    context.fillStyle = '#313A42';
    var metrics = context.measureText(handle);
    var width = metrics.width;
    context.fillText(handle, 290, 410);

    {/* Name */}
    context.fillText(props.name, 290 + width + 20, 410);

    {/* Title */}
    context.font = '36px Lato';
    context.fillStyle = '#313A42';
    context.fillText(props.title, 290, 460);
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

        <div style={{textAlign: 'center'}}>
          <canvas id="myCanvas" width="1024" height="512" style={{margin: 'auto'}}></canvas>
        </div>
      </div>
    );
  }
});

