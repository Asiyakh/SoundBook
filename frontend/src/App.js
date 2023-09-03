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
  const [audio,setAudio] = useState("");
  const [playing, setPlaying] = useState("");

  var a;


  const handlePlay = async (id) => {
      if (a){
        a.pause();
        a="";
      }
      const song = eventsList.filter(event => (event.id === id))[0].audio[0]
      a=new Audio(song) 
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
    console.log(e)
    e.preventDefault();
    const data = await axios.post(`${baseUrl}/event`, {description, audio}).catch((err) => {
      console.log(err)
  })
    console.log("data: ", data)
    setEventsList([...eventsList, data.data]);
    setDescription('');
    
  }

  useEffect(() => {
    fetchEvents();
  }, [])
  

  return (
    <div className="App">
      <Typography variant="h3" paddingBottom={"2%"}  color= "primary">SoundBook</Typography>
        <form onSubmit={handleSubmit}>
          <div><label htmlFor="description" sx={{fontWeight: 500  }}>Upload Audio File Below!</label></div>
          <div className="SubmitField">
            <TextField
              fullWidth
              onChange={addFile}
              type='file'
              name="description"
              id="description"
              audio="audio"
              value={description}
            />
          </div>
          <Button variant="contained" type="submit" sx={{margin: '10px'}}>Upload</Button>
        </form>
        <Grid item xs={12} md={6} className="Audios">
        <Typography className="Subheader"><>Uploaded Audios</></Typography>
            <List sx={{border: 1, borderRadius: '10px'}}>
                {eventsList.map(event => {
                  return (
                    <>
                    <ListItem key={event.id} secondaryAction={
                      <>
                      <IconButton onClick={() => handlePlay(event.id)} edge="end" aria-label="delete" color="primary">
                        <PlayCircleOutlineIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(event.id)} edge="end" aria-label="delete" color="primary">
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
