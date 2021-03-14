import {useState} from 'react';
import {date_parser, text_parser} from './parsers'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton,Box, Collapse, Table, TableRow, TableCell, Button} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

export const columns = [
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
    

const content = (type, value) =>{
      switch(type){
        
        case "title": return value
        case "status" : return value
        case "text":  return (
          <>
            {value.substring(0,10)}....
          </>
        )
        default: return date_parser(value)
      }
    }


const TodoROW=({row, shouldEdit, del})=>{
      const [open, setOpen] = useState(false);
      console.log(row.text)
      return ( 
            <>
            <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                {columns.map((column) => {
                  if(column.id != "edit" && column.id!='delete'){
                        const value = row[column.id];
                              return (
                                    <TableCell key={column.id} align={column.align}>
                                          {content(column.id, value)}
                                          {column.id=="text" && 
                                          (<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                           </IconButton>)
                                          }
                                    </TableCell>
                              )}
                        else{
                              return (
                                    <TableCell align={column.align}>
                                          { column.id=="edit" && <Button variant="contained"  startIcon={<EditIcon/>} onClick={()=>shouldEdit(row._id)} style={{background:"#228B22"}}   id="btn-style">Edit</Button>}
                                          { column.id=="delete" && <Button variant="contained" startIcon={<DeleteIcon />} onClick={()=>{del({id:row._id})}} color="secondary"  id="btn-style">Delete</Button>}
                                    </TableCell>
                              )
                        }
                })}
              </TableRow>
              <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box width="50%" bgcolor="grey.300" p={1} my={0.5}>
                              <p style={{wordSpacing:"0px"}}>{text_parser(row["text"])}</p>
                        </Box>
                    </Collapse>
                </TableCell>
              </TableRow>
              </>
            )
      
      }

export default TodoROW;