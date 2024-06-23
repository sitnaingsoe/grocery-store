import {useAppDispatch} from "@/store/hook";
import {upDateUser, User} from "@/store/slices/userSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, {useEffect} from "react";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const DialogBox = ({open, setOpen, setSelectedUser, selectedUser}: Props) => {
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handelUpdate = () => {
    if (selectedUser) {
      dispatch(upDateUser(selectedUser));
    }
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        <Box sx={{mt: 3, display: "flex", flexDirection: "column", width: 400}}>
          <TextField
            value={selectedUser?.name}
            sx={{mt: 2}}
            label="name"
            onChange={(e) => {
              selectedUser && setSelectedUser({...selectedUser, name: e.target.value});
            }}
          />
          <TextField
            value={selectedUser?.email}
            sx={{mt: 2}}
            label="email"
            onChange={(e) => {
              selectedUser && setSelectedUser({...selectedUser, email: e.target.value});
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Disagree</Button>
        <Button onClick={handelUpdate}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
