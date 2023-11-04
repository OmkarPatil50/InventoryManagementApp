import "./Report.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, fetchItems, fetchSales } from "../../Actions/actions";
import { GenerateReportsModal } from "../../components/Modals/generateReportsModal";
import { InventoryReport } from "../../components/Reports/InventoryReport";
import { SalesReport } from "../../components/Reports/SalesReport";

export const Report = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div className="main-page">
      <header className="page-header">
        <h1 className="page-heading">Reports</h1>
        <button
          className="btn-add-new-entry"
          onClick={() => {
            dispatch({
              type: "SHOW_GENERATE_REPORT_MODAL",
              payload: !state.showGenerateReportsModal
            });
          }}
        >
          <i className="fa-solid fa-scroll"></i> Generate Reports
        </button>
      </header>

      {state.showReport && state.reportType === "inventory" ? (
        <InventoryReport />
      ) : state.showReport && state.reportType === "sales" ? (
        <SalesReport />
      ) : (
        ""
      )}

      {state.showGenerateReportsModal ? <GenerateReportsModal /> : ""}
    </div>
  );
};
