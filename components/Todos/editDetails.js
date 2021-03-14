import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { Box, Dialog, InputLabel, DialogTitle, TextField,Divider,DialogContent,MenuItem, FormControl,Select, DialogActions, IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {singleTodo, updateTodoDetails} from "../../actions/todos_actions";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Alert, AlertTitle } from '@material-ui/lab';



const EditForm = ({ id, reload,resetEdit}) =>{
      const [msg , setMessage] = useState("")
      const [todo, setTodo] = useState()
      const [textValue, setTextValue] = useState("");
      const [limit, setLimitMsg] = useState("") 

      useEffect(()=>{
            if(id!=""){
                  singleTodo(id).then(response => {
                        setTodo(response)
                        setTextValue(response.text)
                  }).catch((err) => {
                        setMessage(err.msg)
                  })  
            }
      }, [id])
      useEffect(()=>{
      },[todo,msg, textValue])

      const formSubmit=()=>{
            todo.text=textValue
            updateTodoDetails(todo).then(response => {
                  setMessage(response.msg)
                  setTextValue("")
            }).catch((err) => {
                  setMessage(err.msg)
            })
            reload(false)
      }

      const message = (mesag) =>{
           switch(mesag){
                case "success": return "TODO updated successfully !"
                default : return "Server Side error (please try again)"
          }
      }
      const handleText=(e)=>{
            e.preventDefault()
            var val = e.target.value
            var l = val.length
            if(l<=140){
                  console.log(val)
                  if(val.substr(-1).match(/[^a-zA-Z0-9 ]/g))
                  { 
                        val = val.substr(0,l-1)
                        setLimitMsg("Can only insert alpha-numeric a-z or A-Z or 0-9")
                  }

                  else if(val[l-1]==" " && val[l-2]==" ") {
                        l = val.length
                        if(l>=2) {
                              val = val.substr(0,l-1)
                              setLimitMsg("Can't insert multiple spaces")
                        }
                  }
                  
                  setTextValue(val)
            }
            else{
              setLimitMsg("You can't insert more than 140 charachters")
            }
            
      }
      useEffect(()=>{
            if(limit!=""){
                  setTimeout(function(){ setLimitMsg("") }, 3000);
            }
      },[limit])
      
      if(id!="" && todo)
            return <div>
                  <Dialog open={msg!==""}>
                        <DialogTitle><b>Message</b></DialogTitle>
                        <Divider></Divider>
                        <DialogContent>
                              <Box p={2}>
                                    <h4>{message(msg)}</h4>
                              </Box>
                        </DialogContent>
                        <Box display="flex">
                              <Box width="30%">
                              </Box>
                              <Box p={1}>
                                    <Button variant="contained" color="primary" onClick={()=>{setMessage(""); resetEdit(""); reload();}}>Close</Button>
                              </Box>
                        </Box>
                  </Dialog>
                        
                  <Dialog open={id!=""}  aria-labelledby="customized-dialog-title" aria-labelledby="customized-dialog-title">
                        
                        <DialogTitle>Edit your TODO </DialogTitle>
                              <Divider/>

                        
                        <Box id="close-btn-pos" >
                              <IconButton size="small" aria-label="close"  onClick={ () => resetEdit("")}>
                              <CloseIcon id="close-btn"/>
                              </IconButton>
                        </Box>
                        <DialogContent>

                        <form>
                        { limit!=""&& (<Alert severity="error">
                              <strong>{limit}</strong>
                        </Alert>)}
                              <Box display="flex" width="100%" p={2}>
                                    <Box width="50%" p={2}>
                                          <TextField
                                                type="string"
                                                variant="outlined"
                                                name="title"
                                                label="TODO title"
                                                value={todo.title}
                                                onChange={(e)=> setTodo({ ...todo, title:e.target.value })}

                                          />
                                    </Box>
                                    <Box p={2}>
                                    <FormControl style={{width:"150px"}}>
                                          <Select
                                          variant="outlined"
                                          labelId="status"
                                          name="status"
                                          value={todo.status}
                                          onChange={(e)=> setTodo({ ...todo, status:e.target.value })}
                                    >
                                  
                                          <MenuItem value={"COMPLETE"}>Complete</MenuItem>
                                          <MenuItem value={"INCOMPLETE"}>Incomplete</MenuItem>
                                    </Select>
                                    </FormControl>
                                    </Box>

                              </Box>
                              <Box p={2} width="90%">
                                    <Box display="flex" width="100%" p={2}>
                                          <TextareaAutosize
                                                className="text-area-style"
                                                rowsMax={10}
                                                rowsMin={7}
                                                value={textValue}
                                                onChange={(e)=>{handleText(e)}}
                                                aria-label="maximum height"
                                                placeholder="Describe something about your todo"
                                                
                                          />
                  
                                    </Box>
                              </Box>               
                              <Box display="flex" width="100%" p={1}>
                                    <Box width="10%" p={2}>
                                    </Box>
                                    <Box width="30%" p={2}>
                                          <Button id="btn-style" variant="contained" color="primary" onClick={()=>formSubmit()}>Modify</Button>
                                    </Box>
                                    <Box p={2}>
                                          <Button id="btn-style" variant="contained" color="secondary" onClick={()=>resetEdit("")}>Cancel</Button>
                                    </Box>
                              </Box>
                                    
                        </form>

                        </DialogContent>
                  </Dialog>
                  </div>
      else  
            return <></>
      
}
export default EditForm