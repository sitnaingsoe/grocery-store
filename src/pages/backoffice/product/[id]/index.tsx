import {useAppDispatch, useAppSelector} from "@/store/hook";
import {showSnackbar} from "@/store/slices/appSnackBarSlice";
import {deleteProduct, updateProduct} from "@/store/slices/productSlice";
import {CreateProductPayload, UpdateProductPayload} from "@/type/product";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import {Product, ProductCategory} from "@prisma/client";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

const ProductDetail = () => {
  const [newProduct, setNewProduct] = useState<UpdateProductPayload>({
    name: "",
    price: 0,
    productCategoryIds: [],
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const productId = Number(router.query.id);
  const {product} = useAppSelector((state) => state.product);
  const {productCategory} = useAppSelector((state) => state.productCategory);
  const currentProduct = product.find((item) => item.id === productId) as Product;
  const {productCategoryProduct} = useAppSelector((state) => state.productCategoryCategory);
  const oldProductCategoryProductIds = productCategoryProduct
    .filter((item) => item.productId === productId)
    .map((item) => item.productCategoryId);
  useEffect(() => {
    if (currentProduct) {
      setNewProduct({
        id: productId,
        name: currentProduct?.name,
        price: currentProduct?.price,
        productCategoryIds: oldProductCategoryProductIds,
      });
    }
  }, []);
  const handelUpdate = () => {
    const isValid =
      newProduct.id && newProduct.name && newProduct.price && newProduct.productCategoryIds.length;
    if (!isValid) return alert("Uncomplete Data");
    dispatch(
      updateProduct({
        ...newProduct,
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
    router.push("/backoffice/product");
  };
  const handelDelete = () => {
    dispatch(deleteProduct({productId}));
    router.push("/backoffice/product");
  };

  if (!currentProduct) return null;

  return (
    <Box>
      <Box sx={{m: 2, display: "flex", justifyContent: "flex-end"}}>
        <Button variant="contained" sx={{backgroundColor: "red"}} onClick={handelDelete}>
          Delete{" "}
        </Button>
      </Box>
      <Box sx={{ml: 20, mt: 5, display: "flex", flexDirection: "column", width: 300}}>
        <TextField
          sx={{mb: 2}}
          defaultValue={currentProduct?.name}
          onChange={(evt) => {
            setNewProduct({...newProduct, name: evt.target.value});
          }}
        />
        <TextField
          sx={{mb: 2}}
          defaultValue={currentProduct?.price}
          onChange={(evt) => {
            setNewProduct({...newProduct, price: Number(evt.target.value)});
          }}
        />
        <FormControl sx={{mb: 1}}>
          <InputLabel>Product Category</InputLabel>
          <Select
            input={<OutlinedInput label="Product Category" />}
            onChange={(evt) => {
              const selected = evt.target.value as number[];
              setNewProduct({...newProduct, productCategoryIds: selected});
            }}
            renderValue={() => {
              const selectedProductCategories: ProductCategory[] =
                newProduct.productCategoryIds.map(
                  (selectedId: Number) =>
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
        <Button variant="contained" onClick={handelUpdate}>
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetail;
