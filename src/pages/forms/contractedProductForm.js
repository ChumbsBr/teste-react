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

import {
    DatePicker
  } from "@mui/x-date-pickers";

import { spacing } from "@mui/system";

import DashboardLayout from "../../layouts/Dashboard";

import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/JWTContext";
import format from "date-fns/format";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

let initialValues = {}

const params = {
  "name": "DataRegistro",
  // "value":{values.DataRegistro},
  // error={Boolean(touched.cnpj && errors.cnpj)},
  // fullWidth,
  // helperText={touched.cnpj && errors.cnpj},
  // onBlur={handleBlur},
  // onChange={handleChange},
  // variant="outlined",
  // my={2},
}

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
  const [dateValue, setDateValue] = React.useState(null);
  const [formattedDate, setFormattedDate] = useState(null)

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // var month = dateValue.getUTCMonth() + 1;
    // var day = dateValue.getUTCDate();
    // var year = dateValue.getUTCFullYear();

    setFormattedDate(format(dateValue, 'dd/MM/yyyy'))
    console.log(formattedDate)

    // setDateValue(`${day}/${month}/${year}`)

    if(dateValue != null){
      setFormValues({ ...formValues, ["DataRegistro"]: formattedDate })
    }
    console.log(formValues)
  }

  let errorResponse = {"campoClienteId": undefined, "campoDescricao": undefined, "campoDataRegistro": undefined, "campoProdutoI": undefined, "campoServer": undefined, "campoServerBanco": undefined, "campoBanco": undefined, "campoUsuario": undefined, "campoPsw": undefined}

  errorResponse.campoNomeFantasia = ValidacaoNomeFantasia(formValues)
  errorResponse.campoCnpj = ValidacaoCnpj(formValues)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // var month = dateValue.getUTCMonth() + 1;
    // var day = dateValue.getUTCDate();
    // var year = dateValue.getUTCFullYear();
    // console.log(day, month, year)
    
    // const formatedDate = `${day}/${month}/${year}`
    // data['DataRegistro'] = formatedDate
    // console.log(dateValue)

    // if(errorResponse.campoNomeFantasia == undefined && errorResponse.campoCnpj == undefined){
    CreateData(url + '/produtosContratados', data);
    navigate(-1); // solução provisória
    // }

  }  
  const cellSize = 6
  const cellHeight = 2

  const validationSchema = Yup.object().shape({
    ClienteId: errorResponse.campoClienteId,
    Descricao: errorResponse.campoDescricao,
    DataRegistro: errorResponse.campoDataRegistro,
    ProdutoID: errorResponse.ProdutoID,
    Server: errorResponse.campoServer,
    ServerBanco: errorResponse.ServerBanco,
    Banco: errorResponse.campoBanco,
    Usuario: errorResponse.campoUsuario,
    Psw: errorResponse.campoPsw
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
              Novo Produto Contratado
            </Typography>
            

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={handleSubmit} >
                <Grid container spacing={6} >
                  <Grid item md={cellSize} my={cellHeight}>
                    <TextField
                      name="Cliente_Id"
                      label="Id do Cliente"
                      value={values.ClienteId}
                      error={Boolean(touched.ClienteId && errors.ClienteId)}
                      fullWidth
                      helperText={touched.ClienteId && errors.ClienteId}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="descricao"
                      label="Descrição"
                      value={values.Descricao}
                      error={Boolean(touched.Descricao && errors.Descricao)}
                      fullWidth
                      helperText={touched.Descricao && errors.Descricao}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6} my={2}>
                    {/* <DatePicker
                        // label="Data de registro"
                        value={values.cnpj}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        renderInput={(params) => 
                        //     <TextField
                            // name="DataRegistro"
                            // label="Data de registro"
                            // value={values.cnpj}
                            // error={Boolean(touched.cnpj && errors.cnpj)}
                            // fullWidth
                            // helperText={touched.cnpj && errors.cnpj}
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            // variant="outlined"
                            // my={2}
                        //   />
                        <TextField {...params} />
                        }
                    /> */}
                    <DatePicker
                        // views={['day', 'month', 'year']}
                        label="Data de Registros"
                        value={dateValue}
                        // onChange={handleChange}
                        onChange={(newValue) => {
                          // format(newValue, 'dd/MM/yyyy')
                          setDateValue(newValue);
                        }}
                        // format(dateValue, 'dd/MM/yyyy')
                        renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="ProdutoID"
                      label="Id do produto"
                      value={values.ProdutoID}
                      error={Boolean(touched.ProdutoID && errors.ProdutoID)}
                      fullWidth
                      helperText={touched.ProdutoID && errors.ProdutoID}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    </Grid>
                    <Grid item md={6}>
                    <TextField
                      name="Server"
                      label="Server"
                      value={values.Server}
                      error={Boolean(touched.Server && errors.Server)}
                      fullWidth
                      helperText={touched.Server && errors.Server}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    </Grid>
                    <Grid item md={6}>
                    <TextField
                      name="ServerBanco"
                      label="Server Banco"
                      value={values.ServerBanco}
                      error={Boolean(touched.ServerBanco && errors.ServerBanco)}
                      fullWidth
                      helperText={touched.ServerBanco && errors.ServerBanco}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    </Grid>
                    <Grid item md={6}>
                    <TextField
                      name="Banco"
                      label="Banco"
                      value={values.Banco}
                      error={Boolean(touched.Banco && errors.Banco)}
                      fullWidth
                      helperText={touched.Banco && errors.Banco}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    </Grid>
                    <Grid item md={6}>
                    <TextField
                      name="Usuario"
                      label="Usuário"
                      value={values.Usuario}
                      error={Boolean(touched.Usuario && errors.Usuario)}
                      fullWidth
                      helperText={touched.Usuario && errors.Usuario}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    </Grid>
                    <Grid item md={6}>
                    <TextField
                      name="PSW"
                      label="Psw"
                      value={values.Psw}
                      error={Boolean(touched.Psw && errors.Psw)}
                      fullWidth
                      helperText={touched.Psw && errors.Psw}
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
        Criação do Produto Contratado
      </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
              <NextLink href="/" passHref>
                <Link>Nome 1</Link>
              </NextLink>
              <NextLink href="/produtos_contratados" passHref>
                <Link>Lista de Produtos Contratados</Link>
              </NextLink>
              <Typography>Criar Produto Contratado</Typography>
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