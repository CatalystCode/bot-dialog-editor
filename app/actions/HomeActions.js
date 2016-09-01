import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getDialogsSuccess',
      'getDialogsSuccessFail',
      'getVersionsSuccess',
      'getVersionsFail',
      'createVersionSuccess',
      'createVersionFail',
      'createDialogSuccess',
      'createDialogFail',
      'deleteDialogSuccess',
      'deleteDialogFail',
      'versionCheckSuccess',

      'setVersion',
      'setDialog',
      'setContent',
      'throwError'
    );
  }

  getDialogs(version) {
    $.ajax({ url: '/api/dialogs/get/' + (version || '') })
      .done(data => {
        this.actions.getDialogsSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.throwError(jqXhr.responseText);
      });
  }

  getVersions() {
    $.ajax({ url: '/api/dialogs/versions' })
      .done(data => {
        this.actions.getVersionsSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.throwError(jqXhr.responseText);
      });
  }

  selectVersion(version) {
    this.actions.getDialogs(version);
    this.actions.setVersion(version);
  }

  selectDialog(dialog, version) {
    this.actions.getContent(dialog, version);
    this.actions.setVersion(version);
    this.actions.setDialog(dialog)
  }

  getContent(dialog, version) {
    var self = this;
    $.getJSON( '/api/dialogs/content/' + dialog + '/' + (version || ''), function( json ) {
      self.actions.setContent(json);
    });
  }

  createVersion(name) {
    $.ajax({
      method: "PUT", 
      url: '/api/dialogs/version/' + name 
    })
      .done(data => {
        this.actions.getVersions(); // Refreshing versions list
        this.actions.createVersionSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.throwError(jqXhr.responseText);
      });
  }

  checkVersion(name) {
    $.ajax('/api/dialogs/dialog/check-version/' + name)
      .done(data => {
        this.actions.versionCheckSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.throwError(jqXhr.responseText);
      });
  }

  createDialog(name, version) {
    $.ajax({
      method: "PUT", 
      url: '/api/dialogs/dialog/' + name + '/' + (version || '')
    })
      .done(data => {
        getDialogs(version); // Refreshing files list
        this.actions.createDialogSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.throwError(jqXhr.responseText);
      });
  }

  deleteDialog(name, version) {
    $.ajax({
      method: "DELETE", 
      url: '/api/dialogs/dialog/' + name + '/' + version 
    })
      .done(data => {
        getDialogs(version); // Refreshing files list
        this.actions.deleteDialogSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.throwError(jqXhr.responseText);
      });
  }
}

export default alt.createActions(HomeActions);