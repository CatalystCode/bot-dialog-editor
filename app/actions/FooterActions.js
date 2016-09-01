import alt from '../alt';

class FooterActions {
  constructor () {
    this.generateActions('getTechnologiesDone');
  }

  getTechnologies() {

    let technologies = [
      {
        title: 'React.js',
        img: 'https://facebook.github.io/react/img/logo_small_2x.png',
        link: 'https://facebook.github.io/react/'
      }, 
      {
        title: 'Node.js',
        img: 'https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png',
        link: 'https://nodejs.org'
      }, 
      {
        title: 'gulp',
        img: 'http://gulpjs.com/img/gulp-white-text.svg',
        link: 'https://gulpjs.com'
      },
      {
        title: 'Bower',
        img: 'https://bower.io/img/bower-logo.svg',
        link: 'https://bower.io/'
      },
      {
        title: 'Babel',
        img: 'http://babeljs.io/images/logo.svg',
        link: 'http://babeljs.io/'
      },
      {
        title: 'nodemon',
        img: 'https://camo.githubusercontent.com/fd1ea21338ceeef34920e44e97d099f3c47a78c3/687474703a2f2f6e6f64656d6f6e2e696f2f6e6f64656d6f6e2e737667',
        link: 'http://nodemon.io/'
      }
    ];

    this.actions.getTechnologiesDone(technologies);
  }
}

export default alt.createActions(FooterActions);