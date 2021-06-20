import React, {ReactChild, ReactChildren} from 'react';

interface AuxProps {
	children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

const BodyWrapper = ({children}: AuxProps) => {
	return (
		<div className="relative min-h-screen">
			<main className="w-full min-h-screen">{children}</main>
		</div>
	);
};

export default BodyWrapper;
