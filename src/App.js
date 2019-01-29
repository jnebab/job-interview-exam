import React, { Component } from 'react';
import './main.css'

class App extends Component {
	state = {
		users: [],
		fullName: '',
		email: '',
		phone: '',
		website: ''
 	};

	handleClick = e => {
		const { dataset } = e.currentTarget;
		let userId = dataset.id === 0 || dataset.id ? dataset.id : null;
	
		this.state.users.filter(user => user.id == userId)
			.map(user => this.setState({
				fullName: user.name,
				email: user.email,
				phone: user.phone,
				website: user.website
			}));
		document.getElementById('dialog').showModal();
	};

	handleCloseDialog = () => {
		document.getElementById('dialog').close();
	}

	componentDidMount() {
		const uri = 'https://jsonplaceholder.typicode.com/users';
		const head = new Headers();
		const req = new Request(uri, {
			method: 'GET',
			headers: head,
			mode: 'cors'
		});

		fetch(req)
			.then(response => response.json())
			.then(resolvedValue => this.setState({ users: resolvedValue }))
	};

	render() {
		const { fullName, email, phone, website } = this.state;
		return (
			<div>
				<ul>
					{this.state.users.map(user => 
						<li 
							className="user" 
							key={user.id}
							data-id={user.id}
							onClick={this.handleClick}
						>
							{user.name} <span className="triangle"></span>
						</li>
					)}
				</ul>
				<dialog id="dialog">
					<p 
						className="close-button"
						onClick={this.handleCloseDialog}
					>x</p>
					<h1>{fullName}</h1>
					<p>{email}</p>
					<label>Phone</label>
					<p>{phone}</p>
					<label>Website</label>
					<p>{website}</p>
				</dialog>
			</div>
		)
	}
}

export default App;
