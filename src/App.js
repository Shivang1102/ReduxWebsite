import { useEffect, Fragment } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector , useDispatch } from 'react-redux';
import { uiActions } from './Store/ui-slice';
import Notification from './components/UI/Notification';
import { fetchCartData } from './Store/cart-action';

let isInitital =true;
function App() {
  const showCart = useSelector(state=>state.ui.cartIsVisible);
  const notification = useSelector(state=>state.ui.notification)
    const dispatch = useDispatch();
   const cart = useSelector(state=>state.cart);

   useEffect(()=>{
        dispatch(fetchCartData())
   },[dispatch])

   useEffect(()=>{
    const sendCartData = async()=>{
            dispatch(uiActions.showNotification({
              status:'pending',
              title:'sending...',
              message:'Sending Cart Data!'
            }))
          const response =await fetch('https://reduxwebsite-1f841-default-rtdb.firebaseio.com/cart.json',{
        method:'PUT',
        body:JSON.stringify({items:cart.items,totalQuantity:cart.totalQuantity})
      })
      if(!response.ok){
         throw new Error('Sending Cart Data Failed!')
      }

      
      dispatch(uiActions.showNotification({
        status:'success',
        title:'Success!',
        message:'Send Cart Data Successfully!'
      }))


    }

    if(isInitital){
      isInitital=false;
      return
    }
    if(cart.changed){
      sendCartData().catch(err=>{
        dispatch(uiActions.showNotification({
          status:'error',
          title:'Error!',
          message:'Send Cart Data Failed!'
        }))
  
      })
  
    }
    

   },[cart,dispatch])


  return (
    <Fragment>
    {notification &&  <Notification  status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
      {showCart  && <Cart />}
      <Products />
    </Layout>
   </Fragment>
  );
}

export default App;
