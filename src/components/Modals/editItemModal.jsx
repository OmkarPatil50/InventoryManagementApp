import { useDispatch, useSelector } from "react-redux";
import "./modal.css";
import { useState } from "react";
import { addItem, updateItem } from "../../Actions/actions";

export const EditItemModal = () => {
  const { itemToEdit } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [editItem, setEditItem] = useState({
    name: itemToEdit.name,
    price: itemToEdit.price,
    quantity: itemToEdit.quantity
  });

  const handleUpdateItem = (editItem) => {
    dispatch(updateItem(itemToEdit._id, editItem));
  };
  return (
    <div className="modal-page">
      <div className="modal-box">
        <header className="modal-header">
          <h3 className="modal-heading">Edit Item</h3>
          <button
            className="btn-delete-entry close-modal-btn"
            onClick={() =>
              dispatch({
                type: "SHOW_EDIT_ITEM_MODAL",
                payload: false
              })
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
                value={editItem.name}
                onChange={(event) =>
                  setEditItem(() => ({
                    ...editItem,
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
                value={editItem.price}
                onChange={(event) =>
                  setEditItem(() => ({
                    ...editItem,
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
                value={editItem.quantity}
                onChange={(event) =>
                  setEditItem(() => ({
                    ...editItem,
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
                editItem.name.length &&
                editItem.price > 0 &&
                editItem.quantity > 0
              ) {
                handleUpdateItem(editItem);
                dispatch({
                  type: "SHOW_EDIT_ITEM_MODAL",
                  payload: false
                });
                setEditItem({
                  name: "",
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
              dispatch({
                type: "SHOW_EDIT_ITEM_MODAL",
                payload: false
              });
              setEditItem({
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
