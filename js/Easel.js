var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Easel = React.createClass({
  propTypes: {
    currentStep: React.PropTypes.number,
    avatar: React.PropTypes.string,
    handle: React.PropTypes.string,
    name: React.PropTypes.string,
    title: React.PropTypes.string,
    handleCanvasGeneration: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
      step: 2,
      name: this.props.name,
      title: this.props.title
    }
  },

  adjustNameWidth: function() {
    var $nameInput = $('input.input-name');
    var handleWidth = $('.bold').width() + 18;
    var newWidth = 620 - handleWidth;

    $nameInput.css('width', newWidth);
  },

  autofocusInput: function() {
    var $nameInput = $('input.input-name');
    var strLength = $nameInput.val().length * 2;

    $nameInput.focus();
    $nameInput[0].setSelectionRange(strLength, strLength);
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      name: props.name,
      title: props.title
    });
  },

  componentDidMount: function() {
    this.adjustNameWidth();
    this.autofocusInput();
  },

  componentDidUpdate: function() {
    this.adjustNameWidth();
  },

  handleGenerateClick: function(event) {
    event.preventDefault();

    this.props.handleCanvasGeneration(this.state);
  },

  handleBackClick: function(event) {
    event.preventDefault();

    this.props.handleBackClick();
  },

  handleNameEdit: function(value) {
    this.setState({name: value});
  },

  handleTitleEdit: function(value) {
    this.setState({title: value});
  },

  render: function() {
    var classSet = 'hidden';

    if (this.props.currentStep === this.state.step) {
      classSet = 'step-' + this.state.step;
    }

    return (
      <div className={classSet}>
        <h3>
          <strong>Step ({this.state.step}/3):</strong> Edit your Easel
        </h3>

        <p>
          Edit your name and title directly on the easel. When everything looks good, click <b>Generate Easel</b>.
        </p>

        <ReactCSSTransitionGroup transitionName="outer" transitionAppear={true}>
          <div className="outer">

            <ReactCSSTransitionGroup transitionName="inner" transitionAppear={true}>
              <div className="inner" />
            </ReactCSSTransitionGroup>

            <div className="avatar-wrapper">
              <img src={this.props.avatar} />
            </div>

            <ReactCSSTransitionGroup transitionName="callout" transitionAppear={true}>
              <div className="callout callout-name">
                Edit here
              </div>

              <div className="callout callout-title">
                Edit here
              </div>
            </ReactCSSTransitionGroup>

            <span className="text">
              <div>
                <span className="bold">
                  @{this.props.handle}
                </span>
                <span className="name">
                  <EditableInput defaultValue={this.state.name} onChange={this.handleNameEdit} autofocusable={true}/>
                </span>
              </div>
              <div className="title">
                <EditableInput defaultValue={this.state.title} onChange={this.handleTitleEdit} />
              </div>
            </span>

          </div>
        </ReactCSSTransitionGroup>


        <div className="actions">
          <button href="#" onClick={this.handleBackClick} className="button back-button">Back</button>
          <button href="#" onClick={this.handleGenerateClick} className="button generate-button">Generate Easel</button>
        </div>

      </div>
    );
  }
});

