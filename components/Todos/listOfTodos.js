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
import { Box, Dialog, DialogTitle, TextField,Divider,DialogContent, DialogActions, IconButton, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditDetails from './editDetails'
import {date_parser} from './parsers'
const columns = [
  {
    id: 'title',
    label: 'Todo Title',
    minWidth: 100,
    align: 'left',
},
  { id: 'text', label: 'About todo', minWidth: 170 },
  {
    id:'status',
    label:"Status",
    minWidth: 100,
    align: 'center',
  },
  {
    id:'created_at',
    label:"Created At",
    minWidth: 100,
    align: 'center',
  },
  {
    id:'updated_at',
    label:"Updated At",
    minWidth: 100,
    align: 'center',
  },
  {
    id:'edit',
    label:"Edit Todo",
    minWidth: 100,
    align: 'center',
  },
  {
    id:'delete',
    label:"Delete Todo",
    minWidth: 100,
    align: 'center',
  }


];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const  StickyHeadTable = ({data, reload}) => {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [toEdit, setEdit] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [msg , setMessage] = useState("")

  const remove=(row)=>{
    removeTodo(row).then((response)=>{
      setMessage(response.msg)
    }).catch((err)=>{
      setMessage(err.msg)
    })
    reload()

  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(()=>{
    console.log(msg)
  },[data, msg])
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if(data.length!=0){
      return (
        <div>
        <Dialog open={msg!==""}>
              <DialogTitle><b>Message</b></DialogTitle>
              <Divider></Divider>
              <DialogContent>
                    <Box p={2}>

                          <h4>  Todo {msg=="impossible"? "can't be deleted until marked completed": "deleted successfully !"}</h4>
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
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                { data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        if(column.id != "edit" && column.id!='delete'){
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                           {(column.id=="created_at" || column.id=="updated_at") ? date_parser(value) :value}
                          
                          </TableCell>
                        )
                        }
                        else{
                          return (
                            <TableCell align={column.align}>
                              {(column.id=="edit") && <Button variant="contained"  startIcon={<EditIcon/>} onClick={()=>setEdit(row._id)} style={{background:"#228B22"}}   id="btn-style">Edit</Button>}
                              {(column.id=="delete") && <Button variant="contained" startIcon={<DeleteIcon />} onClick={()=>{remove({id:row._id})}} color="secondary"  id="btn-style">Delete</Button>}
                            </TableCell>
                          )
                        }
                      })}
                    </TableRow>
                  );
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
export default StickyHeadTable;