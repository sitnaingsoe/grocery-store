import {useAppDispatch, useAppSelector} from "@/store/hook";
import {createProduct} from "@/store/slices/productSlice";
import {CreateProductPayload} from "@/type/product";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {Product, ProductCategory} from "@prisma/client";
import React from "react";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewProductDialogBox = ({open, setOpen}: Props) => {
  const {productCategory} = useAppSelector((state) => state.productCategory);
  const [newProduct, setProduct] = React.useState<CreateProductPayload>({
    name: "",
    price: 0,
    productCategoryIds: [],
  });
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handelCreate = () => {
    dispatch(createProduct(newProduct));
  };
  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Product </DialogTitle>
        <DialogContent>
          <Box sx={{display: "flex", flexDirection: "column"}}>
            <TextField
              sx={{m: 1}}
              label="name  "
              onChange={(evt) => {
                setProduct({...newProduct, name: evt.target.value});
              }}
            />
            <TextField
              sx={{m: 1}}
              label="price  "
              onChange={(evt) => {
                setProduct({...newProduct, price: Number(evt.target.value)});
              }}
            />
            <FormControl sx={{m: 1}}>
              <InputLabel>Product Category</InputLabel>
              <Select
                input={<OutlinedInput label="Product Category" />}
                onChange={(evt) => {
                  const selected = evt.target.value as number[];
                  setProduct({...newProduct, productCategoryIds: selected});
                }}
                renderValue={() => {
                  const selectedProductCategories = newProduct.productCategoryIds.map(
                    (selectedId) =>
                      productCategory.find((item) => item.id === selectedId) as ProductCategory,
                  );
                  return selectedProductCategories.map((item) => item.name).join(", ");
                }}
                multiple
                value={newProduct.productCategoryIds}>
                {productCategory.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handelCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewProductDialogBox;
