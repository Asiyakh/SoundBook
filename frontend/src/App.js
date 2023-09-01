import axios from "axios";
import {format} from "date-fns"
import {useEffect, useState} from 'react';
import * as React from 'react';
import {Typography, Button, Grid, TextField, List, ListItem, Divider, IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


import './App.css';

function App() {
  const baseUrl = "http://localhost:5000"

  const [description, setDescription] = useState("")
  const [eventsList, setEventsList] = useState([]);
  const[buttonName,setButtonName] = useState('Play')
  const [audio,setAudio] = useState();

  var a;

  if(audio){
   a=new Audio(audio) 
  }

  const handlePlay = async (id) => {
      a.pause()
      a.play()
   }

  const addFile = (e) => {
    const s=URL.createObjectURL(e.target.files[0])
    setAudio(s)
    setDescription(e.target.value)
  }

  const fetchEvents = async () => {
    const data = await axios.get(`${baseUrl}/event`).catch((err) => {
      console.log(err)
  })
    const {events} = data.data
    setEventsList(events);
    console.log("DATA: ", data)
  }

  const handleDelete = async (id) => {
    await axios.delete(`${baseUrl}/event/${id}`).catch((err) => {
      console.log(err)
    })
    const updatedList = eventsList.filter(event => (event.id !== id))
    setEventsList(updatedList)
    console.log(eventsList)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post(`${baseUrl}/event`, {description}).catch((err) => {
      console.log(err)
  })
    setEventsList([...eventsList, data.data]);
    setDescription('');
  }

  useEffect(() => {
    fetchEvents();
  }, [])
  

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <div><label htmlFor="description">Description</label></div>
          <div>
            <TextField
              fullWidth
              onChange={addFile}
              type='file'
              name="description"
              id="description"
              value={description}
            />
          </div>
          <Button variant="contained" type="submit" sx={{margin: '10px'}}>Submit</Button>
        </form>
        <Grid item xs={12} md={6}>
            <List>
                {eventsList.map(event => {
                  return (
                    <>
                    <ListItem key={event.id} secondaryAction={
                      <>
                      <IconButton onClick={() => handlePlay()} edge="end" aria-label="delete">
                        <PlayCircleOutlineIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(event.id)} edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      </>
                    }>{event.description}</ListItem>
                    <Divider component="li" />
                    </>
                  )
                })}
            </List>
        </Grid>
    </div>
  );
}

export default App;
