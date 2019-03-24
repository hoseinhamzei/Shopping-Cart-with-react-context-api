import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import listContext from './list_context';
import Types from './Types';


class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = { 
      list: [
        {name:'book', id:1}, {name:'laptop', id:2}, {name:'game console', id:3}, {name:'radio', id:4}
    ],
    cart:[],
    addNew: this.addNew,
    removePd: this.removePd
     }
  }
  
  render() {

    return (
      <listContext.Provider value={this.state}>
        <Content cartcount={this.getCartCount()}/>
      </listContext.Provider>
    )
    
  }

  //////

  getCartCount(){

    let cnt = 0;

    if(this.state.cart.length > 0){

      this.state.cart.forEach(item => {
      cnt += item.count;
      });

      return cnt;

    }else{
      return 0;
    }
    
  }

  //////

  addNew = (pd) => {
    const newList = [...this.state.cart];

    const newItem = {
      count:1,
      id:pd.id,
      name:pd.name
    }

    const filtered = newList.filter(i =>{
      return i.id === pd.id;
    });

    if(filtered.length > 0){
      const pos = newList.map(i => { return i.id; }).indexOf(pd.id);
      newList[pos].count += 1;
    }else{
      newList.push(newItem);
    }
    

    this.setState({cart:newList});
  }

  //////

  removePd = (indx) =>{
    const cartList = [...this.state.cart];

    cartList.splice(indx,1);

    this.setState({cart:cartList});
  }
}


////////////////////////////////////////////////////

class Content extends Component {
  
  render() { 
    return ( 
        <div>
          <div className='nav'>
            <Link to='/'>
              <button>products</button>
            </Link>
  
            <Link to='/cart'>
              <button>{'cart('+this.props.cartcount+')'}</button>
            </Link>
            
          </div>
  
        <Switch>
          <Route exact path='/' component={List}/>
          <Route path='/cart' component={Cart}/>
          <Route path='/types' component={Types}/>
        </Switch>
        </div>
     );
  }
}
 
/////////////////////////////////////////////////////////


class List extends Component {
  
  render() { 
    let lst = this.context.list;
    const pdlist = lst.map((i,index) => {
      return <li key={index}>id:{i.id} | product name: <strong>{i.name}</strong>  <Addbutton pd={i}/></li>
    })

    return ( 
          <ul>
            {pdlist}
          </ul>
      );
  }
}

List.contextType = listContext;

///////////////////////////////////////////////////////


class Cart extends Component {

  render() { 
    let crt = this.context.cart;
    const cartlist = crt.map((i,index) => {
      return (
      <tr key={index}>
        <td>{i.id}</td>
        <td>{i.name}</td>
        <td>{'x'+i.count}</td>
        <td>{<Removebutton pd={i}/>}</td>
      </tr>
      )
    })

    if(crt.length > 0){

    return ( 

          <div style={
            {padding:'15px'}
          }>
          <table className='c'>
            
            <tr className='thead'>
              <th>ID</th>
              <th>NAME</th>
              <th>QUANTITY</th>
              <th>ACTIONS</th>
            </tr>
            {cartlist}
          </table>
          </div>
      )

        } else{
          return <p className='c'>cart is empty</p>
        }
  }
}

Cart.contextType = listContext;

//////////////////////////////////////////////////////

function Addbutton(props){
  return(
    <listContext.Consumer>
      {(value) => (
          <button onClick={()=>value.addNew(props.pd)}>
            add to cart
          </button>
          )}
          </listContext.Consumer>
  )
}



//////////////////////////////////////////////////////

function Removebutton(props){
  return(
    <listContext.Consumer>
      {(value) => (
          <button onClick={()=>value.removePd(value.cart.indexOf(props.pd))}>
            remove
          </button>
          )}
          </listContext.Consumer>
  )
}




export default App;
