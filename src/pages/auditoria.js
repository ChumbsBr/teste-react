import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";

import { spacing } from "@mui/system";

import DashboardLayout from "../layouts/Dashboard";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Analytics() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Helmet title="Auditorias" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Auditorias
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
    </React.Fragment>
  );
}

Analytics.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Analytics;
