import React from 'react';

class ContentCollapse extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var self = this;

    return (
      <div className={ this.props.opened ? '' : 'hide' }>
        <button type="button" className='btn btn-info btn-sm' onClick={this.props.onClick}>
          <span className="glyphicon glyphicon-collapse-up"></span> Collapse
        </button>
      </div>
    );
  }
}

ContentCollapse.propTypes = {
  opened: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  helloReact: React.PropTypes.string.isRequired
}

export default ContentCollapse;