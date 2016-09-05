import React from 'react';
import {Link} from 'react-router';
import FooterStore from '../stores/FooterStore';
import FooterActions from '../actions/FooterActions';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = FooterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FooterStore.listen(this.onChange);
    FooterActions.getTechnologies();
  }

  componentWillMount() {
    FooterStore.unlisten(this.onChange);
  }

  onChange (state) {
    this.setState(state);
  }

  render () {
    let technologiesItems = this.state.technologies.map((technology) => {
      return (
        <li key={technology.title}>
          <a href={technology.link} target='_blank' title={technology.title}>
            <img className='thumb-md' src={technology.img}/>
          </a>
        </li>
      )
    });

    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-7 hidden-xs'>
              <h3 className='lead'><strong>Technologies</strong> We Use</h3>
              <ul className='list-inline'>
                {technologiesItems}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;