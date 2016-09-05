import React from 'react';

class Version extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.name);
  }

  render() {

    var self = this;

    return (
      <button key={self.props.name} type="button" className="btn btn-info btn-sm" onClick={this.onClick}>
        <span className="glyphicon glyphicon-book"></span> {this.props.name}
      </button>
    );
  }
}

Version.propTypes = {
  name: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default Version;