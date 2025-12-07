import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';

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
const initialAdminState = {
  admin: null,
};

function adminReducer(state = initialAdminState, action) {
  switch (action.type) {
    case "SET_ADMIN":
      return {
        ...state,
        admin: action.payload,
      };
    case "ADMIN_LOGOUT":
      return {
        ...state,
        admin: null,
      };
    default:
      return state;
  }
}

const rootReducer =combineReducers({
    user:userReducer,
    admin:adminReducer
})

const persistConfig={
    key:"root",
    storage
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

const store=createStore(persistedReducer)
const persistor=persistStore(store)

export {store,persistor}