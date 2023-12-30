import React from 'react';

class LeftNav extends React.Component
{
	render()
	{
		return (
			<ul className="nav flex-column">
				<li className="nav-item">
					<a className="nav-link" href="#">Link1</a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="#">Link2</a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="#">Link3</a>
				</li>
			</ul>
		);
	}
}

export default LeftNav;
