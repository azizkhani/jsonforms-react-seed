import { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { defaultValue, IUser } from '../../shared/model/user.model';
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { IRootState } from '../../shared/reducer';
import { connect } from 'react-redux';
import { getEntity, updateEntity, reset, createEntity } from '../../state/user.reducer';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const useStyles = makeStyles((_theme) => ({
  margin: {
    margin: _theme.spacing(1),
  },
  container: {
    padding: '1em',
    width: '100%',
  },
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Fullname is required'),
  username: Yup.string()
    .required('Username is required')
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  activated: Yup.bool().oneOf([true], 'activated is required'),
});

export interface IUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const UserEditReactForm = (props: IUserDetailProps) => {
  const classes = useStyles();
  const { loading, entity } = props;

  const [isNew] = useState(!props.match.params || !props.match.params.id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValue,
  });

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }
  }, []);

  const handleSaveEntity = (data: IUser) => {
    if (isNew) props.createEntity(data);
    else props.updateEntity(data);
  };

  const handleReturn = () => {
    props.history.goBack();
    props.reset();
  };

  return (
    <Fragment>
      <form>
        <Grid container justify={'center'} spacing={1} className={classes.container}>
          <Grid item sm={4}>
            <div>
              {props.loading ? (
                <p>Loading...</p>
              ) : (
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12}>
                    <TextField label='Full Name' fullWidth defaultValue={entity.name} />
                    <Typography variant='inherit' color='textSecondary'>
                      {errors.name?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label='Email'
                      fullWidth
                      {...register('email')}
                      error={errors.email ? true : false}
                      defaultValue={entity.email}
                    />
                    <Typography variant='inherit' color='textSecondary'>
                      {errors.email?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label='Username'
                      fullWidth
                      {...register('username')}
                      error={errors.username ? true : false}
                      defaultValue={entity.username}
                    />
                    <Typography variant='inherit' color='textSecondary'>
                      {errors.username?.message}
                    </Typography>
                  </Grid>
                  {!entity.id && (
                    <Fragment>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          label='Password'
                          fullWidth
                          {...register('password')}
                          error={errors.password ? true : false}
                          defaultValue={entity.password}
                        />
                        <Typography variant='inherit' color='textSecondary'>
                          {errors.password?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          label='confirmPassword'
                          fullWidth
                          {...register('confirmPassword')}
                          error={errors.confirmPassword ? true : false}
                          defaultValue={entity.confirmPassword}
                        />
                        <Typography variant='inherit' color='textSecondary'>
                          {errors.confirmPassword?.message}
                        </Typography>
                      </Grid>
                    </Fragment>
                  )}
                  <Grid>
                    <FormControlLabel
                      control={<Checkbox color='primary' {...register('activated')} checked={entity.activated ? true : false} />}
                      label='Active'
                    />
                    <Typography variant='inherit' color='textSecondary'></Typography>
                  </Grid>
                </Grid>
              )}
            </div>
          </Grid>
          <Grid item sm={12} container justify={'center'}>
            <div>
              <Button
                color='primary'
                size='small'
                variant='outlined'
                startIcon={<ArrowBackIcon />}
                className={classes.margin}
                onClick={(e) => {
                  handleReturn();
                }}
              >
                Return
              </Button>
              <Button
                color='primary'
                size='small'
                variant='outlined'
                startIcon={<SaveIcon />}
                className={classes.margin}
                onClick={handleSubmit(handleSaveEntity)}
              >
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const mapStateToProps = ({ user }: IRootState) => ({
  entity: user.entity,
  loading: user.loading,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserEditReactForm);
