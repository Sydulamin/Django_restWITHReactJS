import { useEffect, useState } from 'react'
import { Box, List, ListItem, ListItemText, Typography, ButtonGroup, IconButton, Checkbox, TextField, Button, Divider, } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import Card from './components/Card'
import axios from 'axios';
// import {data} from './mock'

const App = () => {
  const [updateField, setUpdateField] = useState()
  const [data, setData] = useState([])
  const [dlt, setDelete] = useState(false)
  const [value, setValue] = useState("")
  const [updateValue, setUpdateValue] = useState("")
 



  useEffect(() => {

    async function getUser() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/todo/');
        setData(response.data)
        console.log("res", response);
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  },[])
  const handleDelete = async (id) => {
    const response = await axios.delete(`http://127.0.0.1:8000/todo/delete/${id}`);
    console.log("res", response);
    setDelete(!dlt)
  }
  const handleCreate = async (value) => {
    const response = await axios.post(`http://127.0.0.1:8000/todo/create`, { name: value, status: true });
    setValue("")
  }
  const handleUpdate = async (value,id) => {
    // const response = await axios.post(`http://127.0.0.1:8000/todo/update/${id}`, { name: value, status: true });
    // setValue("")
    console.log(value,id);
  }

  return (
    <Box>
      <Typography
        component='h1'
        textAlign='center'
        fontSize='2rem'
        fontWeight={600}
        mt='20px'
      >
        Django React Todo
      </Typography>
      <Card>
        <Box display='flex' columnGap={2}>
          <TextField label='What in you Want to do ?' fullWidth size='small' value={value} onChange={(e) => setValue(e.target.value)} />
          <Button variant='contained' color='primary' size='small' onClick={() => handleCreate(value)}>
            Add
          </Button>
        </Box>
        <List>
          {
            data && data.map(({ id, name, created_at }) => (

              id === updateField ? (
                <Box display='flex' columnGap={2} mt='10px'>
                  <TextField label='Update your  to do ?' fullWidth size='small' value={updateValue} onChange={(e) => setUpdateValue(e.target.value)} />
                  <Button variant='contained' color='primary' size='small' onClick={()=>handleUpdate(updateValue,updateField)}>
                    Update
                  </Button>
                </Box>
              ) : (
                <Box key={id}>
                  <ListItem secondaryAction={
                    <ButtonGroup>
                      <IconButton onClick={() => setUpdateField(id)}>
                        <Edit sx={{ color: 'primary.main' }} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(id)}>
                        <Delete sx={{ color: 'error.main' }} />
                      </IconButton>
                    </ButtonGroup>
                  }
                  >
                    <Checkbox />
                    <ListItemText primary={name} secondary={created_at} />
                  </ListItem>
                  <Divider />
                </Box>
              )

            ))
          }

        </List>
      </Card>
    </Box>
  )
}

export default App;
