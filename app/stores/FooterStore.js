import alt from '../alt';
import FooterActions from '../actions/FooterActions';
import errors from '../common/errors'; 

class FooterStore {
  constructor() {
    this.bindActions(FooterActions);
    this.technologies = [];
  }

  onGetTechnologiesDone(data) {
    this.technologies = data;
  }
}

export default alt.createStore(FooterStore);