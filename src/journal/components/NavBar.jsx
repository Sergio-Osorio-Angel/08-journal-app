import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { startLogoutFirebase } from "../../store/auth/thunks";

export function NavBar({ drawerWitdh = 240 }) {

    const dispatch = useDispatch();

    function onLogout() {
        dispatch(startLogoutFirebase());
    }

    return (
        <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWitdh}px)` }, ml: { sm: `${drawerWitdh}px` } }}>
            <Toolbar>
                <IconButton color='inherit' edge='start' sx={{ mr: 2, display: { sm: 'none' } }}>
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-around' alignItems='center'>
                    <Typography variant="h6" noWrap component='div'>JournalApp</Typography>
                    <IconButton color="error" onClick={onLogout}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
