import "./Dashboard.css";
import { ReactComponent as Image } from "../../Data/hero.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, fetchSales } from "../../Actions/actions";

export const Dashboard = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchSales());
  }, [dispatch]);

  const calculateTotalItemsStored = () => {
    const total = state.itemsList.reduce(
      (acc, curr) => (acc = acc + curr.quantity),
      0
    );
    return total;
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

  const calculateTotalItemsAvailable = () => {
    const total = state.itemsList.reduce(
      (acc, curr) => (acc = acc + calculateCurrentStock(curr.name)),
      0
    );
    return total;
  };

  const calculateTotalRevenue = () => {
    const total = state.salesList.reduce(
      (acc, curr) =>
        (acc = acc + parseFloat(curr.price) * parseFloat(curr.quantity)),
      0
    );
    return total;
  };
  const calculateTotalItemsSold = () => {
    const total = state.salesList.reduce(
      (acc, curr) => (acc = acc + curr.quantity),
      0
    );
    return total;
  };

  return (
    <div className="main-page">
      <section className="dashboard-section">
        <Image className="hero-img" />
      </section>
      <section className="dashboard-data dashboard-section">
        <h1 className="page-heading">Inventory Stats</h1>
        <section>
          <h3 className="dashboard-details">
            Total Items Stored: {calculateTotalItemsStored()}
          </h3>
          <h3 className="dashboard-details">
            Total Items Sold: {calculateTotalItemsSold()}
          </h3>
          <h3 className="dashboard-details">
            Total Items Available: {calculateTotalItemsAvailable()}
          </h3>
          <h3 className="dashboard-details">
            Total Revenue: {calculateTotalRevenue()}/-
          </h3>
        </section>
      </section>
    </div>
  );
};
