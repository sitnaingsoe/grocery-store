import DeleteDialogBox from "@/components/DeleteDialogBox";
import {useAppDispatch, useAppSelector} from "@/store/hook";
import {showSnackbar} from "@/store/slices/appSnackBarSlice";
import {deleteProductCategory, updatedProductCategory} from "@/store/slices/productCategorySlice";
import {UpdateProductCategory} from "@/type/product-category";
import {Box, Button, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

const ProductCategoryDeatil = () => {
  const router = useRouter();
  const productCategoryId = Number(router.query.id);
  const productCategory = useAppSelector((state) => state.productCategory.productCategory).find(
    (item) => item.id === productCategoryId,
  );
  const dispatch = useAppDispatch();
  const [updateProductCategory, setUpdateProductCategory] = useState<UpdateProductCategory>({
    name: "",
    companyId: undefined,
    isAvailable: false,
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (productCategory) {
      setUpdateProductCategory({
        id: productCategory.id,
        name: productCategory.name,
        isAvailable: productCategory.isAvailable,
        companyId: productCategory.companyId,
      });
    }
  }, [productCategory]);
  if (!productCategory) return null;

  const handleUpdateProductCategory = () => {
    const isValid =
      updateProductCategory.name &&
      updateProductCategory.isAvailable !== undefined &&
      updateProductCategory.companyId;
    if (!isValid) return null;
    dispatch(
      updatedProductCategory({
        ...updateProductCategory,
        onSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "succesfully Updated",
            }),
          );
        },
      }),
    );
    router.push("/backoffice/product-category");
  };
  const handelDelete = () => {
    dispatch(
      deleteProductCategory({
        id: productCategoryId,
        onSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "succesfully deleted",
            }),
          );
        },
      }),
    );
    router.push("/backoffice/product-category");
  };

  return (
    <>
      {" "}
      <Box sx={{display: "flex", justifyContent: "flex-end", p: 2}}>
        <Button
          variant="contained"
          sx={{bgcolor: "red", width: "offsetfix"}}
          onClick={handleClickOpen}>
          Delete
        </Button>
      </Box>
      <Box sx={{p: "20px 20px 40px 40px", display: "flex", flexDirection: "column", width: 400}}>
        <Typography variant="h5" sx={{fontStyle: "italic", m: 1}}>
          ProductCategory
        </Typography>
        <TextField
          sx={{m: 1}}
          defaultValue={productCategory.name}
          onChange={(evt) =>
            setUpdateProductCategory({...updateProductCategory, name: evt.target.value})
          }
        />
        <FormControlLabel
          sx={{m: 1}}
          control={
            <Checkbox
              defaultChecked={productCategory.isAvailable}
              onChange={(evt, value) =>
                setUpdateProductCategory({...updateProductCategory, isAvailable: value})
              }
            />
          }
          label="Available"
        />
        <Button variant="contained" sx={{m: 1, width: 100}} onClick={handleUpdateProductCategory}>
          Update
        </Button>
      </Box>
      <DeleteDialogBox
        open={open}
        setOpen={setOpen}
        handelDelete={handelDelete}
        title="Delete ProductCategory"
        content="Are you want to delete ?"
      />
    </>
  );
};

export default ProductCategoryDeatil;
