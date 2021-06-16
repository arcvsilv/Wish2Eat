import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import PrivateRoute from './PrivateRoute';
import ListOfStore from '../components/storeComponts/ListOfStore'
import FormStore from '../components/storeComponts/FormStore'
import AdminProducts from '../pages/AdminProducts'
import StoreDetails from '../pages/storeDetails'
import ProductForm from "../pages/Product"
import Login from '../pages/SignIn'
import Store from '../pages/Store'
import Home from '../pages/Home'
import '../css/style.css'

function NotFound() {
   return (
      <div>Page Not Found</div>
   );
}    

const Routes = () => {
   console.log(window.location.pathname);
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/" exact>
               <Home />
            </Route>
            <Route path="/signin" exact>
               <Login />
            </Route>
            <Route path="/storelist" exact>
               <ListOfStore />
            </Route>
                        
            <Route path="/registerStore" exact>
               <Store />
            </Route>
            <Route path="/store/:id/update" exact>
               <FormStore updateStore={'01'} /> 
            </Route>
            <Route path="/store/:id" exact>
               <StoreDetails />
            </Route>            
            <Route path="/store/:id/product" exact>
               <AdminProducts />
            </Route>
            <Route path="/store/:id/product/insert" exact>
               <ProductForm update={'0'} />
            </Route>
            <Route path="/store/:id/product/:idproduct/update" exact>
               <ProductForm update={'01'} />
            </Route>
         </Switch>
      </BrowserRouter > 
   );
}

export default Routes;
 