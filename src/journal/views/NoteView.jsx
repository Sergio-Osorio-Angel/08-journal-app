import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';


import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import { useRef } from "react";


export function NoteView() {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector((state) => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const inputFileRef = useRef();


    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved])


    function onSaveNote() {
        dispatch(startSaveNote());
    }

    function onFileInputChange({ target }) {
        if (target.files === 0) {
            return;
        } else {
            dispatch(startUploadingFiles(target.files));
        }
    }

    function onDelete() {
        dispatch(startDeletingNote())
    }

    return (
        <Grid container direction="row" justifyContent='space-between' sx={{ mb: 1 }} className="animate__animated animate__fadeIn animate__faster">

            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>
            <Grid item>

                <input ref={inputFileRef} type="file" name="input-file" id="input-file" multiple onChange={onFileInputChange} style={{ display: 'none' }} />
                <IconButton color="primary" disabled={isSaving} onClick={()=> inputFileRef.current.click()}>
                    <UploadOutlined />
                </IconButton>

                <Button onClick={onSaveNote} disabled={isSaving} color="primary" sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField type='text' variant="filled" fullWidth
                    placeholder="Ingrese un título" label='Título' sx={{ border: 'none', mb: 1 }}
                    name='title' value={title} onChange={onInputChange} />
                <TextField type='text' variant="filled" minRows={5}
                    multiline fullWidth placeholder="¿Qué sucedió en el día de hoy?" sx={{ border: 'none', mb: 1 }}
                    name='body' value={body} onChange={onInputChange} />
            </Grid>

            <Grid container justifyContent='end'>
                <Button onClick={onDelete} sx={{mt:2}} color='error'>
                    <DeleteOutline/>
                    Borrar
                </Button>
            </Grid>

            {/* Galeria de imagenes */}
            <ImageGallery images={note.imagesUrls} />

        </Grid>
    )
}
