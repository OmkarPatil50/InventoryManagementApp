const initialState = {
  itemsList: [],
  salesList: [],
  loading: false,
  error: null,
  showNewItemModal: false,
  showEditItemModal: false,
  itemToEdit: {},
  showNewSaleModal: false,
  showEditSaleModal: false,
  saleToEdit: {},
  showGenerateReportsModal: false,
  showReport: false,
  reportType: ""
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING": {
      return { ...state, loading: action.payload };
    }

    case "FETCH_ITEMS_DATA_SUCCESS": {
      return {
        ...state,
        itemsList: action.payload,
        loading: false,
        error: null
      };
    }

    case "FETCH_SALES_DATA_SUCCESS": {
      return {
        ...state,
        salesList: action.payload,
        loading: false,
        error: null
      };
    }

    case "ADD_NEW_ITEM_SUCCESS": {
      return {
        ...state,
        itemsList: [...state.itemsList, action.payload],
        loading: false,
        error: null
      };
    }

    case "ADD_NEW_SALE_SUCCESS": {
      return {
        ...state,
        salesList: action.payload,
        loading: false,
        error: null
      };
    }

    case "SHOW_NEW_ITEM_MODAL": {
      return { ...state, showNewItemModal: action.payload };
    }

    case "SHOW_EDIT_ITEM_MODAL": {
      return { ...state, showEditItemModal: action.payload };
    }

    case "SET_ITEM_TO_EDIT": {
      return { ...state, itemToEdit: action.payload };
    }

    case "SHOW_NEW_SALE_MODAL": {
      return { ...state, showNewSaleModal: action.payload };
    }

    case "SHOW_EDIT_SALE_MODAL": {
      return { ...state, showEditSaleModal: action.payload };
    }

    case "SET_SALE_TO_EDIT": {
      return { ...state, saleToEdit: action.payload };
    }

    case "SHOW_GENERATE_REPORT_MODAL": {
      return { ...state, showGenerateReportsModal: action.payload };
    }

    case "HIDE_REPORT": {
      return { ...state, showReport: false, reportType: "" };
    }

    case "SET_REPORT_TYPE": {
      return { ...state, showReport: true, reportType: action.payload };
    }

    default:
      return state;
  }
};
