import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import NextLink from "next/link";
import { Helmet } from "react-helmet-async";
import Settings from "../components/Settings";
import { DeleteData, UpdateData } from "../../src/functions/crud";
import { AuthContext } from "../contexts/JWTContext";

import {
  Alert,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Checkbox,
  Chip as MuiChip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Link,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  Add as AddIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@mui/icons-material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { spacing } from "@mui/system";

import DashboardLayout from "../layouts/Dashboard";

const newData = { Descricao: "Usuário atualizado" };

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => ({
    el,
    index,
  }));
  stabilizedThis.sort((a, b) => {
    const order = comparator(a.el, b.el);
    if (order !== 0) return order;
    return a.index - b.index;
  });
  return stabilizedThis.map((element) => element.el);
}

const headCells = [
  { id: "nome", alignment: "left", label: "Nome" },
  { id: "permissao", alignment: "left", label: "Permissão" },
  { id: "ativo", alignment: "left", label: "Status" },
  {},
];

const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = (props) => {
  // Here was 'let'
  const { numSelected } = props;

  return (
    <Toolbar>
      <ToolbarTitle>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selecionado
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Lista de Usuários
          </Typography>
        )}
      </ToolbarTitle>
      <Spacer />
      <div>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" size="large">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list" size="large">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

function EnhancedTable() {
  const { url } = React.useContext(AuthContext);
  const urlBase = url + "/usuarios";
  const [tableData, setTableData] = useState([]);
  const [updateTable, setupdateTable] = useState(true);

  function refreshComponent() {
    setupdateTable(true);
  }

  useEffect(() => {
    fetch(urlBase)
      .then((res) => res.json())
      .then((data) => {
        setupdateTable(false);
        setTableData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [updateTable]);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const permissoes = ["", "Gerencial"];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const [idUser, setIdUser] = React.useState();

  function handleClickOpen(idUser) {
    setOpen(true);
    setIdUser(idUser);
  }

  function handleClickOpenConfirm() {
    setOpenConfirm(true);
  }

  function handleCloseConfirm() {
    return setOpenConfirm(false);
  }

  function handleClose() {
    return setOpen(false);
  }

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
            />
            <TableBody>
              {stableSort(tableData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>

                      <TableCell align="left">{row.nome}</TableCell>
                      <TableCell align="left">
                        {permissoes[row.permissao]}
                      </TableCell>
                      <TableCell align="left">
                        {row.ativo ? "Ativo" : "Inativo"}
                      </TableCell>
                      <TableCell padding="none" align="right">
                        <Box mr={2}>
                          <NextLink href="/forms/userForm/" passHref>
                            <Link>
                              <IconButton
                                aria-label="edit"
                                size="large"
                                onClick={() =>
                                  UpdateData(urlBase, row.id, newData)
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Link>
                          </NextLink>

                          <NextLink href="/invoices/detail" passHref>
                            <Link>
                              <IconButton aria-label="details" size="large">
                                <RemoveRedEyeIcon />
                              </IconButton>
                            </Link>
                          </NextLink>

                          <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={() => {
                              handleClickOpen(row.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>

                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {`Deletar Usuário ${idUser}`}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Você tem certeza que deseja deletar este
                                usuário?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose} color="primary">
                                Não
                              </Button>
                              <Button
                                onClick={() => {
                                  handleClose();
                                  handleClickOpenConfirm();
                                  DeleteData(urlBase, idUser);
                                  refreshComponent();
                                }}
                                color="primary"
                                autoFocus
                              >
                                Sim
                              </Button>
                            </DialogActions>
                          </Dialog>

                          <Dialog
                            open={openConfirm}
                            onClose={handleCloseConfirm}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {`Uusário ${idUser} deletado`}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Ele não aparecerá mas na lista.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={handleCloseConfirm}
                                color="primary"
                              >
                                Ok
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Registros por página:"
        />
      </Paper>
    </div>
  );
}

function UsersList() {
  return (
    <>
      <Helmet title="Usuários" />
      <>
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              Usuários
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
              <NextLink href="/" passHref>
                <Link>Nome 1</Link>
              </NextLink>
              <NextLink href="/" passHref>
                <Link>Nome 2</Link>
              </NextLink>
              <Typography>Lista de Usuários</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <NextLink href="/forms/usersForm" passHref>
              <Link>
                <Button variant="contained" color="primary">
                  <AddIcon />
                  Criar Usuário
                </Button>
              </Link>
            </NextLink>
          </Grid>
        </Grid>

        <Divider my={6} />

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <EnhancedTable />
          </Grid>
        </Grid>
      </>
    </>
  );
}

UsersList.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UsersList;

// function Analytics() {
//   const { t } = useTranslation();

//   return (
//     <React.Fragment>
//       <Helmet title="Usuários" />
//       <Grid justifyContent="space-between" container spacing={6}>
//         <Grid item>
//           <Typography variant="h3" gutterBottom>
//             Usuários
//           </Typography>
//         </Grid>
//       </Grid>
//       <Divider my={6} />
//     </React.Fragment>
//   );
// }

// Analytics.getLayout = function getLayout(page) {
//   return <DashboardLayout>{page}</DashboardLayout>;
// };

// export default Analytics;
