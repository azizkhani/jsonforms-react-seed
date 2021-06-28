import { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { materialCells, materialRenderers, } from '@jsonforms/material-renderers';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { defaultValue, IUser } from "./user.model";
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, RouteComponentProps } from "react-router-dom";
import schema from "./schema.json";
import uischema from "./uischema-search.json";
import { JsonForms } from "@jsonforms/react";
import { getEntities } from './user.reducer';
import { IRootState } from '../../shared/reducer';
import { connect } from 'react-redux';

const useStyles = makeStyles((_theme) => ({
	margin: {
		margin: _theme.spacing(1),
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

const initialData: IUser[] = [defaultValue, defaultValue];

const renderers = [
	...materialRenderers,
];

export interface IUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

const UserList = (props: IUserProps) => {
	const classes = useStyles();

	useEffect(() => {
		props.getEntities();
	}, []);

	const navigateToEdit = (user: IUser) => {
		props.history.push({
			pathname: `/users/${user.id}/edit`,
			state: user
		})
	};

	return (
		<Fragment>
			<Grid
				container
				justify={'center'}
				spacing={1}
				className={classes.container}
			>
				<Grid item sm={8}>
					<JsonForms
						schema={schema}
						uischema={uischema}
						data={{}}
						renderers={renderers}
						cells={materialCells}
					/>
				</Grid>
				<Grid item sm={4}>
					<Button color="primary" size="small" variant="outlined" startIcon={<SearchIcon />}
						className={classes.margin}>Search</Button>
					<Button color="primary" size="small" variant="outlined" startIcon={<ClearIcon />}
						className={classes.margin} component={Link} to={'/users'}>Clear</Button>
				</Grid>
				<Grid item sm={12}>
					<div>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>#</TableCell>
									<TableCell>Username </TableCell>
									<TableCell>FirstName </TableCell>
									<TableCell>Email </TableCell>
									<TableCell>Actions </TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{props.userList.map((user, i) => (
									<TableRow key={`entity-${i}`}>
										<TableCell>
											{i}
										</TableCell>
										<TableCell>
											{user.username}
										</TableCell>
										<TableCell>
											{user.name}
										</TableCell>
										<TableCell>
											{user.email}
										</TableCell>
										<TableCell>
											<div>
												<Button color="primary" size="small" variant="outlined"
													startIcon={<SaveIcon />}
													className={classes.margin} onClick={(e) => navigateToEdit(user)}>Edit</Button>
												<Button color="secondary" size="small" startIcon={<DeleteIcon />}
													variant="outlined">Delete</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</Grid>
			</Grid>
		</Fragment>
	);
};


const mapStateToProps = ({ user }: IRootState) => ({
	userList: user.entities,
	loading: user.loading,
});

const mapDispatchToProps = {
	getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserList);