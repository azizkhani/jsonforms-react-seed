import { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { IUser } from '../../shared/model/user.model';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SortIcon from '@material-ui/icons/Sort';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { Link, RouteComponentProps } from 'react-router-dom';
import schema from './schema.json';
import uischema from './uischema-search.json';
import { JsonForms } from '@jsonforms/react';
import { getEntities, deleteEntity, resetSearch, reset } from '../../state/user.reducer';
import { IRootState } from '../../shared/reducer';
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { ITEMS_PER_PAGE } from '../../shared/util/pagination.constants';

const useStyles = makeStyles((_theme) => ({
  margin: {
    margin: _theme.spacing(0.5),
  },
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto',
    display: 'block',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
}));

const initialPagination = {
  itemsPerPage: ITEMS_PER_PAGE,
  sort: 'id',
  order: 'desc',
  activePage: 0,
};
const renderers = [...materialRenderers];

export interface IUserProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{
      url: string;
    }> {}

const UserList = (props: IUserProps) => {
  const { loading, userList, totalPages } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [pagination, setPagination] = useState(initialPagination);
  const [entity, setEntity] = useState<IUser>(props.userSearch);

  useEffect(() => {
    getUsersFromProps();
  }, [entity, pagination.activePage, pagination.order, pagination.sort]);

  const navigateToEdit = (user: IUser) => {
    props.history.push({
      pathname: `/users/${user.id}/edit`,
      state: user,
    });
  };

  const getUsersFromProps = () => {
    props.getEntities(entity, pagination.activePage, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
  };

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    props.deleteEntity(selectedId);
    setOpen(false);
  };

  const sort = (p) => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });

  const handlePagination = (event, value) => {
    console.log(value);
    setPagination({
      ...pagination,
      activePage: value - 1,
    });
  };

  const handleSyncList = () => {
    getUsersFromProps();
  };

  const handleClearSearch = () => {
    setEntity({});
  };

  return (
    <Fragment>
      <Grid container justify={'center'} spacing={1} className={classes.container} alignItems='center'>
        <Grid item sm={8}>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={entity}
            renderers={renderers}
            cells={materialCells}
            onChange={({ data }) => setEntity(data)}
          />
        </Grid>
        <Grid item sm={4}>
          <Button
            color='primary'
            size='small'
            variant='outlined'
            startIcon={<SearchIcon />}
            className={classes.margin}
            onClick={handleSyncList}
          >
            Search
          </Button>
          <Button
            color='primary'
            size='small'
            variant='outlined'
            startIcon={<ClearIcon />}
            className={classes.margin}
            onClick={handleClearSearch}
          >
            Clear
          </Button>
          <Button
            color='primary'
            size='small'
            variant='outlined'
            startIcon={<AddIcon />}
            className={classes.margin}
            component={Link}
            to={'/users/create'}
          >
            Create
          </Button>
        </Grid>
        <Grid item sm={12}>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell onClick={sort('username')}>
                    <SortIcon fontSize='small' color='secondary'></SortIcon>
                    Username
                  </TableCell>
                  <TableCell onClick={sort('name')}>
                    <SortIcon fontSize='small' color='secondary'></SortIcon>
                    Name
                  </TableCell>
                  <TableCell onClick={sort('email')}>
                    <SortIcon fontSize='small' color='secondary'></SortIcon>
                    Email
                  </TableCell>
                  <TableCell onClick={sort('activated')}>
                    <SortIcon fontSize='small' color='secondary'></SortIcon>
                    Activated
                  </TableCell>
                  <TableCell>Actions </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user, i) => (
                  <TableRow key={`entity-${i}`}>
                    <TableCell>{i}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.activated ? (
                        <CheckBoxIcon fontSize='small' color='secondary'></CheckBoxIcon>
                      ) : (
                        <CheckBoxOutlineBlankIcon fontSize='small' color='secondary'></CheckBoxOutlineBlankIcon>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <Button
                          color='primary'
                          size='small'
                          variant='outlined'
                          startIcon={<SaveIcon />}
                          className={classes.margin}
                          onClick={(e) => navigateToEdit(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          color='secondary'
                          size='small'
                          startIcon={<DeleteIcon />}
                          variant='outlined'
                          onClick={(e) => handleClickOpen(user?.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Grid>
        <Grid item sm={12}>
          {totalPages > 0 ? (
            <Pagination count={totalPages} variant='outlined' onChange={handlePagination} showFirstButton showLastButton />
          ) : (
            <Typography>User list is empty</Typography>
          )}
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{'Are u sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>After delete record you can not revert</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Disagree
          </Button>
          <Button onClick={handleDelete} color='primary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = ({ user }: IRootState) => ({
  userList: user.entities,
  userSearch: user.entity,
  loading: user.loading,
  totalPages: user.totalPages,
});

const mapDispatchToProps = {
  getEntities,
  deleteEntity,
  reset,
  resetSearch,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
