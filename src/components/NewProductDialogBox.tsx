import {useAppDispatch, useAppSelector} from "@/store/hook";
import {createProduct} from "@/store/slices/productSlice";
import {CreateProductPayload} from "@/type/product";
import {
  Box,
  Button,
  Chip,
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
  TextField,
} from "@mui/material";
import {Product, ProductCategory} from "@prisma/client";
import React, {useState} from "react";
import FileDropZone from "./FileDropZone";
import {showSnackbar} from "@/store/slices/appSnackBarSlice";
import {uploadAsset} from "@/store/slices/appSlice";
import {useRouter} from "next/router";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewProductDialogBox = ({open, setOpen}: Props) => {
  const [productImage, setProductImage] = useState<File>();
  const {productCategory} = useAppSelector((state) => state.productCategory);
  const [newProduct, setProduct] = React.useState<CreateProductPayload>({
    name: "",
    price: 0,
    productCategoryIds: [],
    assetUrl: "",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handelCreate = async () => {
    const isValid = newProduct.name && newProduct.price && newProduct.productCategoryIds.length;
    if (!isValid) return;
    if (productImage) {
      dispatch(
        uploadAsset({
          file: productImage,
          onSuccess: (assetUrl) => {
            newProduct.assetUrl = assetUrl;
            dispatch(
              createProduct({
                ...newProduct,
                onSuccess: () => {
                  dispatch(
                    showSnackbar({
                      type: "success",
                      message: "Menu created successfully",
                    }),
                  );
                  setOpen(false);
                },
                onError: () => {
                  dispatch(
                    showSnackbar({
                      type: "error",
                      message: "Error occurred when creating menu",
                    }),
                  );
                },
              }),
            );
          },
        }),
      );
    }
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
            <Box>
              <FileDropZone onDrop={(files) => setProductImage(files[0])} />
              {productImage && (
                <Chip
                  sx={{mt: 2}}
                  label={productImage.name}
                  onDelete={() => setProductImage(undefined)}
                />
              )}
            </Box>
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
