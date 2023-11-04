import "./Inventory.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewItemModal } from "../../components/Modals/addNewItemModal";
import { deleteItem, fetchItems, fetchSales } from "../../Actions/actions";
import { EditItemModal } from "../../components/Modals/editItemModal";

export const Inventory = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const calculateCurrentStock = (name) => {
    const stockSold = state.salesList.reduce((acc, curr) => {
      return curr.item.name === name ? (acc = acc + curr.quantity) : acc;
    }, 0);
    const stockRemaining =
      parseFloat(state.itemsList.find((item) => name === item.name).quantity) -
      parseFloat(stockSold);
    return stockRemaining;
  };

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div className="main-page">
      <header className="page-header">
        <h1 className="page-heading">Inventory</h1>
        <button
          className="btn-add-new-entry"
          onClick={() =>
            dispatch({
              type: "SHOW_NEW_ITEM_MODAL",
              payload: !state.showNewItemModal
            })
          }
        >
          <i className="fa-solid fa-dolly"></i> Add New Item
        </button>
      </header>

      {state.itemsList?.length ? (
        <ul className="entries-list">
          {state.itemsList.map((item, index) => {
            const { name, price, quantity, _id } = item;
            return (
              <li key={_id} className="entries-list-item">
                <header className="entries-list-item-header">
                  <h3>
                    {index + 1}. {name}
                  </h3>
                  <div>
                    <button
                      className="btn-edit-entry"
                      onClick={() => {
                        dispatch({
                          type: "SHOW_EDIT_ITEM_MODAL",
                          payload: true
                        });
                        dispatch({ type: "SET_ITEM_TO_EDIT", payload: item });
                      }}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="btn-delete-entry"
                      onClick={() => handleDelete(_id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </header>
                <p className="entries-list-item-details">
                  <strong>Price:</strong>
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {price}/-
                </p>
                <p className="entries-list-item-details">
                  <strong>Quantity:</strong> {quantity}
                </p>
                <p className="entries-list-item-details">
                  <strong>Currently in stock:</strong>{" "}
                  {calculateCurrentStock(name)}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="empty-list-line">
          "Inventory list looking empty? Begin by adding your first item now!"
        </p>
      )}

      {state.showNewItemModal ? <NewItemModal /> : ""}
      {state.showEditItemModal ? <EditItemModal /> : ""}
    </div>
  );
};
