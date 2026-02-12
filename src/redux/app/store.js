import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

const initialUserState={
    user:null,
    accessToken:null
};

function userReducer(state = initialUserState,action){
   switch(action.type){
      case "SET_USER":
        return {
            ...state,
            user:action.payload.user,
            accessToken:action.payload.accessToken
        }
      case "LOGOUT":
        return {
            ...state,
            user:null,
            accessToken:null
        }
        default:
        return state
   }
}



const initialVendorState = {
  vendor: null,
  accessToken: null,
};

function vendorReducer(state = initialVendorState, action) {
  switch (action.type) {
    case "SET_VENDOR":
      return {
        ...state,
        vendor: action.payload.vendor,
        accessToken: action.payload.accessToken,
      };
    case "VENDOR_LOGOUT":
      return {
        ...state,
        vendor: null,
        accessToken: null,
      };
    default:
      return state;
  }
}
const initialWishlistState = {
  items: [], // [{ productId, variantId, productSnapshot }]
};

function wishlistReducer(state = initialWishlistState, action) {
  switch (action.type) {
    case "SET_WISHLIST":
      return {
        ...state,
        items: action.payload,
      };

    case "CLEAR_WISHLIST":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}


const initialCartState = {
  items: [],
  count: 0,
};

export default function cartReducer(state = initialCartState, action) {
  switch (action.type) {
    case "SET_CART": {
      const items = action.payload.items || [];
      return {
        ...state,
        items,
        count: items.length, // ✅ DISTINCT PRODUCTS ONLY
      };
    }

    case "CLEAR_CART":
      return initialCartState;

    default:
      return state;
  }
}
const initialAuthModalState = {
  open: false,
};

function authModalReducer(state = initialAuthModalState, action) {
  switch (action.type) {
    case "OPEN_AUTH_MODAL":
      return { open: true };

    case "CLOSE_AUTH_MODAL":
      return { open: false };

    default:
      return state;
  }
}

const rootReducer =combineReducers({
    user:userReducer,
    vendor:vendorReducer,
      wishlist: wishlistReducer,
      cart:cartReducer ,
      authModal:authModalReducer

})
const persistConfig={
    key:"root",
    storage
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

const store=createStore(persistedReducer, applyMiddleware(thunk))
const persistor=persistStore(store)
console.log(store.getState())
store.subscribe(() => {
  console.log(store.getState());
});


export {store,persistor}