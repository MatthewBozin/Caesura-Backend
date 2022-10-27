import React, {useContext} from 'react'
import { Button, Typography, Card, CardContent } from '@mui/material'
import DataService from "../dataService";
import { Context } from '../Context';

const Poem = (props) => {
  const [context, setContext] = useContext(Context)
  return (
    <Card className="app poem" style={{ border: "none", boxShadow: "none" }}>
        <CardContent className="app">
            {props.poem.title && <Typography align='center' gutterBottom variant='h4'>{props.poem.title}</Typography>}
            {props.page !== 'profile' && <Typography align='center' gutterBottom variant='h5'>By {props.poem.userName}</Typography>}
            {props.poem.lines.map((line, i) => {
                return <Typography align='center' key={i}>{line}</Typography>
            })}
            <hr></hr>
            <Typography align='center'>With some help from:</Typography>
            <Typography align='center'>
              {props.poem.authors.map((author, i) => {
                  return <span key={i}>{i !== 0 && <span>, </span>}{author}</span>
              })}
            </Typography>
            <hr></hr>
            <Typography align='center'>On {props.poem.date}</Typography>
            <div>   
              {props.user && <Button variant='contained' color='primary' onClick={() => {
                DataService.snap({_id: props.poem._id}).then(() => {
                  DataService.getPoems().then((res) => {
                    props.setPoems(res.data.poems)
                  })
                })
                props.setPoems(null)
              }}>Snaps: {props.poem.snaps.length}</Button>}    
              {props.page === 'profile' && <Button variant='contained' color='primary' onClick={() => {
                DataService.deletePoem({_id: props.poem._id}).then(() => {
                  DataService.getPoems().then((res) => {
                    props.setPoems(res.data.poems)
                  })
                })
                props.setPoems(null)
              }}>Delete</Button>}
              {props.page !== 'poem' && <Button variant='contained' color='primary' onClick={async () => {
                context.id = props.poem._id
                context.poem = props.poem
                context.page = 'viewPoem'
                const res = await DataService.getComments({_id: context.id})
                console.log(res.data.comments)
                context.comments = res.data.comments
                setContext({...context})
              }}>View</Button>}
            </div>
        </CardContent>
    </Card>
  )
}

export default Poem