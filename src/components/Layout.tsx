import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import BackofficeLayout from './BackofficeLayout'
import OrderLayout from './OrderLayout'

interface Props{
    children:ReactNode
}

const Layout = ({children}:Props) => {
    const router = useRouter();
    const pathname = router.pathname;
    const isBackoffice = pathname.includes("backoffice");
    const isOrder = pathname.includes("order");
    if(isBackoffice) {
        return <BackofficeLayout >{children}</BackofficeLayout>
    }
    if(isOrder){
        return <OrderLayout>{children}</OrderLayout>
    }
  return (
    <Box>{children}</Box>
  )
}

export default Layout
