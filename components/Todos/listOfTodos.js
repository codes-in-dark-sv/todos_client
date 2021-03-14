import React, { useEffect , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import {TableRow} from '@material-ui/core';
import { removeTodo } from '../../actions/todos_actions';
import { Box, Dialog, DialogTitle,Typography, TextField,Divider,DialogContent, DialogActions, Button } from '@material-ui/core';
import EditDetails from './editDetails'
import ShowROW, {columns} from './todoRow';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const  TodoList = ({data, reload}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [toEdit, setEdit] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [msg , setMessage] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(()=>{
  },[data, msg])


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  
  const remove=(row)=>{
    removeTodo(row).then((response)=>{
          setMessage(response.msg)
    }).catch((err)=>{
          setMessage(err.msg)
    })
    reload()
  }

  if(data.length!=0){
      return (
        <div>
        <Dialog open={msg!==""}>
              <DialogTitle><b>Message</b></DialogTitle>
              <Divider></Divider>
              <DialogContent>
                    <Box p={2}>
                          <h4>Todo {msg=="impossible"? "can't be deleted until marked completed": "deleted successfully !"}</h4>
                    </Box>
              </DialogContent>
              <Box display="flex">
                    <Box width="30%">
                    </Box>
                    <Box p={1}>
                          <Button variant="contained" color="primary" onClick={()=>{setMessage(""); reload();}}>Close</Button>
                    </Box>
              </Box>
        </Dialog>
        
        
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <b>{column.label} </b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                { data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                   return (<ShowROW row={row} shouldEdit={setEdit} del={remove}/>)
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[7, 14, 28, 49, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <EditDetails id={toEdit} reload={reload} resetEdit={setEdit}/>
      </div>
      )
      }
      else{
        return <div>
          LOADING....
        </div>
      }
}
export default TodoList;