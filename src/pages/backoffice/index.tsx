import * as React from "react";
import {useState} from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@/store/hook";
import {createUser, deleteUser, User} from "@/store/slices/userSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DialogBox from "@/components/DialogBox";

export default function ClippedDrawer() {
  const [user, setUser] = useState<User>({name: "", email: ""});
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const {users} = useAppSelector((state) => state.user);
  const [showUser, setShowUser] = useState<User[]>([]);
  React.useEffect(() => {
    if (users.length) {
      setShowUser(users);
    }
  }, [users]);
  const handleSetUser = () => {
    dispatch(createUser(user));
    setUser({name: "", email: ""});
  };

  const handleDelete = (item: User) => {
    dispatch(deleteUser({id: item.id}));
  };

  const handleEdit = (item: User) => {
    setSelectedUser(item);
    setDialogOpen(true);
  };
  if (!users.length) return null;
  return (
    <Box sx={{width: "100%", height: "100%"}}>
      <Box
        sx={{
          padding: 10,
          width: "700px",
          height: "90%",
        }}>
        <Divider />
        <Box sx={{mt: 3, display: "flex", flexDirection: "column"}}>
          <TextField
            sx={{mt: 2}}
            value={user.name}
            label="name"
            onChange={(e) => setUser({...user, name: e.target.value})}
          />
          <TextField
            sx={{mt: 2}}
            value={user.email}
            label="email"
            onChange={(e) => setUser({...user, email: e.target.value})}
          />
          <Button
            variant="contained"
            sx={{offsetWidth: "fixed", width: 90, mt: 1}}
            onClick={handleSetUser}>
            Submit
          </Button>
        </Box>
        <Divider />
        <List sx={{width: "100%", maxWidth: 360}}>
          {showUser.length &&
            showUser.map((item) => (
              <ListItem key={item.id} disableGutters>
                <ListItemText primary={item.name} />
                <DeleteIcon
                  sx={{cursor: "pointer"}}
                  onClick={() => {
                    handleDelete(item);
                  }}
                />
                <EditIcon
                  sx={{cursor: "pointer"}}
                  onClick={() => {
                    handleEdit(item);
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Box>
      {selectedUser && (
        <DialogBox
          open={dialogOpen}
          setOpen={setDialogOpen}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
    </Box>
  );
}
