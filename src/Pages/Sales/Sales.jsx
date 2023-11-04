import { Loading } from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { NewSaleModal } from "../../components/Modals/addNewSaleModal";
import { useEffect } from "react";
import { deleteSale, fetchItems, fetchSales } from "../../Actions/actions";
import { EditSaleModal } from "../../components/Modals/editSaleModal";

export const Sales = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteSale(id));
  };
  const calculateCurrentStock = (name) => {
    const stockSold = state.salesList.reduce((acc, curr) => {
      return curr?.item?.name === name ? (acc = acc + curr?.quantity) : acc;
    }, 0);
    const stockRemaining =
      parseFloat(
        state.itemsList.find((item) => name === item?.name)?.quantity
      ) - parseFloat(stockSold);
    return stockRemaining;
  };

  const calculateProfitOrLoss = (id, sellingPrice) => {
    const findOrigianlPrice = state.itemsList?.find(({ _id }) => id === _id)
      ?.price;
    const findPercent =
      ((parseFloat(sellingPrice) - parseFloat(findOrigianlPrice)) /
        parseFloat(findOrigianlPrice)) *
      100;
    return Number(findPercent.toFixed(2));
  };

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div className="main-page">
      <header className="page-header">
        <h1 className="page-heading">Sales</h1>
        <button
          className="btn-add-new-entry"
          onClick={() =>
            dispatch({
              type: "SHOW_NEW_SALE_MODAL",
              payload: !state.showNewItemModal
            })
          }
        >
          <i className="fa-solid fa-money-bills"></i> Add New Sales Transaction
        </button>
      </header>

      {state.salesList?.length ? (
        <ul className="entries-list">
          {state.salesList?.map((sale, index) => {
            const { item, price, quantity, _id } = sale;
            return (
              <li key={_id} className="entries-list-item">
                <header className="entries-list-item-header">
                  <h3>
                    {index + 1}. {item?.name}
                  </h3>
                  <div>
                    <button
                      className="btn-edit-entry"
                      onClick={() => {
                        dispatch({
                          type: "SHOW_EDIT_SALE_MODAL",
                          payload: true
                        });
                        dispatch({ type: "SET_SALE_TO_EDIT", payload: sale });
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
                  {calculateCurrentStock(item?.name)}
                </p>
                <p className="entries-list-item-details">
                  <strong>Total Revenue:</strong>{" "}
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {parseFloat(price) * parseFloat(quantity)}/-{" "}
                  {calculateProfitOrLoss(item?._id, price) === 0 ? (
                    <p className="profit-percent">No Profite No loss</p>
                  ) : calculateProfitOrLoss(item?._id, price) > 0 ? (
                    <p className="profit-percent">
                      {`(${Math.abs(
                        calculateProfitOrLoss(item?._id, price)
                      )}% Profit)`}
                    </p>
                  ) : (
                    <p className="loss-percent">
                      {`(${Math.abs(
                        calculateProfitOrLoss(item?._id, price)
                      )}% Loss)`}
                    </p>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="empty-list-line">
          "Ready to make some sales? Start by adding your first transaction
          now!"
        </p>
      )}

      {state.showNewSaleModal ? <NewSaleModal /> : ""}
      {state.showEditSaleModal ? <EditSaleModal /> : ""}
    </div>
  );
};
