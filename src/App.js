import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import listContext from './list_context';
import Types from './Types';


function App() {

    const initialState = { 

      list: [
        {name:'book', id:1}, {name:'laptop', id:2}, {name:'game console', id:3}, {name:'radio', id:4}
    ],

    cart:[],

    addNew: addNew,
    removePd: removePd
    }
    
    const [ appstate, setState ] = useState(initialState);


    return (
      <listContext.Provider value={appstate}>
        <Content cartcount={getCartCount()}/>
      </listContext.Provider>
    )
    

  //////

  function getCartCount(){

    let cnt = 0;

    if(appstate.cart.length > 0){

      appstate.cart.forEach(item => {
      cnt += item.count;
      });
    }
    return cnt;
  }

  //////

  function addNew(pd){
    let newList = appstate.cart;

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
    
    console.log(newList);
    setState({...appstate, cart:newList});
    console.log(appstate);
  }

  //////

  function removePd(indx){
    const cartList = appstate.cart;

    cartList.splice(indx,1);

    setState({...appstate, cart:cartList});
  }
}


////////////////////////////////////////////////////

function Content(props) {
  
 
    return ( 
        <div>
          <div className='nav'>
            <Link to='/'>
              <button>products</button>
            </Link>
  
            <Link to='/cart'>
              <button>{'cart('+props.cartcount+')'}</button>
            </Link>
            
          </div>
  
        <Switch>
          <Route exact path='${process.env.PUBLIC_URL}/' component={List}/>
          <Route path='${process.env.PUBLIC_URL}/cart' component={Cart}/>
        </Switch>
        </div>
     );

}
 
/////////////////////////////////////////////////////////


function List(){
  

    let lst = useContext(listContext);

    const pdlist = lst.list.map((i,index) => {
      return <li key={index}>id:{i.id} | product name: <strong>{i.name}</strong>  <Addbutton pd={i}/></li>
    })

    return ( 
          <ul>
            {pdlist}
          </ul>
      );
  
}

///////////////////////////////////////////////////////


function Cart(){

    // get shopping cart array from listcontext

    const { cart } = useContext(listContext);

    const cartlist = cart.map((i,index) => {
      return (
      <tr key={index}>
        <td>{i.id}</td>
        <td>{i.name}</td>
        <td>{'x'+i.count}</td>
        <td>{<Removebutton pd={i}/>}</td>
      </tr>
      )
    })

    if(cart.length > 0){

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


//////////////////////////////////////////////////////

function Addbutton(props){
  const stt = useContext(listContext);
  return(
          <button onClick={()=>stt.addNew(props.pd)}>
            add to cart
          </button>    
  )
}



//////////////////////////////////////////////////////

function Removebutton(props){
  const state = useContext(listContext);
  return(
          <button onClick={()=>state.removePd(state.cart.indexOf(props.pd))}>
            remove
          </button>
  )
}




export default App;
