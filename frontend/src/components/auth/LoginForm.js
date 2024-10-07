import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  return (
    <>
      <Form className='my-4'>
        <Form.Group>
          <Form.Control className="mb-3" size='lg' type="text" placeholder="Username" name="username" required />
        </Form.Group>
        <Form.Group>
          <Form.Control className="mb-3" size='lg' type="password" placeholder="Password" name="password" required />
        </Form.Group>
        <Button variant='success' type="submit">Login</Button>
      </Form>
      <p>Don't have an account?
				<Link to='/register'>
					<Button variant='info' size='sm' className='ms-2'>Register</Button>
				</Link>
			</p>
    </>
  );
};

export default LoginForm;
