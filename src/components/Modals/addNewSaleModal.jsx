import { useDispatch, useSelector } from "react-redux";
import "./modal.css";
import { useState } from "react";
import { addItem, addSales } from "../../Actions/actions";

export const NewSaleModal = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [newSale, setNewSale] = useState({
    item: "",
    price: 0,
    quantity: 0
  });

  const handleAddSale = (newSale) => {
    dispatch(addSales(newSale));
  };
  return (
    <div className="modal-page">
      <div className="modal-box">
        <header className="modal-header">
          <h3 className="modal-heading">Add New Sale Transaction</h3>
          <button
            className="btn-delete-entry close-modal-btn"
            onClick={() =>
              dispatch({ type: "SHOW_NEW_SALE_MODAL", payload: false })
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
                className="sale-item-name-select"
                onChange={(event) => {
                  const getItem = state.itemsList.find(
                    ({ name }) => name === event.target.value
                  );
                  setNewSale(() => ({
                    ...newSale,
                    item: getItem._id
                  }));
                }}
              >
                <option>Select Item</option>
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
                onChange={(event) =>
                  setNewSale(() => ({
                    ...newSale,
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
                onChange={(event) =>
                  setNewSale(() => ({
                    ...newSale,
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
                newSale.item.length &&
                newSale.price > 0 &&
                newSale.quantity > 0
              ) {
                handleAddSale(newSale);
                dispatch({ type: "SHOW_NEW_SALE_MODAL", payload: false });
                setNewSale({
                  item: "",
                  price: 0,
                  quantity: 0
                });
              }
            }}
          >
            Add
          </button>
          <button
            className="btn-discard-modal"
            onClick={() => {
              dispatch({ type: "SHOW_NEW_SALE_MODAL", payload: false });
              setNewSale({
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
