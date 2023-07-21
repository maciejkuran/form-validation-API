import { ReactNode } from 'react';
import classes from './ApiEndpoints.module.scss';
//prettier-ignore
import {createTheme,ThemeProvider,TableContainer,Paper,Table,TableHead,TableRow,TableCell,TableBody,} from '@mui/material';

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1.7rem',
        },
      },
    },
  },
});

const createData = (
  description: string,
  method: string,
  expectedReqBody: string,
  endpoint: string
) => {
  return { description, method, expectedReqBody, endpoint };
};

const rows = [
  createData('Validate password', 'POST', '{password: $value}', '/password'),
  createData('Validate email address', 'POST', '{email: $value}', '/email'),
  createData('Sign In Form', 'POST', '{email: $value, password: $value}', '/sign-in'),
  createData(
    'Sign Up Form',
    'POST',
    '{email: $value, password: $value, confirmPassword: $value}',
    '/sign-up'
  ),
];

const ApiEndpoints = (): ReactNode => {
  return (
    <section id="api-endpoints" className={classes.api}>
      <h2>API Endpoints</h2>
      <p>
        There are 4 endpoints to choose from. You can expect a response with a status code of{' '}
        <code className="code">400</code> (if validation failed), and{' '}
        <code className="code">200</code> if succeded. More in the examples section.
      </p>
      <ThemeProvider theme={theme}>
        <TableContainer sx={{ marginTop: '2rem' }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Method</TableCell>
                <TableCell align="right">Expected req.body</TableCell>
                <TableCell align="right">Endpoint</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.endpoint}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell align="right">
                    <code className="code">{row.method}</code>
                  </TableCell>
                  <TableCell align="right">
                    <span className="code">{row.expectedReqBody}</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="code">{row.endpoint}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </section>
  );
};

export default ApiEndpoints;
