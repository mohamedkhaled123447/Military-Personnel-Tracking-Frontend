import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecords } from "../context/RecordsContext";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBCheckbox,
  MDBBtn,
  MDBCard,
} from "mdb-react-ui-kit";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Delete from "@mui/icons-material/Delete";
import { soldierrHeaderNames, officerHeaderNames } from "../utils/MostUsed";
import "../style/Table.css";
import { useUser } from "../context/UserContext";
import { useConfirmSnackbar } from "../context/ConfirmSnackbarContext";
import { useAlertSnackbar } from "../context/AlertSnackbarContext";
function Table() {
  const [searchParams, setSearchParams] = useSearchParams();

  const target = searchParams.get("target");
  const { user, ip } = useUser();
  const { showConfirmSnackbar } = useConfirmSnackbar();
  const { showAlertSnackbar } = useAlertSnackbar();
  const { data, dataLength, handleDeleteRecord, fetchData, setFilters } =
    useRecords();
  const [checkBoxs, setCheckBoxs] = useState([]);
  const [sortColumn, setSortColumn] = useState("seniority");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const handleSelectUser = (e) => {
    const userId = parseInt(e.target.value);
    if (e.target.checked) {
      setCheckBoxs((prev) => [...prev, userId]);
    } else {
      setCheckBoxs((prev) => prev.filter((id) => id !== userId));
    }
  };
  const deleteRecords = async () => {
    if (!user.is_staff) {
      showAlertSnackbar("هذا الحساب ليس له الصلاحية", "error");
      return;
    }

    const response = await fetch(`${ip}/userData/delete-records/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({ users: checkBoxs }),
    });
    if (response.ok) {
      showAlertSnackbar(
        `تم حذف ${checkBoxs.length} ${target} بنجاح`,
        "success"
      );
    }
  };
  const handleDeleteAll = () => {
    showConfirmSnackbar(
      "تأكيد الحذف",
      () => {
        deleteRecords();
      },
      () => {
        console.log("Cancelled!");
      },
      "bottom",
      "center"
    );
  };

  const sortedData = data.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(dataLength / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber, target);
  };
  useEffect(() => {
    fetchData(1, target);
  }, []);
  return (
    <>
      <h3 className="text-center my-4 fw-bold">
        سجل{" "}
        {target === "جندي"
          ? "الجنود"
          : target === "ضابط"
          ? "الضباط"
          : "ضباط الصف"}
      </h3>
      <MDBCard className="my-table-card">
        <MDBTable className="my-table">
          <MDBTableHead>
            <tr>
              <th onClick={handleDeleteAll}>
                حذف المحدد <Delete />
              </th>
              {target === "ضابط"
                ? officerHeaderNames.map(([name, label], index) => (
                    <th key={index} onClick={() => handleSort(name)}>
                      {label}{" "}
                      {sortColumn === name &&
                        (sortDirection === "asc" ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        ))}
                    </th>
                  ))
                : soldierrHeaderNames.map(([name, label], index) => (
                    <th key={index} onClick={() => handleSort(name)}>
                      {label}{" "}
                      {sortColumn === name &&
                        (sortDirection === "asc" ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        ))}
                    </th>
                  ))}
              <th>م</th>
              <th>
                <MDBCheckbox
                  onChange={(e) =>
                    e.target.checked
                      ? setCheckBoxs(sortedData.map((item) => item.id))
                      : setCheckBoxs([])
                  }
                />
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {sortedData.map((item, index) => (
              <tr key={item.id} className="table-row">
                <td>
                  {(user.type === 1 || user.type === 2) && (
                    <MDBBtn
                      color="danger"
                      size="sm"
                      onClick={() => handleDeleteRecord(item.id)}
                    >
                      حذف
                    </MDBBtn>
                  )}
                  <a href={`/records/user/${item.id}/`} target="_blank">
                    <MDBBtn className="ms-1" color="success" size="sm">
                      فتح
                    </MDBBtn>
                  </a>
                </td>
                {target === "ضابط"
                  ? officerHeaderNames.map(([name, label], index) => (
                      <td key={index}>{item[name]}</td>
                    ))
                  : soldierrHeaderNames.map(([name, label], index) => (
                      <td key={index}>{item[name]}</td>
                    ))}
                <td>{15 * (currentPage - 1) + index + 1}</td>
                <td>
                  <MDBCheckbox
                    value={item.id}
                    checked={checkBoxs.includes(item.id)}
                    onChange={handleSelectUser}
                  />
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

        <MDBPagination className="justify-content-center">
          <MDBPaginationItem disabled={currentPage === 1}>
            <MDBPaginationLink
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &laquo;
            </MDBPaginationLink>
          </MDBPaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <MDBPaginationItem active={currentPage === index + 1} key={index}>
              <MDBPaginationLink onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </MDBPaginationLink>
            </MDBPaginationItem>
          ))}
          <MDBPaginationItem disabled={currentPage === totalPages}>
            <MDBPaginationLink
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &raquo;
            </MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      </MDBCard>
    </>
  );
}

export default Table;
