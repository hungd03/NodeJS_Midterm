import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const About = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Body>
              <h1 className="text-center mb-4">About Us</h1>
              <p className="lead">
                Welcome to our platform! We are committed to providing the best
                service to help you grow and learn new skills.
              </p>
              <p>
                Our platform is designed with the user in mind, offering a
                seamless experience for all your needs. From tutorials to tools,
                we aim to make learning easier and more accessible.
              </p>
              <p>
                Our team is made up of passionate individuals who are dedicated
                to providing top-quality content and services. We believe in
                empowering people through education and innovation.
              </p>
              <div className="text-center mt-4">
                <Button variant="primary" href="#">
                  Contact Us
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
