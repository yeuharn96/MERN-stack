import { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import EmailListItem from './EmailListItem';

const cols = [
  { id: 'email', label: 'Email' },
  { id: 'first_name', label: 'First Name' },
  { id: 'last_name', label: 'Last Name' }
];

function EmailList(props) {
  const rows = props.rows || [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const pageStart = page * rowsPerPage;
  const pageEnd = page * rowsPerPage + rowsPerPage;
  return (
    <Box sx={{ width: '100%', marginTop: '0.5rem', marginBottom:'2rem', border: 1, borderColor: 'lightgray' }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {cols.map((col) => <TableCell key={col.id}>{col.label}</TableCell>)}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 && rows.slice(pageStart, pageEnd).map((row) => {
              return <EmailListItem
                key={row.id}
                cols={cols}
                row={row}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
              />
            })}
            {rows.length === 0 && <TableRow hover><TableCell colSpan={4} align="center">No record found</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default EmailList;