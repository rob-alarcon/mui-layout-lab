import React from "react";
import INote from "../App";
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Avatar, IconButton, Typography } from "@mui/material";
import { DeleteOutline } from '@mui/icons-material'

interface INoteProp {
    note: INote,
    onClick: (id:number) => void
};

export default function NoteCard(noteProp:INoteProp) {
    return (
        <Card elevation={1}>
            <CardHeader 
                title={noteProp.note.title} 
                subheader={noteProp.note.category}
                action={
                    <IconButton onClick={() => noteProp.onClick(noteProp.note.id)}>
                        <DeleteOutline />
                    </IconButton>
                }
                avatar={
                    <Avatar>
                        {noteProp.note.category[0].toUpperCase()}
                    </Avatar>
                }
            
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">{noteProp.note.details}</Typography>
            </CardContent>
        </Card>
    );
}