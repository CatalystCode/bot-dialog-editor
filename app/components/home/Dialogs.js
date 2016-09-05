import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../../stores/HomeStore'
import HomeActions from '../../actions/HomeActions';
import _ from 'underscore';

class Dialogs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      version: HomeStore.getState().selectedVersion, 
      dialogs: HomeStore.getState().dialogs 
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getDialogs();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({
      version: state.selectedVersion, 
      dialogs: state.dialogs 
    });
  }

  handleClick(dialog, version) {
    HomeActions.selectDialog(dialog, version || '');
  }

  render() {

    var self = this;

    var dialogRender = this.state.dialogs.map(dialog => (
        <li key={dialog} className="list-item">
          <button type="button" className="btn btn-info btn-lg" onClick={this.handleClick.bind(self, dialog, self.state.version)}>
            <span className="glyphicon glyphicon-comment"></span> {dialog}
          </button>
        </li>
      ));

    return (
      <ul className='list-inline'>
        { dialogRender }
      </ul>
    );
  }
}

export default Dialogs;