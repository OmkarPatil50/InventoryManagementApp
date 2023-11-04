import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const GenerateReportsModal = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [report, setReport] = useState("all");

  return (
    <div className="modal-page">
      <div className="modal-box">
        <header className="modal-header">
          <h3 className="modal-heading">Generate Report</h3>
          <button
            className="btn-delete-entry close-modal-btn"
            onClick={() =>
              dispatch({ type: "SHOW_GENERATE_REPORT_MODAL", payload: false })
            }
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </header>
        <section className="modal-details-section">
          <select
            name="report"
            className="sale-item-name-select"
            onChange={(event) => setReport(event.target.value)}
          >
            <option value="all">Select Report Type</option>
            <option value="inventory">Inventory Report</option>
            <option value="sales">Sales Report</option>
          </select>
        </section>

        <button
          className="btn-save-modal btn-generate-report"
          onClick={() => {
            if (report.length) {
              dispatch({
                type: "SHOW_GENERATE_REPORT_MODAL",
                payload: false
              });
              dispatch({
                type: "SET_REPORT_TYPE",
                payload: report
              });
            }
          }}
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};
