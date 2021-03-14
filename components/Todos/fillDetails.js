import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { Box, Dialog, DialogTitle, TextField,Divider,DialogContent, DialogActions, IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {addTodo} from '../../actions/todos_actions';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { Alert, AlertTitle } from '@material-ui/lab';


const fillform = ({type, setAction, reload}) =>{
      
      const {handleSubmit, errors, register, reset} = useForm();
      const [msg , setMessage] = useState("");
      const [textValue, setTextValue] = useState("");
      const [limit, setLimitMsg] = useState("") 
      
      const formSubmit=(data)=>{
            data.text=textValue
            addTodo(data).then(response => {
                  setMessage(response.msg)
                  setTextValue("")
                 
            }).catch((err) => {
                  setMessage(err.msg)
            })
      }
      const message = (mesag) =>{
           switch(mesag){
                case "exists": return "Todo already exists !"
                case "success": return "Todo added successfully !"
                default : return "Server Side error (please try again)"
          }
      } 

      const handleText=(e)=>{
            e.preventDefault()
            var val = e.target.value
            var l = val.length
            if(l<=140){
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
      }, [errors, msg, textValue])
      
      useEffect(()=>{
            if(limit!=""){
                  setTimeout(function(){ setLimitMsg("") }, 3000);
            }
      },[limit])

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
                              <Button variant="contained" color="primary" onClick={()=>{setMessage(""); setAction(""); reload();}}>Close</Button>
                        </Box>
                  </Box>
            </Dialog>
                   
            <Dialog open={type!=""}  aria-labelledby="customized-dialog-title" aria-labelledby="customized-dialog-title">
                  <DialogTitle>Create a TODO </DialogTitle>
                  <Divider/>
                  <Box id="close-btn-pos" >
                    <IconButton size="small" aria-label="close"  onClick={ () => setAction("")}>
                      <CloseIcon id="close-btn"/>
                    </IconButton>
                  </Box>
                  <DialogContent>

                  <form onSubmit={handleSubmit(formSubmit)}>
                        { limit!=""&& (<Alert severity="error">
                              <strong>{limit}</strong>
                        </Alert>)}
                        
                        <div style={{maxWidth:"500px", minWidth:"500px"}}>
                              <Box display="flex" width="100%" p={2}>
                                    <TextField
                                          style={{width:"450px"}}
                                          variant="outlined"
                                          name="title"
                                          label="Todo Title"
                                          type="string"
                                          inputRef={register({required: true})}
                                          error={errors.title ?true:false}
                                          helperText={errors.title? "Title is required":""}
                                          fullWidth
                                    />
                              </Box>
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
                              
                        </div>
                        
                                    
                        <Box display="flex" width="100%" p={1}>
                                    <Box width="10%" p={2}>
                                    </Box>
                                    <Box width="30%" p={2}>
                                          <Button id="btn-style" type="Submit" variant="contained" color="primary">Submit</Button>
                                    </Box>
                                    <Box p={2}>
                                          <Button id="btn-style" variant="contained" color="secondary" onClick={()=>setAction("")}>Cancel</Button>
                                    </Box>
                              </Box>
                              
                  </form>

                  </DialogContent>
            </Dialog>
            </div>
      
}
export default fillform