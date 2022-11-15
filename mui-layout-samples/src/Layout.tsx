import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import { Drawer,List, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, createTheme, Avatar } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { format } from 'date-fns'

type Props = {
    children: React.ReactNode;
};

export default function Layout({children}:Props) {
    const myComponentStyle = {
        background: '#F9F9F9',
        widht: '100%'
    };

    const drawerWidth:number | string = 240;

    const drawerStyle = {
        width: drawerWidth
    };

    const rootStyle:React.CSSProperties = {
        display: 'flex'
    };

    type MenuItem = {
        title:string,
        path:string,
        icon:JSX.Element
    };

    const menuItems:MenuItem[] = [
        {
            title: "My Notes",
            path: "/",
            icon: <SubjectOutlined color="secondary" />
        },
        {
            title: "Create Note",
            path: "/create",
            icon: <AddCircleOutlineOutlined color="secondary" />
        }
    ];

    const activeStyle:React.CSSProperties | undefined = {
        backgroundColor: '#F4F4F4'
    };

    const appBarStyles:React.CSSProperties = {
        width: `calc(100% - ${drawerWidth}px)`
    };

    const navitateTo = useNavigate();

    const location = useLocation();

    const theme = createTheme();

    const FakeDivHack = styled('div')({
        ...theme.mixins.toolbar
    });

    const dateStyles:React.CSSProperties = {
        flexGrow: 1
    };

    const avatarStyle:React.CSSProperties = {
        marginLeft: theme.spacing(2)
    };

    return (
        <div style={rootStyle}>

            <AppBar style={appBarStyles}
            elevation={0}>

                <Toolbar>
                    <Typography style={dateStyles}>
                        { format(new Date(), 'do MMMM Y')}
                    </Typography>

                    <Typography>
                        Robbie
                    </Typography>
                    <Avatar src="/msn.jpeg" style={avatarStyle} />
                </Toolbar>

            </AppBar>

            <Drawer style={drawerStyle} variant="permanent" anchor="left" PaperProps={{
                style: {
                    width: drawerWidth
                }
            }}>
                <div>
                    <Typography variant="h5">
                        Notes
                    </Typography>
                </div>

                <List>

                    {menuItems.map(item => (
                        <ListItemButton key={item.title}
                            onClick={() => navitateTo(item.path)}
                            style={location.pathname == item.path ? activeStyle : undefined}
                            >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                        )
                    )}
                    
                </List>

            </Drawer>

            <div style={myComponentStyle}>
                <FakeDivHack />
                {children}
            </div>
        </div>
    );
};