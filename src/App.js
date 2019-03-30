import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import listContext from './list_context';
import List from './components/List'
import Cart from './components/Cart'


function App() {

      const { cartCount } = useContext(listContext);

      return ( 
        <div>
          <div className='nav'>

            <Link to='/'>
              <button>products</button>
            </Link>
  
            <Link to='/cart'>
              <button>{'cart('+cartCount+')'}</button>
            </Link>
            
          </div>
  
        <Switch>
          <Route exact path='/' component={List}/>
          <Route path='/cart' component={Cart}/>
        </Switch>
        </div>
     );
    
}

 
export default App;
