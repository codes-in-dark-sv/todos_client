import { useReducer, useEffect, useState } from "react";
import {Button, Box,InputAdornment, Divider,TextField} from '@material-ui/core';
import FillDetails from './fillDetails';
import { getTodos } from "../../actions/todos_actions";
import ListOfTodos from "./listOfTodos";
import SearchIcon from '@material-ui/icons/Search';
const TodoPage =() =>{
     const [actionType, setAction] = useState("")
     const [todosList, setTodosList] = useState([]);
     const [reloadData , setReload] = useState(false);
     const [searchText, setSearch] = useState("")
     const handleChange=(event)=>{
         setSearch(event.target.value);
     }

     useEffect(()=>{
     }, [todosList, searchText])

     
      useEffect(() => {
            getTodos()
            .then(response => {
               setTodosList(response)
            })
            .catch((err) => {
            })
      },[reloadData])
       
      const handleReload = () =>{
            setReload(!reloadData);
      }
      
     const todoForm = (formType) =>{
           switch(formType){
                  case "add": return <FillDetails type="Add" setAction={setAction} reload={handleReload}/>
                  case "" : return <></>
           }
     }

     return( 
       <div>

             <div className="search-header">
                <div className="header-content">
                <p className="inline" id="head">My TODOs</p>
                <div className="inline" id="search-input">
                  <TextField
                        id="search-style"
                        label="Search TODO"
                        value={searchText}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{startAdornment: (<InputAdornment position="start"> <SearchIcon /></InputAdornment>),}}
                  />    
                    
                </div>
                  <div className="inline" id="action">
                        <Button id="btn-style" variant="contained" color="primary" onClick={()=>setAction("add")}> Add Todo </Button>
                  </div>
                   
              
                </div>
            </div>
           
            <div style={{ marginTop: "100px"}}>
                   <ListOfTodos data={todosList} query={searchText.toLowerCase()} setSearch={setSearch} reload={handleReload}/>
      
            </div>
            {todoForm(actionType)}
           
  
            
            
      </div> 
     )
}

export default TodoPage;