import {Fragment, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {materialRenderers,} from '@jsonforms/material-renderers';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {defaultValue, IUser} from "./user.model";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom";

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

const UserList = () => {
	const classes = useStyles();
	const [users, setUsers] = useState<IUser[]>(initialData);

	useEffect(() => {
		let user1: IUser = {
			id: '1',
			login: 'admin',
			firstName: 'ali akbar',
			lastName: 'azizkhani',
			email: '',
			activated: true,
			langKey: '',
			authorities: [],
			createdBy: '',
			createdDate: null,
			lastModifiedBy: '',
			lastModifiedDate: null,
			password: '',
		};
		let user2: IUser = {
			id: '2',
			login: 'admin2',
			firstName: 'mohsen',
			lastName: 'salehi',
			email: '',
			activated: true,
			langKey: '',
			authorities: [],
			createdBy: '',
			createdDate: null,
			lastModifiedBy: '',
			lastModifiedDate: null,
			password: '',
		};
		setUsers([user1, user2]);
	}, []);


	return (
		<Fragment>
			<Grid
				container
				justify={'center'}
				spacing={1}
				className={classes.container}
			>
				<Grid item sm={12}>
					<div>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>#</TableCell>
									<TableCell>Username </TableCell>
									<TableCell>FirstName </TableCell>
									<TableCell>LastName </TableCell>
									<TableCell>Actions </TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users.map((user, i) => (
									<TableRow key={`entity-${i}`}>
										<TableCell>
											{i}
										</TableCell>
										<TableCell>
											{user.login}
										</TableCell>
										<TableCell>
											{user.firstName}
										</TableCell>
										<TableCell>
											{user.lastName}
										</TableCell>
										<TableCell>
											<div>
												<Button color="primary" size="small" variant="outlined"
																startIcon={<SaveIcon/>} component={Link} to={'/users/edit'}
																className={classes.margin}>Edit</Button>
												<Button color="secondary" size="small" startIcon={<DeleteIcon/>}
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

export default UserList;
