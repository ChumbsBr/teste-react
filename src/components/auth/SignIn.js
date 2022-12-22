import React from "react";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function SignIn() {
  const router = useRouter();
  const { signIn } = useAuth();

  return (
    <Formik
      initialValues={{
        login: "daniel",
        senha: "123",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        login: Yup.string()
          .max(255)
          .required("Login is required"),
          senha: Yup.string().max(255).required("Senha is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signIn(values.login, values.senha);
          router.push("/");
        } catch (error) {
          const message = error.message || "Something went wrong";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>         
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <TextField
            type="text"
            name="login"
            label="Login"
            value={values.login}
            error={Boolean(touched.login && errors.login)}
            fullWidth
            helperText={touched.login && errors.login}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <TextField
            type="password"
            name="senha"
            label="Senha"
            value={values.senha}
            error={Boolean(touched.senha && errors.senha)}
            fullWidth
            helperText={touched.senha && errors.senha}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Sign in
          </Button>
          <Link href="/auth/reset-password">
            <Button fullWidth color="primary">
              Forgot password
            </Button>
          </Link>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
