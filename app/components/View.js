import React from 'react';
import Form from 'react-json-editor';
import {Link} from 'react-router';
import {first, without, findWhere} from 'underscore';

import Content from './home/Content';

class View extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='container'>
        <Content dialog={this.props.params.dialog} version={this.props.params.version} view={false} />
      </div>
    );
  }
}

export default View;