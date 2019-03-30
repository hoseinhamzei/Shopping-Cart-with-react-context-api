import React, { useState, useEffect, useContext } from 'react';
import listContext from '../list_context';

function List(){

    const [list, setList] = useState([]);

    /* we imagine we load the products from a rest api
    so we use the useEffect() hook to setList as soon as
    the component is loaded */

    useEffect(()=>{
        // we assume this array was loaded from a rest api:
        const productList = [
            {name:'book', id:1}, {name:'laptop', id:2}, {name:'game console', id:3}, {name:'radio', id:4}, {name:'notenook', id:56}
        ]

        setList(productList);

    },[])

    const pdlist = list.map((i,index) => {
      return <li key={index}>id:{i.id} | product name: <strong>{i.name}</strong>  <Addbutton pd={i}/></li>
    })

    return ( 
          <ul>
            {pdlist}
          </ul>
      );
  
}

//// a button to add new product to cart

function Addbutton(props){

    const stt = useContext(listContext);

    return(
            <button onClick={()=>stt.addNew(props.pd)}>
              add to cart
            </button>    
    )
  }

  export default List;

