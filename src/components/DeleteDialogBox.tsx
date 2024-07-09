import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handelDelete: () => void;
  title: string;
  content: string;
}

const DeleteDialogBox = ({open, setOpen, title, content, handelDelete}: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(open)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} sx={{color: "#4C4C6D"}}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#4C4C6D",
            width: 100,
            height: 38,
            "&:hover": {bgcolor: "#66667c"},
          }}
          onClick={() => {
            handelDelete();
          }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialogBox;
