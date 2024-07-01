import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import {ProductCategoryPayload} from "@/type/product-category";
import {useAppDispatch, useAppSelector} from "@/store/hook";
import {addProductCategory, createProductCategory} from "@/store/slices/productCategorySlice";
import {NetworkWifi1BarSharp} from "@mui/icons-material";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewProductCategory: React.Dispatch<React.SetStateAction<ProductCategoryPayload>>;
  newProductCategory: ProductCategoryPayload;
  companyId: number;
}

const NewProductCategory = ({
  open,
  setOpen,
  newProductCategory,
  setNewProductCategory,
  companyId,
}: Props) => {
  const {company} = useAppSelector((state) => state.company);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = () => {
    const isValid = newProductCategory.name && newProductCategory.isAvailable != undefined;
    if (!isValid) return null;
    dispatch(createProductCategory({...newProductCategory, companyId}));
    setOpen(false);
  };
  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title" sx={{fontStyle: "italic "}}>
          New Product Category
        </DialogTitle>
        <DialogContent>
          <Box sx={{display: "flex", flexDirection: "column", p: 2}}>
            <TextField
              label="name"
              sx={{mb: 2, width: 300}}
              onChange={(e) => setNewProductCategory({...newProductCategory, name: e.target.value})}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newProductCategory.isAvailable}
                  onChange={(evt, value) =>
                    setNewProductCategory({...newProductCategory, isAvailable: value})
                  }
                />
              }
              label="Available"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleCreate} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewProductCategory;
