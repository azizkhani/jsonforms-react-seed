import {Fragment, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {materialCells, materialRenderers} from '@jsonforms/material-renderers';
import {makeStyles} from '@material-ui/core/styles';
import {defaultValue, IUser} from '../../shared/model/user.model';
import {JsonForms} from '@jsonforms/react';
import schema from './schema.json';
import uischema from './uischema.json';
import {Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {RouteComponentProps, useLocation} from 'react-router-dom';
import {IRootState} from '../../shared/reducer';
import {connect} from 'react-redux';
import {getEntity, updateEntity, reset, createEntity} from '../../state/user.reducer';

const useStyles = makeStyles((_theme) => ({
	margin: {
		margin: _theme.spacing(1),
	},
	container: {
		padding: '1em',
		width: '100%',
	},
}));

const initialData: IUser = defaultValue;

const renderers = [...materialRenderers];

export interface IUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

const UserEdit = (props: IUserDetailProps) => {
	const classes = useStyles();
	const location = useLocation<IUser>();

	const [isNew] = useState(!props.match.params || !props.match.params.id);
	const [user, setUser] = useState<IUser>(location.state);
	const [entity, setEntity] = useState<IUser>(props.entity);

	useEffect(() => {
		if (!isNew) props.getEntity(props.match.params.id);
	}, []);

	const handleSaveEntity = () => {
		if (isNew) props.createEntity(entity);
		else props.updateEntity(entity);
	};

	const handleReturn = () => {
		props.reset();
		props.history.push({
			pathname: `/users`,
		});
	};

	return (
		<Fragment>
			<Grid container justify={'center'} spacing={1} className={classes.container}>
				<Grid item sm={4}>
					<div>
						{props.loading ? (
							<p>Loading...</p>
						) : (
							<JsonForms
								schema={schema}
								uischema={uischema}
								data={props.entity}
								renderers={renderers}
								cells={materialCells}
								onChange={({data, errors}) => setEntity(data)}
							/>
						)}
					</div>
				</Grid>
				<Grid item sm={12} container justify={'center'}>
					<div>
						<Button
							color='primary'
							size='small'
							variant='outlined'
							startIcon={<ArrowBackIcon/>}
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
							startIcon={<SaveIcon/>}
							className={classes.margin}
							onClick={(e) => {
								handleSaveEntity();
							}}
						>
							Save
						</Button>
					</div>
				</Grid>
			</Grid>
		</Fragment>
	);
};

const mapStateToProps = ({user}: IRootState) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
