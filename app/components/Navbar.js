import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
    this.socket = null;
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange);
    NavbarActions.getCharacterCount();

    this.socket = io.connect();
    this.socket.on('notifications', data => NavbarActions.updateNotifications(data));

    $(document).ajaxStart(() => NavbarActions.updateAjaxAnimation('fadeIn'));

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        NavbarActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });
  }

  componentWillMount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  dismissNotification(notification, event) {
    event.stopPropagation();
    this.socket.emit('dismiss', notification);
  }

  handleSubmit(event) {
    event.preventDefault();

    let searchQuery = this.state.searchQuery.trim();

    if (searchQuery) {
      NavbarActions.findCharacter({
        searchQuery: searchQuery,
        searchForm: this.refs.searchForm,
        history: this.props.history
      });
    }

  }

  render () {

    let notificationItems = (<li><span>You have no notifications</span></li>);
    
    if (this.state.notifications.length > 0) {
      notificationItems = this.state.notifications.map(notification => {
        return (
          <li onClick={this.dismissNotification.bind(this, notification)}>
            <p>
              <b>{notification.title}</b><br /><span>{notification.desc}</span>
            </p>
          </li>
        )
      });
    }

    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <Link to='/' className='navbar-brand'>
            <span ref='triangles' className={'triangles animated ' + this.state.ajaxAnimationClass}>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
            </span>
            App
          </Link>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          <form ref='searchForm' className='navbar-form navbar-left animated' onSubmit={this.handleSubmit.bind(this)}>
            <div className='input-group'>
              <input type='text' className='form-control' placeholder={this.state.totalCharacters + ' characters'} value={this.state.searchQuery} onChange={NavbarActions.updateSearchQuery} />
              <span className='input-group-btn'>
                <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
              </span>
            </div>
          </form>
          <ul className='nav navbar-nav'>
            <li><Link to='/'>Home</Link></li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Dropdown <span className='caret'></span></a>
              <ul className='dropdown-menu'>
                <li><Link to='/sub-path'>Sub Path</Link></li>
                <li className='dropdown-submenu'>
                  <Link to='/sub-path/nav1'>Nav 1</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/sub-path/nav1/nav1-1'>Nav 1-1</Link></li>
                    <li><Link to='/sub-path/nav1/nav1-2'>Nav 1-2</Link></li>
                    <li><Link to='/sub-path/nav1/nav1-3'>Nav 1-3</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/sub-path/nav2'>Nav 2</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/sub-path/nav2/nav2-1'>Nav 2-1</Link></li>
                    <li><Link to='/sub-path/nav2/nav2-2'>Nav 2-2</Link></li>
                    <li><Link to='/sub-path/nav2/nav2-3'>Nav 2-3</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/sub-path/nav3'>Nav 3</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/sub-path/nav3/nav3-1'>Nav 3-1</Link></li>
                    <li><Link to='/sub-path/nav3/nav3-2'>Nav 3-2</Link></li>
                    <li><Link to='/sub-path/nav3/nav3-3'>Nav 3-3</Link></li>
                  </ul>
                </li>
                <li className='divider'></li>
                <li><Link to='/options'>Nav options</Link></li>
              </ul>
            </li>
            <li><Link to='/about'>About</Link></li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Notifications <span className='caret'></span></a>
              <span className='badge badge-up badge-danger'>{this.state.notifications.length || ''}</span>
              <ul className='dropdown-menu notifications-menu'>
                {notificationItems}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;