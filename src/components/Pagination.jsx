import React from "react";
import { range } from "../helpers/general.helper";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ meta }) => {
  const pageLoop = range(meta.number_of_pages, 1);
  const [, setSearchParams] = useSearchParams();
  const gotoPage = (pageNumber) => {
    setSearchParams((prev) => {
      prev.set("page",pageNumber)
      return prev
    });
  };
  if(meta.is_first_page && meta.is_last_page){
    return <></>
  }
  return (
    <div className="row">
      <div className="col">
        <nav className="float-end" aria-label="...">
          <ul className="pagination">
            <span className={`page-item ${meta.is_first_page && "disabled"}`}>
              <span
                onClick={() => gotoPage(+meta.page - 1)}
                className="page-link"
              >
                Previous
              </span>
            </span>
            {pageLoop.map((pn) => {
              return (
                <li key={pn}>
                  <span
                    onClick={() => gotoPage(pn)}
                    className={`page-link ${pn == meta.page ? "active" : ""}`}
                  >
                    {pn}
                  </span>
                </li>
              );
            })}
            <li className={`page-item ${meta.is_last_page && "disabled"}`}>
              <span
                onClick={() => gotoPage(+meta.page + 1)}
                className="page-link"
              >
                Next
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;