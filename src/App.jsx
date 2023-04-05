import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';

function SponsortimeTable() {
  const [pager, setPager] = useState({
    page: 1,
    rowsPerPage: 10,
  });

  const handlePageChange = (event, newPage) => {
    setPager({
      ...pager,
      page: newPage + 1,
    });
  };

  const handleRowsPerPageChange = (event) => {
    setPager({
      ...pager,
      page: 1,
      rowsPerPage: event.target.value,
    });
  };

  const result = useQuery(
    ['sponsorTimes', pager],
    () => axios.get(`http://localhost:8000/sponsortimes?page=${pager.page}&size=${pager.rowsPerPage}`).then((res) => res.data),
    {
      refetchOnWindowFocus: false,
    },
  );

  if (result.isLoading) {
    return (
      <div>Loading data...</div>
    );
  }
  const sponsorTimes = result.data;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Submitted</TableCell>
            <TableCell>VideoID</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Length</TableCell>
            <TableCell>Votes</TableCell>
            <TableCell>Views</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Hidden</TableCell>
            <TableCell>S.hidden</TableCell>
            <TableCell>UUID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>UserID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(sponsorTimes.items).map(([key, data]) => {
            const timeSubmitted = new Date(data.timeSubmitted).toISOString();
            const startTime = new Date(data.startTime * 1000).toISOString().substring(11, 16);
            const endTime = new Date(data.endTime * 1000).toISOString().substring(11, 16);
            const length = data.endTime - data.startTime;
            return (
              <TableRow key={key}>
                <TableCell>{timeSubmitted}</TableCell>
                <TableCell>{data.videoID}</TableCell>
                <TableCell>{startTime}</TableCell>
                <TableCell>{endTime}</TableCell>
                <TableCell>{length}</TableCell>
                <TableCell>{data.votes}</TableCell>
                <TableCell>{data.views}</TableCell>
                <TableCell>{data.category}</TableCell>
                <TableCell>{data.actionType}</TableCell>
                <TableCell>{data.hidden}</TableCell>
                <TableCell>{data.shadowHidden}</TableCell>
                <TableCell><textarea value={data.UUID} readOnly /></TableCell>
                <TableCell><textarea value={data.userName ? data.userName : '—'} readOnly /></TableCell>
                <TableCell><textarea value={data.userID} readOnly /></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell><a href="https://github.com/Lartza/sbtools">SB Browser</a> © 2023 <a href="https://github.com/Lartza">Lartza</a>, licensed under <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPLv3</a>. Uses SponsorBlock data licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> from <a href="https://sponsor.ajay.app/">https://sponsor.ajay.app/</a>.</TableCell>
            <TablePagination
              count={sponsorTimes.total}
              page={sponsorTimes.page - 1}
              rowsPerPage={sponsorTimes.size}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () => createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="1">
          <Toolbar disableGutters>
            <h1>SB Browser</h1>
            <Menu><MenuItem>Database Download</MenuItem></Menu>
          </Toolbar>
        </Container>
      </AppBar>
      <SponsortimeTable />
    </ThemeProvider>
  );
}

export default App;
