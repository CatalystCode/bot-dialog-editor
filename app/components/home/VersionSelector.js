import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../../stores/HomeStore'
import HomeActions from '../../actions/HomeActions';
import _ from 'underscore';

class VersionSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      versions: HomeStore.getState().versions,
      valid: HomeStore.getState().validVersionName,
      error: HomeStore.getState().errorVersionName
    };
    this.onChange = this.onChange.bind(this);
    this.checkVersion = this.checkVersion.bind(this);
    this.createVersion = this.createVersion.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getVersions();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({ 
      versions: state.versions,
      valid: state.validVersionName,
      error: state.errorVersionName
    });
  }

  handleClick(version) {
    HomeActions.selectVersion(version);
  }

  getStateClass(prefixIfTrue, success, error, none) {
    var success = success || 'success';
    var error = error || 'error';
    var css = this.state.valid ? success : this.state.error ? error : "";
    return css && prefixIfTrue + css || none || '';
  }

  checkVersion(event) {
    if (event.target.value) {
      HomeActions.checkVersion(event.target.value);
    } else {
      this.setState({
        valid: false,
        error: false
      });
    }
  }

  createVersion() {
    if (this.state.valid) {
      HomeActions.createVersion($(this.refs.versionName).val());
      var $ = window.$;
      $('#create-version-modal').modal('hide');
    }
  }

  render() {

    var self = this;

    var versionOptions = this.state.versions.map(version => (
      <button type="button" className="btn btn-info btn-sm" onClick={this.handleClick.bind(self, version)}>
        <span className="glyphicon glyphicon-book"></span> {version}
      </button>
    ));

    return (
      <div className='btn-toolbar'>
        <div className='btn-group'>
          <button type="button" className="btn btn-default btn-sm" onClick={this.handleClick.bind(self, null)}>
            <span className="glyphicon glyphicon-book"></span> active
          </button>
          { versionOptions }
        </div>
        <div className='btn-group'>
          <button type="button" className="btn btn-default btn-sm" data-toggle="modal" data-target="#create-version-modal">
            <span className="glyphicon glyphicon-plus"></span> new version
          </button>
        </div>

        <div className="modal fade" id="create-version-modal" tabindex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">Create a new version</h4>
              </div>
              <div className="modal-body">
                <div className={"form-group " + this.getStateClass("has-feedback has-")}>
                  <label className="control-label">Name for the new version</label>
                  <input className="form-control" type="text" ref="versionName" 
                         placeholder="Enter a new name for the version"
                         onChange={this.checkVersion} />
                  <span className={this.state.valid ? "form-control-feedback glyphicon glyphicon-ok" : ""}></span>
                  <span className={this.state.error ? "form-control-feedback glyphicon glyphicon-remove" : ""}></span>
                  <span class="help-block">Validation is based on string length.</span>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className={"btn btn-info " + (this.state.valid ? '' : 'disabled')} onClick={this.createVersion}>Create</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );

    

  }
}

export default VersionSelector;