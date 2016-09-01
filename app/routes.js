import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Edit from './components/Edit';
import View from './components/View';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/edit/:dialog/' component={Edit} />
    <Route path='/edit/:dialog/:version' component={Edit} />
    <Route path='/view/:dialog/' component={View} />
    <Route path='/view/:dialog/:version' component={View} />
  </Route>
);


// export default (
//   <Route component={App}>
//     <Route path='/' component={Home} />
//     <Route path='/products/:id' component={Product} />
//     <Route path='/about' component={About} />
//     <Route path=':category' component={ProductList}>
//       <Route path=':subcategory' component={ProductList}>
//         <Route path=':filter' component={ProductList} />
//       </Route>
//     </Route>
//   </Route>
// );