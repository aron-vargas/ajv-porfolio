import React from 'react';
import logo from 'logo.svg';
import 'include/style/App.css';
import NavBar from 'include/components/Navbar';
import LeftNav from 'include/components/NavLeft';
import MainContent from 'include/components/MainContent';
import Footer from 'include/components/Footer';

// App Class
// Main class for the webpage content
class App extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			page: "home",
			user: "guest",
			status: 0
		};
	}

	render()
	{
		return (
			<div className="App">
				<NavBar/>
				<LeftNav/>
				<MainContent/>
				<Footer/>
			</div>
		);
	}
}

export default App;