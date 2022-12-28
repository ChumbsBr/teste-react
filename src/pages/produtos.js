import React from "react";
import styled from "@emotion/styled";
import NextLink from "next/link";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "../layouts/Dashboard";
import BaseTable from "./tables/base-table"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import {
  Add as AddIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";

let message = true;

function changeMessage(){
  message = false;
}
function notifyReturn(){
  // toast.success(`Item criado!`);
  message = true
  console.log("*****ENTROU NA FUNCAO!*****")
  toast.success(`Item criado!`,{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    pauseOnFocusLoss: false,
  });
}

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Divider = styled(MuiDivider)(spacing);

function ProductList() {
  const modelBase = '/produtos'
  const props = {tableName:"Produtos", modelBase:modelBase, rows:["id", "descrição"]}
  return (
    <>
      <Helmet title="Produtos" />
      <>
        <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Produtos
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <NextLink href="/" passHref>
              <Link>Nome 1</Link>
            </NextLink>
            <NextLink href="/" passHref>
              <Link>Nome 2</Link>
            </NextLink>
            <Typography>Lista de Produtos</Typography>
          </Breadcrumbs>

        </Grid>
        <Grid item>
          <NextLink href="/forms/productForm" passHref>
              <Link><Button variant="contained" color="primary" onClick={changeMessage}>
                <AddIcon />
                Criar Produto
              </Button></Link>
          </NextLink>
        </Grid>
        </Grid>

        <Divider my={6} />

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <BaseTable {...props}/> 
          </Grid>
        </Grid>
      </>
      {message == false &&
        notifyReturn()
      }
    </>
  );
}

ProductList.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProductList;
