import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { collection, getDocs } from "firebase/firestore";
import { LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function AdminTable({ data }) {
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);

  const columns = [
    // define columns
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex: pi, pageSize: ps },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  useEffect(() => {
    const docCount = data.length;
    setPageCount(Math.ceil(docCount / ps));
  }, [data, ps]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        {pageOptions.map((option, i) => (
          <button
            key={i}
            onClick={() => {
              setPageIndex(i);
            }}
            className={pageIndex === i ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
}
