import { useDispatch, useSelector } from "react-redux";
import "./reports.css";

export const InventoryReport = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const calculateCurrentStock = (name) => {
    const stockSold = state.salesList.reduce((acc, curr) => {
      return curr.item.name === name ? (acc = acc + curr.quantity) : acc;
    }, 0);
    const stockRemaining =
      parseFloat(state.itemsList.find((item) => name === item.name).quantity) -
      parseFloat(stockSold);
    return stockRemaining;
  };
  return (
    <div className="report">
      <header className="report-header">
        <h2>Inventory Report</h2>
        <button
          className="btn-delete-entry close-modal-btn"
          onClick={() => dispatch({ type: "HIDE_REPORT" })}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </header>
      <table>
        <tr>
          <th>Name of Item</th>
          <th>Quantity Added</th>
          <th>Quantity Available</th>
          <th>Price</th>
        </tr>
        {state.itemsList.map((item) => {
          const { _id, name, quantity, price } = item;
          return (
            <tr key={_id}>
              <td>{name}</td>
              <td>{quantity}</td>
              <td>{calculateCurrentStock(name)}</td>
              <td>{price}/-</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
