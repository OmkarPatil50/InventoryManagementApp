import { createStore, applyMiddleware } from "redux";
import { inventoryReducer } from "./Reducers/inventoryReducer";
import thunk from "redux-thunk";

export const store = createStore(inventoryReducer, applyMiddleware(thunk));
