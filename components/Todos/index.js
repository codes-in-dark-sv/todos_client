import { useReducer, useEffect, useState } from "react";
import {Button, Box, Divider} from '@material-ui/core';
import FillDetails from './fillDetails';
import { getTodos } from "../../actions/todos_actions";
import ListOfTodos from "./listOfTodos";
const TodoPage =() =>{
     const [actionType, setAction] = useState("")
     const [todosList, setTodosList] = useState([]);
     const [reloadData , setReload] = useState(false);

     useEffect(()=>{
     }, [todosList])

     
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
            <div className="heading">
                  <div id="about">My todos</div>
                  <div id="action">
                        <Button id="btn-style" variant="contained" color="primary" onClick={()=>setAction("add")}> Add Todo </Button>
                  </div>
            </div>  
            <ListOfTodos data={todosList} reload={handleReload}/>
            {todoForm(actionType)}
            
      </div> 
     )
}

export default TodoPage;