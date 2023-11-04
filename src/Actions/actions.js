export const fetchItems = () => async (dispatch) => {
  try {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await fetch(
      "https://inventory-management-app.omkarpatil20.repl.co/items"
    );
    const data = await response.json();
    dispatch({ type: "FETCH_ITEMS_DATA_SUCCESS", payload: data.items });
  } catch (error) {
    dispatch({ type: "FETCH_DATA_ERROR", payload: error.message });
  }
};

export const fetchSales = () => async (dispatch) => {
  try {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await fetch(
      "https://inventory-management-app.omkarpatil20.repl.co/sales"
    );
    const data = await response.json();
    dispatch({ type: "FETCH_SALES_DATA_SUCCESS", payload: data.salesData });
  } catch (error) {
    dispatch({ type: "FETCH_DATA_ERROR", payload: error });
  }
};

export const addItem = (newItem) => async (dispatch) => {
  try {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await fetch(
      "https://inventory-management-app.omkarpatil20.repl.co/items",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newItem)
      }
    );
    const data = await response.json();
    dispatch({ type: "ADD_NEW_ITEM_SUCCESS", payload: data.items });
  } catch (error) {
    dispatch({ type: "FETCH_DATA_ERROR", payload: error });
  }
};

export const addSales = (newSale) => async (dispatch) => {
  try {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await fetch(
      "https://inventory-management-app.omkarpatil20.repl.co/sales",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newSale)
      }
    );
    const data = await response.json();
    dispatch({ type: "ADD_NEW_SALE_SUCCESS", payload: data.salesData });
  } catch (error) {
    dispatch({ type: "FETCH_DATA_ERROR", payload: error });
  }
};

export const deleteItem = (itemId) => async (dispatch) => {
  try {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await fetch(
      `https://inventory-management-app.omkarpatil20.repl.co/items/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      }
    );
    const data = await response.json();
    dispatch({ type: "FETCH_ITEMS_DATA_SUCCESS", payload: data.items });
  } catch (error) {
    dispatch({ type: "FETCH_DATA_ERROR", payload: error });
  }
};

export const updateItem = (itemId, updatedItem) => async (dispatch) => {
  try {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await fetch(
      `https://inventory-management-app.omkarpatil20.repl.co/items/${itemId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(updatedItem)
      }
    );
    const data = await response.json();
    dispatch({ type: "FETCH_ITEMS_DATA_SUCCESS", payload: data.items });
  } catch (error) {
    dispatch({ type: "FETCH_DATA_ERROR", payload: error });
  }
};

export const deleteSale = (itemId) => async (dispatch) => {
  try {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await fetch(
      `https://inventory-management-app.omkarpatil20.repl.co/sales/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      }
    );
    const data = await response.json();
    dispatch({ type: "FETCH_SALES_DATA_SUCCESS", payload: data.salesData });
  } catch (error) {
    dispatch({ type: "FETCH_DATA_ERROR", payload: error });
  }
};

export const updateSale = (saleId, updatedSale) => async (dispatch) => {
  try {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await fetch(
      `https://inventory-management-app.omkarpatil20.repl.co/sales/${saleId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(updatedSale)
      }
    );
    const data = await response.json();
    dispatch({ type: "FETCH_SALES_DATA_SUCCESS", payload: data.salesData });
  } catch (error) {
    dispatch({ type: "FETCH_DATA_ERROR", payload: error });
  }
};
