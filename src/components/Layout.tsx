import React, {ReactChild, ReactChildren} from "react";

import {NavSidebar} from "./NavSidebar";
import BodyWrapper from "./BodyWrapper";

interface AuxProps {
	children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

export const DashboardLayout = ({children}: AuxProps) => {
	return (
		<BodyWrapper>
			<div className="flex h-screen bg-gray-200">
				<NavSidebar/>

				<div className="flex flex-col flex-1 overflow-hidden">
					<main className="content">
						<section className="sm:flex-row flex flex-col flex-1">
							<div
								className="content-box"
								style={{flexGrow: 2, flexBasis: "0%"}}
							>
								{children}
							</div>
						</section>
					</main>
				</div>
			</div>
		</BodyWrapper>
	);
};
