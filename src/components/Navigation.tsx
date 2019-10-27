import * as React from "react";
import { Link } from "react-router-dom";

const logo = require("!!raw-loader!../images/logo.svg").default;

const Navigation = () => (
	<nav className="site-header sticky-top py-1">
		<div className="container d-flex flex-column flex-md-row justify-content-between">
			<a
				className="py-2 logo"
				href="#"
				dangerouslySetInnerHTML={{ __html: logo }}
			/>
			<a className="py-2 d-none d-md-inline-block" href="#">
				Tour
			</a>
			<a className="py-2 d-none d-md-inline-block" href="#">
				Product
			</a>
			<a className="py-2 d-none d-md-inline-block" href="#">
				Features
			</a>
			<a className="py-2 d-none d-md-inline-block" href="#">
				Enterprise
			</a>
			<a className="py-2 d-none d-md-inline-block" href="#">
				Support
			</a>
			<a className="py-2 d-none d-md-inline-block" href="#">
				Pricing
			</a>
			<a className="py-2 d-none d-md-inline-block" href="#">
				Cart
			</a>
		</div>
	</nav>
);

export default Navigation;
