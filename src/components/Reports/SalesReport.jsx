import { useDispatch, useSelector } from "react-redux";
import "./reports.css";

export const SalesReport = () => {
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
  const calculateProfitOrLoss = (id, sellingPrice) => {
    const findOrigianlPrice = state.itemsList?.find(({ _id }) => id === _id)
      ?.price;
    const findPercent =
      ((parseFloat(sellingPrice) - parseFloat(findOrigianlPrice)) /
        parseFloat(findOrigianlPrice)) *
      100;
    return findPercent.toFixed(2);
  };

  return (
    <div className="report">
      <header className="report-header">
        <h2>Sales Report</h2>
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
          <th>Quantity Sold</th>
          <th>Quantity Available</th>
          <th>Total Revenue</th>
          <th>Net Profit/Loss</th>
        </tr>
        {state.salesList.map((sale) => {
          const { _id, item, quantity, price } = sale;
          return (
            <tr key={_id}>
              <td>{item.name}</td>
              <td>{quantity}</td>
              <td>{calculateCurrentStock(item.name)}</td>
              <td>{parseFloat(price) * parseFloat(quantity)}/- </td>
              <td>{calculateProfitOrLoss(item._id, price)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
