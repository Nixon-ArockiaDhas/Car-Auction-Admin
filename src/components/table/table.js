import React, { useState, useEffect } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, IconButton } from '../../MaterialComponents';
import './table.css';

const DataTable = ({ dataList, view, download, deleteRow }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const role = localStorage.getItem("role");

  function headerRerender(str) {
    let frags = str.replace(/_/g, ' ').toLowerCase().split(' ');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

  useEffect(() => {
    if (dataList.length > 0) {
      setTableData(dataList);
      const headers = Object.keys(dataList[0]).filter(
        key => key !== "cars" && key !== "id" && key !== "aadhar" && key !== "alternate_number" &&
          key !== "pan" && key !== "pincode" && key !== "state_names" && key !== "_id" && key !== "password" && key !== "state"
          && key !== "created_at"
      );
      setHeaders(headers);
    }
  }, [dataList]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const paginatedTenders = tableData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  function formatDate(dateString) {
    if (!dateString) return "";
    const [datePart, timePart, hours] = dateString.split(" ");
    if (!datePart || !timePart) return "";
    const [day, month, year] = datePart.split("/");
    if (!day || !month || !year) return "";
    const timeParts = timePart.split(" ");
    const time = timeParts[0]?.replace(/:\d{2}$/, "") || "";
    const ampm = hours?.toUpperCase() || "";
    return `${day}  /  ${month}  /  ${year} - ${time} ${ampm}`;
  }

  return (
    <Container maxWidth="xxl" className="tableConatiner" >
      <Paper sx={{ width: '100%', overflow: 'hidden' }} className='tableContent'>
        {dataList.length === 0 ? (
          <div className='emptyContainer'> <h4> No Record Found</h4></div>
        ) : (<>   <TableContainer sx={{ maxHeight: 'max-content' }} >
          <Table stickyHeader aria-label="sticky table" >
            <TableHead>
              <TableRow >
                {headers.map((headers, index) => (
                  <TableCell className='tableHeader' key={index}>{headerRerender(headers)}</TableCell>
                ))}
                <TableCell className='tableHeader'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTenders.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                  hover
                >
                  {headers.map((header, columnIndex) => (
                    <TableCell
                      className={`tableBody ${header.toLowerCase() === 'status' && typeof row[header] === 'string' &&
                          (row[header].toLowerCase() === 'active' || row[header].toLowerCase() === 'completed')
                          ? 'status-active'
                          : header.toLowerCase() === 'status' && typeof row[header] === 'string' &&
                            row[header].toLowerCase() === 'inactive'
                            ? 'status-inactive'
                            : header.toLowerCase() === 'status' && typeof row[header] === 'string' &&
                              row[header].toLowerCase() === 'upcoming'
                              ? 'status-upcoming'
                              : header.toLowerCase() === 'status' && typeof row[header] === 'string' &&
                              row[header].toLowerCase() === 'ongoing'
                              ? 'status-ongoing'
                              : ''
                        }`}
                      key={columnIndex}
                    >
                      {header.toLowerCase() === 'status' && typeof row[header] === 'string' ? (
                        row[header].charAt(0).toUpperCase() + row[header].slice(1).toLowerCase()
                      ) : header.toLowerCase().includes('date') && row[header] ? (
                        formatDate(row[header])
                      ) : (
                        row[header] || ''
                      )}
                    </TableCell>

                  ))}
                  <TableCell className="tableBody">
                    {hoveredRow === rowIndex && (
                      download ? (
                        <div style={{ display: 'flex', columnGap: '1rem' }}>
                          <IconButton className="viewButton">
                            <img src="images/icons/excel.svg" alt="download" />
                          </IconButton>
                          { (role === 'superadmin' || role === 'admin')  && (
                          <IconButton className="viewButton" onClick={() => deleteRow(row._id)}>
                            <img src="images/icons/trash.svg" alt="download" />
                          </IconButton>
                          )}
                        </div>
                      ) : (
                        <IconButton className="viewButton" onClick={() => view(row)}>
                          <img src="images/icons/view.svg" alt="view" />
                        </IconButton>
                      )
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          <TablePagination
            variant='outlined'
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={dataList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
        )}
      </Paper>
    </Container>
  );
}

export default DataTable;