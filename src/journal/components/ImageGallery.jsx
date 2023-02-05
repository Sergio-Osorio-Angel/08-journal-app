import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';

export function ImageGallery({images=[]}) {

    return (
        <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={150}>
            {images.map((img) => (
                <ImageListItem key={img}>
                    <img
                        src={img}
                        alt='Imagén de la nota'
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}