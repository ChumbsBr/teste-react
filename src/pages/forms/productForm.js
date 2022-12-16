import React from "react";
import * as Yup from "yup";
import styled from "@emotion/styled";
import NextLink from "next/link";
import { Formik } from "formik";
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

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const initialValues = {};

const validationSchema = Yup.object().shape({
  descricao: Yup.string().required("Campo obrigatório"),
});

const url = "https://localhost:7228/produtos"

function BasicForm() {

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      resetForm();
      setStatus({ sent: true });
      setSubmitting(false);
      CreateData(url, values)
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              TESTE
            </Typography>
            <Typography variant="body2" gutterBottom>
              TESTE
            </Typography>

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        mt={3}
                        >
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
    <React.Fragment>
      <Helmet title="Criar Produto" />
      <Typography variant="h3" gutterBottom display="inline">
        Criação do Produto
      </Typography>
      
        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <NextLink href="/" passHref>
              <Link>Nome 1</Link>
            </NextLink>
            <NextLink href="/products" passHref>
              <Link>Lista de Produtos</Link>
            </NextLink>
            <Typography>Criar Produto</Typography>
        </Breadcrumbs>

      <Divider my={6} />

      <BasicForm />
    </React.Fragment>
  );
}

FormikPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default FormikPage;
