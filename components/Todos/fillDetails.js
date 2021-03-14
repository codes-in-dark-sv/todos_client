import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { Box, Dialog, DialogTitle, TextField,Divider,DialogContent, DialogActions, IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {addTodo} from '../../actions/todos_actions';


const fillform = ({type, setAction, reload}) =>{
      
      const {handleSubmit, errors, register, reset} = useForm();
      const [msg , setMessage] = useState("");

      const formSubmit=(data)=>{
            addTodo(data).then(response => {
                  setMessage(response.msg)
                 
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

      useEffect(()=>{
      }, [errors, msg])
      
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
                        
                        <Box display="flex" width="100%" p={1}>
                              <Box width="70%" p={2}>
                                    <TextField
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
                        </Box>
                        <Box display="flex" width="100%" p={1}>
                              <Box width="100%" p={2}>
                                    <TextField
                                          variant="outlined"
                                          name="text"
                                          label="About TODO"
                                          placeholder="Enter the details about your todo"
                                          inputRef={register()}
                                          type="string"
                                          fullWidth
                                    />
                              </Box>
            
                        </Box>
                                    
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