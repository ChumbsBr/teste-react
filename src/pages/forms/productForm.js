import React, { useState } from "react";
import * as Yup from "yup";
import styled from "@emotion/styled";
import NextLink from "next/link";
import { Formik } from "formik";
import { Helmet } from "react-helmet-async";
import { CreateData } from "../../functions/crud";
import { AuthContext } from "../../contexts/JWTContext";

import {
  Alert as MuiAlert,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

import DashboardLayout from "../../layouts/Dashboard";

import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

let initialValues = {}

function BasicForm() {  
  const { url } = React.useContext(AuthContext);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  }

  let errorResponse = undefined

  if(!formValues.descricao){
    errorResponse = Yup.string().required("Campo obrigatório")
  }
  else if(formValues.descricao.length <= 1){
    errorResponse = Yup.string().required("Descrição muito curta")
  }
  else{
    errorResponse = undefined
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if(errorResponse == undefined){
      CreateData(url + "/produtos", data);
      navigate(-1); // solução provisória
      // navigate("/produtos", {replace: true});
    }

  }  

  const validationSchema = Yup.object().shape({
    descricao: errorResponse,
  });

  let temp = initialValues
  initialValues = {}

  return (
      <Formik
      initialValues={temp}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Novo Produto
            </Typography>
            

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={handleSubmit} >
                <Grid container spacing={6} >
                  <Grid item md={6}>
                    <TextField
                      name="descricao"
                      label="Descrição do produto"
                      value={values.descricao}
                      error={Boolean(touched.descricao && errors.descricao)}
                      fullWidth
                      helperText={touched.descricao && errors.descricao}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>

                <Box display="flex" justifyContent="right">
                  <Button type="submit" variant="contained" color="primary" mt={3} >
                    Salvar alterações
                  </Button>
                </Box>
                
              </form>
            )}
          </CardContent>
        </Card>
      )}
      </Formik>
  );
}

function FormPage() {
  return (
    <>
      <>
      <Helmet title="Criar Produto" />
        <Typography variant="h3" gutterBottom display="inline">
          Criação do Produto
        </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <NextLink href="/" passHref>
                  <Link>Nome 1</Link>
                </NextLink>
                <NextLink href="/produtos" passHref>
                  <Link>Lista de Produtos</Link>
                </NextLink>
                <Typography>Criar Produto</Typography>
            </Breadcrumbs>

        <Divider my={6} />

        <Router><BasicForm /></Router>
    </>
    </>
  );
}

FormPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default FormPage;