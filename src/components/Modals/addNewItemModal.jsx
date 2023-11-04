import { useDispatch } from "react-redux";
import "./modal.css";
import { useState } from "react";
import { addItem } from "../../Actions/actions";

export const NewItemModal = () => {
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    quantity: 0
  });

  const handleAddItem = (newItem) => {
    dispatch(addItem(newItem));
  };
  return (
    <div className="modal-page">
      <div className="modal-box">
        <header className="modal-header">
          <h3 className="modal-heading">Add New Item</h3>
          <button
            className="btn-delete-entry close-modal-btn"
            onClick={() =>
              dispatch({ type: "SHOW_NEW_ITEM_MODAL", payload: false })
            }
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </header>
        <section className="modal-details-section">
          <fieldset>
            <legend>Name of Item</legend>
            <label htmlFor="name">
              <input
                required
                placeholder="Mobiles"
                type="text"
                onChange={(event) =>
                  setNewItem(() => ({
                    ...newItem,
                    name: event.target.value
                  }))
                }
              />
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
                  setNewItem(() => ({
                    ...newItem,
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
                  setNewItem(() => ({
                    ...newItem,
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
                newItem.name.length &&
                newItem.price > 0 &&
                newItem.quantity > 0
              ) {
                handleAddItem(newItem);
                dispatch({ type: "SHOW_NEW_ITEM_MODAL", payload: false });
                setNewItem({
                  name: "",
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
              dispatch({ type: "SHOW_NEW_ITEM_MODAL", payload: false });
              setNewItem({
                name: "",
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
