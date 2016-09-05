import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../../stores/HomeStore'
import HomeActions from '../../actions/HomeActions';
import ContentCollapse from './ContentCollapse';
import ContentExpand from './ContentExpand';

class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: HomeStore.getState().content
    };
    this.onChange = this.onChange.bind(this);
    this.clickExpand = this.clickExpand.bind(this);
    this.clickCollapse = this.clickCollapse.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);

    if (this.props.dialog) {
      HomeActions.getContent(this.props.dialog, this.props.version);
    }
  }

  componentDidUpdate() {
    var options = { collapsed: !this.state.opened, withQuotes: true };
    $(React.findDOMNode(this.refs.jsonRenderer)).jsonViewer(JSON.parse(this.state.content), options);
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({
      content: state.content,
      opened: false
    });
  }

  clickCollapse() {
    this.setState({ opened: false });
  }

  clickExpand() {
    this.setState({ opened: true });
  }

  render() {

    var self = this;

    return (
      <div className={ this.state.content ? '' : 'hide' }>
        <h3>Dialog Content <span className={ self.props.dialog ? '' : 'hide' }>[{self.props.dialog}]</span></h3>
        <div className='btn-toolbar'>
          <ContentCollapse onClick={this.clickCollapse} opened={this.state.opened} />
          <ContentExpand onClick={this.clickExpand} opened={this.state.opened} />
          <Link to={'/edit/' + encodeURIComponent(self.props.dialog) + '/' + encodeURIComponent(self.props.version)} className='btn btn-info btn-sm'>
            <span className="glyphicon glyphicon-edit"></span> Edit
          </Link>
          <Link to={'/view/' + encodeURIComponent(self.props.dialog) + '/' + encodeURIComponent(self.props.version)} className={ (this.props.view !== false ? '' : 'hide') + ' btn btn-info btn-sm' }>
            <span className="glyphicon glyphicon-eye-open"></span> View
          </Link>
        </div>
        <div ref='jsonRenderer'></div>
      </div>
    );
  }
}

export default Content;