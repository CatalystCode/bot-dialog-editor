import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';

import VersionSelector from './home/VersionSelector';
import Dialogs from './home/Dialogs';
import Content from './home/Content';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showInfo: false };
    
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({ 
      dialog: state.selectedDialog, 
      version: state.selectedVersion 
    });
  }

  // handleClick(dialog) {
  //   this.setState({ 
  //     showInfo: true,
  //     dialog: dialog
  //   });
  // }

  render() {

    return (
      <div className='container'>
        <div className="row show-grid">
          <div className='col-xs-12 col-md-6'>
            <div className="row show-grid">
              <VersionSelector />
            </div>
            <div className="row show-grid">
             <Dialogs />
            </div>
          </div>
          <div className='col-xs-6 col-md-6'>
            <Content dialog={this.state.dialog} version={this.state.version} />
          </div>
        </div>
      </div>
    );

    // var self = this;

    // var renderDialogs = this.state.dialogs.map(dialog => (
    //   <button type="button" className="btn btn-info btn-lg" onClick={this.handleClick.bind(self, dialog)}>
    //     <span className="glyphicon glyphicon-book"></span> {dialog.name}
    //   </button>
    // ));

    // var documentInfo = function () {
    //   return (
    //     <div>
    //       <h1>{self.state.dialog.name}</h1>
    //       <Link to={'/edit/' + encodeURIComponent(self.state.dialog.name)} className='btn'>
    //         <span className="glyphicon glyphicon-book"></span> Edit
    //       </Link>
    //       <Link to={'/edit/' + encodeURIComponent(self.state.dialog.name)} className='btn'>
    //         <span className="glyphicon glyphicon-book"></span> Save New Version
    //       </Link>
    //       { self.state.dialog.versions.map(versionInfo) }
    //     </div>
    //   );
    // }

    // var versionInfo = function (version) {
    //   return (
    //     <Link to={'/view/' + encodeURIComponent(self.state.dialog.name) + '?ver=' + version} className='btn'>
    //       <span className="glyphicon glyphicon-book"></span> View version {version}
    //     </Link>
    //   );
    // }

    // return (
    //   <div className='container'>
    //     <h3 className='text-center'>Click on the portrait. Select your favorite.</h3>
    //     <div className="row">
    //       <div className='col-xs-12 col-md-8 btn-toolbar'>
    //         { renderDialogs }
    //       </div>
    //       <div className='col-xs-6 col-md-4'>
    //         { self.state.showInfo ? documentInfo() : null }
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

export default Home;