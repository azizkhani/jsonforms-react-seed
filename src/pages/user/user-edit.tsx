import { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { materialCells, materialRenderers, } from '@jsonforms/material-renderers';
import { makeStyles } from '@material-ui/core/styles';
import { defaultValue, IUser } from "./user.model";
import { JsonForms } from "@jsonforms/react";
import schema from "./schema.json";
import uischema from "./uischema.json";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Link, RouteComponentProps, useLocation } from "react-router-dom";

const useStyles = makeStyles((_theme) => ({
	margin: {
		margin: _theme.spacing(1),
	},
	container: {
		padding: '1em',
		width: '100%',
	}
}));

const initialData: IUser = defaultValue;

const renderers = [
	...materialRenderers,
];


export interface IUserDetailProps extends RouteComponentProps<{ id: string }> {
}

const UserEdit = (props: IUserDetailProps) => {
	const classes = useStyles();
	const location = useLocation<IUser>();

	const [isNew] = useState(!props.match.params || !props.match.params.id);
	const [user, setUser] = useState<IUser>(location.state);

	useEffect(() => {

	}, []);


	return (
		<Fragment>
			<Grid
				container
				justify={'center'}
				spacing={1}
				className={classes.container}
			>
				<Grid item sm={4}>
					<div>
						<JsonForms
							schema={schema}
							uischema={uischema}
							data={user}
							renderers={renderers}
							cells={materialCells}
						/>
					</div>
				</Grid>
				<Grid item sm={12} container justify={'center'}>
					<div>
						<Button color="primary" size="small" variant="outlined" startIcon={<SaveIcon />}
							className={classes.margin}>Save</Button>
						<Button color="primary" size="small" variant="outlined" startIcon={<SaveIcon />}
							className={classes.margin} component={Link} to={'/users'}>Return</Button>
					</div>
				</Grid>
			</Grid>
		</Fragment>
	);
};

export default UserEdit;
