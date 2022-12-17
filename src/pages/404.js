import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Helmet } from "react-helmet-async";

import AuthLayout from "../layouts/Auth";

import { Button as MuiButton, Typography } from "@mui/material";
import { spacing } from "@mui/system";

const Button = styled(MuiButton)(spacing);

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;
  background: transparent;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

function Page404() {
  return (
    <Wrapper>
      <Helmet title="404 Error" />
      <Typography component="h1" variant="h1" align="center" gutterBottom>
        404
      </Typography>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        Página não encontrada.
      </Typography>
      <Typography component="h2" variant="body1" align="center" gutterBottom>
        A página que você está procurando pode ter sido removida.
      </Typography>

      <Link href="/" passHref>
        <Button variant="contained" color="secondary" mt={2}>
          Volte para o site
        </Button>
      </Link>
    </Wrapper>
  );
}

Page404.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Page404;
