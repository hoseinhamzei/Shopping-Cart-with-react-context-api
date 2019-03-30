import React, { useState, useEffect } from 'react';
import listContext from './list_context';

//global store for our app we can create multiple stores if needed

function Store({children}){

    // the app's initial state

    const initialState = { 

      cart:[],

      cartCount:0,
  
      addNew: addNew,
      removePd: removePd
      
      }

      //initiate app state with initialstates

      const [ appstate, setState ] = useState(initialState);
      
      // pass the state as context's value
      
    return(
      <listContext.Provider value={appstate}>
        {children}
      </listContext.Provider>
    )

    ////// add new product to cart and update cart count

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
        
        setState({...appstate, cart:newList, cartCount:getCartCount()});

      }
    
      ////// remove product from cart and update cart count
    
      function removePd(indx){
        const cartList = appstate.cart;
    
        cartList.splice(indx,1);
    
        setState({...appstate, cart:cartList, cartCount:getCartCount()});
      }

      ////// function to get the number of products in cart

      function getCartCount(){

        let cnt = 0;
    
        if(appstate.cart.length > 0){
    
          appstate.cart.forEach(item => {
          cnt += item.count;
          });
          
        }

        return cnt;

      }
    
}

export default Store;
