import React from 'react';

class ContentExpand extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var self = this;

    return (
      <div className={ !this.props.opened ? '' : 'hide' }>
        <button type="button" className='btn btn-info btn-sm' onClick={this.props.onClick}>
          <span className="glyphicon glyphicon-collapse-down"></span> Expand
        </button>
      </div>
    );
  }
}

ContentExpand.propTypes = {
  opened: React.PropTypes.bool,
  onClick: React.PropTypes.func
}

export default ContentExpand;