
import { auth } from "@/lib/auth";
import {
    Container,
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    IconButton,
    InputBase
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default async function AdminUsersPage() {
    const session = await auth();
    if (!session) return <Typography>Access Denied</Typography>;

    // Mock users data
    const users = [
        { id: 1, name: 'Admin User', email: 'admin@bhaveshbishnoi.com', role: 'Admin', status: 'Active', lastActive: 'Just now' },
        { id: 2, name: 'John Doe', email: 'john@example.com', role: 'Editor', status: 'Active', lastActive: '2 hours ago' },
        { id: 3, name: 'Alice Smith', email: 'alice@example.com', role: 'Viewer', status: 'Inactive', lastActive: '5 days ago' },
        { id: 4, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'Active', lastActive: '1 day ago' },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Users Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage user access and roles.
                    </Typography>
                </Box>

                <Paper
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search users..."
                    />
                </Paper>
            </Box>

            <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ bgcolor: 'grey.50' }}>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Last Active</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    hover
                                >
                                    <TableCell component="th" scope="row">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 600 }}>{row.name[0]}</Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600}>{row.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">{row.email}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.role}
                                            size="small"
                                            variant="outlined"
                                            color={row.role === 'Admin' ? 'primary' : 'default'}
                                            sx={{ borderRadius: 1, fontWeight: 500 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                bgcolor: row.status === 'Active' ? 'success.main' : 'text.disabled'
                                            }} />
                                            <Typography variant="body2">{row.status}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'text.secondary' }}>{row.lastActive}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small">
                                            <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}
