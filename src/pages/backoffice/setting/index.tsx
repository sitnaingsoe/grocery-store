import {useAppDispatch, useAppSelector} from "@/store/hook";
import {showSnackbar} from "@/store/slices/appSnackBarSlice";
import {updateCompany} from "@/store/slices/companySlice";
import {UpdateCompanyPayload} from "@/type/company";
import {Box, Button, TextField, Typography} from "@mui/material";
import {Company} from "@prisma/client";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

const SettingPage = () => {
  const {company} = useAppSelector((state) => state.company);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [newCompany, setNewCompany] = useState<UpdateCompanyPayload>({
    name: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    if (company) {
      setNewCompany({name: company.name, email: company.email, city: company.city});
    }
  }, []);
  const handelUpdate = () => {
    const isValid = newCompany.name && newCompany.email && newCompany.city;
    if (!isValid) return console.log("uncomplete data to update");
    const shouldUpdate =
      newCompany.name === company?.name &&
      newCompany.email === company?.email &&
      newCompany.city === company?.city;
    if (shouldUpdate) return console.log("Should not update ");
    dispatch(
      updateCompany({
        ...newCompany,
        id: company?.id,
        onSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "succesfully Updated",
            }),
          );
        },
        onError: () => {
          dispatch(
            showSnackbar({
              type: "error",
              message: "Something Wrong",
            }),
          );
        },
      }),
    );
    router.push("/backoffice/setting");
  };
  if (!company) return null;
  return (
    <Box sx={{p: 5}}>
      <Typography sx={{fontSize: 25, fontStyle: "italic"}}>Setting Page </Typography>
      <Box sx={{display: "flex", flexDirection: "column ", width: 400, m: 5}}>
        <TextField
          label="Company name"
          sx={{mb: 2}}
          defaultValue={company.name}
          onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
        />
        <TextField
          label="Email "
          sx={{mb: 2}}
          defaultValue={company.email}
          onChange={(e) => setNewCompany({...newCompany, email: e.target.value})}
        />
        <TextField
          label="City"
          sx={{mb: 2}}
          defaultValue={company.city}
          onChange={(e) => setNewCompany({...newCompany, city: e.target.value})}
        />
        <Button variant="contained" sx={{width: "fit-content"}} onClick={handelUpdate}>
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default SettingPage;
