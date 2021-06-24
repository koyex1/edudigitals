import React, { useEffect, useRef, useState } from 'react';
import img from '../images/dp.jpg';
import { message } from 'antd';
import  {PayPalButton}  from 'react-paypal-button-v2';
import axios from 'axios';
import { paymentSuccessful } from '../actions/paymentActions';
import { useDispatch, useSelector } from 'react-redux';
import { cartList  } from '../actions/cartActions';
import { firstToUpper } from '../data/data';


function CartScreen(props) {

  //  const [cartInfo, setCartInfo] = useState(localStorage.getItem('edudigital_cart')?JSON.parse(localStorage.getItem('edudigital_cart')): []);
    const [qty, setQty] = useState({});
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo, error} = userSignin;
    const fee = 10;
    const [total, setTotal] = useState();
    const [checkOut,setCheckOut] = useState(false);
    const paypal = useRef();
    const dispatch = useDispatch();
    const cartInfo = useSelector(state => state.cartInfo);
    

    console.log(cartInfo)
   // const [cart , setCart] = useState();

  


    useEffect(() => {
    const totalSum = cartInfo.map(x=>x.qty * x.charge)
                        .reduce((a,b)=>{
                        return a + b;
                        }, 0) + fee;

        setTotal(totalSum)
    }, [cartInfo])

    useEffect(() => {
       window.paypal && window.paypal.Buttons({
            locale: localStorage.getItem('lang'),
             style: {
                color: 'blue', 
            },
            createOrder: (data, actions, err)=>{
                return actions.order.create({
                    intent: "CAPTURE",
                    
                    purchase_units: [
                        {
                            description: "Cool items",
                            amount:{
                                currency_code: "USD",
                                value: total,
                            },
                            
                        }
                        
                    ]
                })
                
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log('success here')
                console.log(actions)
                console.log(order)
                console.log(data)
                const {orderID, payerID} = data;
                const {update_time} = order
                if(data.orderID){
                paymentSuccessful({payerID,  orderID, userInfo, update_time, cartInfo})
                localStorage.setItem('edudigital_cart', JSON.stringify([]))
                dispatch(cartList())
                props.history.push('/ongoingsession/tutors')

}
            },
            onError:(err) =>{
                console.log('error here')
                console.log(err)
            }

        }).render(paypal.current)
      }, [checkOut])

      console.log(qty)
      

    let cart= []
    const handleRefresh = (getCart) => (event)=> {
        cart = localStorage.getItem('edudigital_cart')?JSON.parse(localStorage.getItem('edudigital_cart')): []
       // cart = cart.filter(x=> x._id != getCart._id)
        
        if(qty[getCart._id]){
        for(let x of cart){
            if(x._id == getCart._id){
                x.qty = qty[getCart._id]
            }
        }}
        //qty[getCart._id]?cart.push({...getCart, qty: qty[getCart._id]}):cart.push(getCart)
        localStorage.setItem('edudigital_cart', JSON.stringify(cart))
        dispatch(cartList())
        //setCartInfo(localStorage.getItem('edudigital_cart')?JSON.parse(localStorage.getItem('edudigital_cart')): [])
        message.success('Quantity refreshed')
    }   
    const handleRemove = (getCart)=>(event)=>{
        cart = localStorage.getItem('edudigital_cart')?JSON.parse(localStorage.getItem('edudigital_cart')): []
        cart = cart.filter(x=> x._id != getCart._id) 
        localStorage.setItem('edudigital_cart', JSON.stringify(cart))
        //setCartInfo(localStorage.getItem('edudigital_cart')?JSON.parse(localStorage.getItem('edudigital_cart')): [])
        dispatch(cartList())
        setCheckOut(false)
        message.error('Item removed')
    }
    const test = {};
    const handleInput = (id) =>(event)=>{
        // refreshValue.id = e.target.value
        test[id] = event.target.value
        setQty({...qty, ...test})
       
        setCheckOut(false)
    }
   
    
   
    return (
        <div>

<div className="surrounding_body">
            <div className="cart_container">

            <div className="loop_container">
                { cartInfo.map(x => (
               
                <div key={x._id} className="items_container">
                <div className="cart_info"> 
                <img  src={`data:${x.profilePicture.contentType};base64,${Buffer.from(x.profilePicture.data.data).toString('base64')}`}/>

                <div className = "cart_information">
                <strong><p className="title_3 ">{firstToUpper(x.firstName) + '  ' + firstToUpper(x.lastName)}</p></strong>
                <p>Charge: ${x.charge}</p>
                <p>Languages: {x.language.split(',').map(
              x=>(
                  <div className="span_block">{x}</div>
              )
            )
            
            }</p>
                <p>Subjects: {x.subjects.split(',').map(
              x=>(
                  <div className="span_block">{x}</div>
              )
            )
            
            }</p>

                <button style={{fontSize:'15px'}} onClick={handleRemove(x)} class="message_button change_color" ><i style={{fontSize:'15px'}} class=' bx bx-trash-alt'></i>Remove</button>
                
                </div>
                </div>

                <div className='cart_qty_cost'>
                Total Hours: 
                <input key={x._id} onChange={handleInput(x._id)} defaultValue={x.qty} type="number"/> 
                <button key={x._id} style={{fontSize:'15px'}} onClick={handleRefresh(x)} class="message_button change_color" ><i style={{fontSize:'20px'}} class='bx bx-refresh'></i></button>
                </div>

                <div className='total_item_charge cart_qty_cost'>
                Total Charge: ${x.qty* x.charge}
                </div>
                </div>
                ))}

</div>
                <div className='total_cost_tab'>
                <p className="checkout_summary">Summary</p>
                    <div className="summary_spacing">
                    <p>subTotal</p>
                    <p>${cartInfo.map(x=>x.qty * x.charge).reduce((a,b)=>{
                        return a + b;
                    }, 0) }</p>
                    </div>
                    <div className="summary_spacing">
                    <p>Fee</p>                    
                    <p>${fee}</p>
                    </div>
                    
                    <div className="summary_spacing">
                    <p>Total</p>                    
                    <p>${total}</p>
                    </div>
                    <div>
                    {checkOut?
                    <div ref={paypal}></div>
                    :<button className="edu_checkout" style={{color: 'black'}} onClick={()=>{
                        setCheckOut(true);
                        
                    }}>Checkout
                        
                    </button>
                    }
                    </div>


                </div>
                
               


                </div>
            </div>
            
        </div>
    )
}

export default CartScreen
