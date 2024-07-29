import {useAppDispatch, useAppSelector} from "@/store/hook";
import {hideSnackbar} from "@/store/slices/appSnackBarSlice";
import {Alert, Snackbar} from "@mui/material";
import {useEffect} from "react";

const AppSnackbar = () => {
  const {type, open, message} = useAppSelector((state) => state.appSnackBar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 3000);
  }, [message]);

  return (
    <Snackbar
      anchorOrigin={{vertical: "bottom", horizontal: "right"}}
      open={open}
      onClose={() => {}}>
      <Alert
        onClose={() => {
          dispatch(hideSnackbar());
          //dispatch(undoMenuCategory());
        }}
        severity={type}
        variant="filled"
        sx={{
          width: "100%",
          bgcolor: type === "error" ? "#EE4266" : "#0F67B1",
          color: "#E8F6EF",
        }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
