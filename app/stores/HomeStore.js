import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    
    this.showInfo = false;
    this.dialogs = [];
    this.versions = [];
    this.selectedDialog = null;
    this.selectedVersion = null;
    this.content = null;

    this.validVersionName = false;
    this.errorVersionName = false;
  }

  onSetDialog(dialog) {
    this.selectedDialog = dialog;
    this.showInfo = !!dialog;
  }

  onSetVersion(version) {
    this.selectedVersion = version;
  }

  onSetContent(json) {
    this.content = json;
  }

  onGetDialogsSuccess(data) {
    this.dialogs = data.dialogs;
  }

  onGetVersionsSuccess(data) {
    this.versions = data.versions;
  }

  onVersionCheckSuccess(data) {
    this.validVersionName = data.valid || false;
    this.errorVersionName = data.error || false;
  }

  onCreateVersionSuccess(data) {
    toastr.success('New version created successfully');
  }

  onThrowError(errorMessage) {
    toastr.error(errorMessage);
  }

}

export default alt.createStore(HomeStore);