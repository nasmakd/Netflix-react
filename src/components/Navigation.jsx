import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<Navbar bg='dark' variant='dark' expand='lg' className='navTop'>
			<Container fluid>
				<Navbar.Brand>
					<Link to='/'>
						<img src='/logo.png' alt='logo' width={100} />
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbarScroll' />
				<Navbar.Collapse id='navbarScroll'>
					<Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
						<Link to='/' className='nav_item'>
							Home
						</Link>
						<Link to='/movies' className='nav_item'>
							Movies
						</Link>
					</Nav>
					<Form className='d-flex'>
						<Form.Control type='search' placeholder='Search' className='me-2' aria-label='Search' />
						<Button variant='outline-danger'>Search</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
