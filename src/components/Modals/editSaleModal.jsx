import { useDispatch, useSelector } from "react-redux";
import "./modal.css";
import { useState } from "react";
import { addItem, addSales, updateSale } from "../../Actions/actions";

export const EditSaleModal = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [editSale, setEditSale] = useState({
    item: state.saleToEdit.item,
    price: state.saleToEdit.price,
    quantity: state.saleToEdit.quantity
  });

  const handleEditSale = (editSale) => {
    dispatch(updateSale(state.saleToEdit._id, editSale));
  };
  return (
    <div className="modal-page">
      <div className="modal-box">
        <header className="modal-header">
          <h3 className="modal-heading">Add New Sale Transaction</h3>
          <button
            className="btn-delete-entry close-modal-btn"
            onClick={() =>
              dispatch({ type: "SHOW_EDIT_SALE_MODAL", payload: false })
            }
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </header>
        <section className="modal-details-section">
          <fieldset>
            <legend>Name of Item</legend>
            <label htmlFor="item">
              <select
                name="item"
                value={editSale.item}
                className="sale-item-name-select"
                onChange={(event) => {
                  const getItem = state.itemsList.find(
                    ({ name }) => name === event.target.value
                  );
                  setEditSale(() => ({
                    ...editSale,
                    item: getItem._id
                  }));
                }}
              >
                {state.itemsList.map(({ name, index }) => {
                  return <option key={index}>{name}</option>;
                })}
              </select>
            </label>
          </fieldset>
          <fieldset>
            <legend>Price of Item</legend>
            <label htmlFor="price">
              <input
                required
                placeholder="30000"
                type="number"
                value={editSale.price}
                onChange={(event) =>
                  setEditSale(() => ({
                    ...editSale,
                    price: event.target.value
                  }))
                }
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Quantity</legend>
            <label htmlFor="quantity">
              <input
                required
                type="number"
                placeholder="6"
                value={editSale.quantity}
                onChange={(event) =>
                  setEditSale(() => ({
                    ...editSale,
                    quantity: event.target.value
                  }))
                }
              />
            </label>
          </fieldset>
        </section>
        <section className="btn-section-modal">
          <button
            className="btn-save-modal"
            onClick={() => {
              if (
                editSale.item.name &&
                editSale.price > 0 &&
                editSale.quantity > 0
              ) {
                handleEditSale(editSale);
                dispatch({ type: "SHOW_EDIT_SALE_MODAL", payload: false });
                setEditSale({
                  item: "",
                  price: 0,
                  quantity: 0
                });
              }
            }}
          >
            Update
          </button>
          <button
            className="btn-discard-modal"
            onClick={() => {
              dispatch({ type: "SHOW_EDIT_SALE_MODAL", payload: false });
              setEditSale({
                item: "",
                price: 0,
                quantity: 0
              });
            }}
          >
            Discard
          </button>
        </section>
      </div>
    </div>
  );
};
