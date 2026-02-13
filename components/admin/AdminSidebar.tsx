'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Box,
    Typography,
    Divider,
    Avatar
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 260;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Blogs', icon: <ArticleIcon />, path: '/admin/blogs' },
    { text: 'Users', icon: <PersonIcon />, path: '/admin/users' },
    { text: 'Price Config', icon: <MonetizationOnIcon />, path: '/admin/pricing' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: '1px solid rgba(0,0,0,0.08)',
                    background: '#ffffff'
                },
            }}
        >
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: '-0.025em' }}>
                    GS<Box component="span" sx={{ color: 'primary.main' }}>Admin</Box>
                </Typography>
            </Toolbar>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ overflow: 'auto', px: 2 }}>
                <List>
                    {menuItems.map((item) => {
                        const active = pathname === item.path || pathname.startsWith(`${item.path}/`);
                        return (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    component={Link}
                                    href={item.path}
                                    selected={active}
                                    sx={{
                                        borderRadius: 2,
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.light',
                                            color: 'primary.main',
                                            '&:hover': {
                                                bgcolor: 'primary.light',
                                            },
                                            '& .MuiListItemIcon-root': {
                                                color: 'primary.main',
                                            }
                                        },
                                        '&:hover': {
                                            bgcolor: 'rgba(0,0,0,0.03)',
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40, color: active ? 'inherit' : 'text.secondary' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontWeight: active ? 700 : 500,
                                            fontSize: '0.9rem'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            <Box sx={{ mt: 'auto', p: 2 }}>
                <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.8rem' }}>AD</Avatar>
                    <Box sx={{ overflow: 'hidden' }}>
                        <Typography variant="subtitle2" noWrap fontWeight={700}>Admin User</Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>admin@example.com</Typography>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}
