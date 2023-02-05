import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { setActiveNote } from "../../store/journal/journalSlice";

export function SideBarItem({title, body, id, date, imagesUrls=[]}) {

    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length> 17
            ? title.substring(0,17) + '...'
            : title;
    }, [title]);

    function onClickNote() {
        dispatch(setActiveNote({title, body, id, date, imagesUrls}));
    }

    return (
        <ListItem disablePadding onClick={onClickNote}>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon >
                <Grid container>
                    <ListItemText primary={newTitle} style={{width: '100%'}}/>
                    <ListItemText secondary={body} style={{width: '100%'}}/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
