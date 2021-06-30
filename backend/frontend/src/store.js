import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ProductListReducer,
  ProductDetailsReducer,
  ProductDeleteReducer,
  ProductCreateReducer,
  ProductUpdateReducer,
  ProductReviewCreateReducer,
  ProductTopRatedCreateReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDetailReducer,
  orderPayReducer,
  ordeMyListReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers";
import {
  userLoginRducer,
  userRegisterRducer,
  userDetailsRducer,
  userUpdateRducer,
  userListRducer,
  userDeleteReducer,
  userAdminUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  productList: ProductListReducer,
  productDetails: ProductDetailsReducer,
  productDelete: ProductDeleteReducer,
  productCreate: ProductCreateReducer,
  productUpdate: ProductUpdateReducer,
  productReviewCreate: ProductReviewCreateReducer,
  productTopRated: ProductTopRatedCreateReducer,
  cart: cartReducer,
  userLogin: userLoginRducer,
  userRegister: userRegisterRducer,
  userDetails: userDetailsRducer,
  userUpdate: userUpdateRducer,
  userAdminUpdate: userAdminUpdateReducer,
  userList: userListRducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderMyList: ordeMyListReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
