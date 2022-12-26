import React, { useState } from "react";
import * as Yup from "yup";
import styled from "@emotion/styled";
import NextLink from "next/link";
import { Formik, yupToFormErrors } from "formik";
import { Helmet } from "react-helmet-async";
import { CreateData } from "../../functions/crud";

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
import { AuthContext } from "../../contexts/JWTContext";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

let initialValues = {}

function ValidacaoNomeFantasia(formValues){
    if(!formValues.nomeFantasia){
        return Yup.string().required("Campo obrigatório")
      }
      else if(formValues.nomeFantasia && formValues.nomeFantasia.length <= 2){
        return Yup.string().required("Descrição muito curta")
      }
      else{
        return undefined
      }
}

function ValidacaoCnpj(formValues){
    if(!formValues.cnpj){
        return Yup.string().required("Campo obrigatório")
      }
      else{    
        return undefined
      }
}

function BasicForm() { 
  const { url } = React.useContext(AuthContext)  
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  }

  let errorResponse = {"campoNomeFantasia": undefined, "campoCnpj": undefined}

  errorResponse.campoNomeFantasia = ValidacaoNomeFantasia(formValues)
  errorResponse.campoCnpj = ValidacaoCnpj(formValues)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if(errorResponse.campoNomeFantasia == undefined && errorResponse.campoCnpj == undefined){
        CreateData(url + '/clientes', data);
        navigate(-1); // solução provisória
    }

  }  

  const validationSchema = Yup.object().shape({
    nomeFantasia: errorResponse.campoNomeFantasia,
    cnpj: errorResponse.campoCnpj,
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
              Novo Cliente
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
                      name="nomeFantasia"
                      label="Nome Fantasia"
                      value={values.nomeFantasia}
                      error={Boolean(touched.nomeFantasia && errors.nomeFantasia)}
                      fullWidth
                      helperText={touched.nomeFantasia && errors.nomeFantasia}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <TextField
                      name="cnpj"
                      label="CNPJ"
                      value={values.cnpj}
                      error={Boolean(touched.cnpj && errors.cnpj)}
                      fullWidth
                      helperText={touched.cnpj && errors.cnpj}
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

function FormikPage() {
  return (
    <>
      <Helmet title="Criar Produto" />
      <Typography variant="h3" gutterBottom display="inline">
        Criação do Cliente
      </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
              <NextLink href="/" passHref>
                <Link>Nome 1</Link>
              </NextLink>
              <NextLink href="/clientes" passHref>
                <Link>Lista de Clientes</Link>
              </NextLink>
              <Typography>Criar Cliente</Typography>
          </Breadcrumbs>

      <Divider my={6} />

      <Router><BasicForm /></Router>
    </>
  );
}

FormikPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default FormikPage;