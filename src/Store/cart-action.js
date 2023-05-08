import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";


export const fetchCartData =()=>{
      
    return async  dispatch=>{
        const fetchData= async()=>{
            const response= await fetch('https://reduxwebsite-1f841-default-rtdb.firebaseio.com/cart.json');
            if(!response.ok){
                throw new Error('Could not fetch Data');

            }
            const data= await response.json();
            

            return data;
        }

        try{
          const cartData = await fetchData();
            dispatch(cartActions.replaceCard({
                items:cartData.items || [],
                totalQuantity:cartData.totalQuantity
            }))
           
        }catch(error){
            dispatch(uiActions.showNotification({
                status:'error',
                title:'Error!',
                message:'Fetching Cart Data Failed!'
              }))
        }
    }

}