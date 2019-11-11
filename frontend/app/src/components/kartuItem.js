import React from 'react';
import {Card} from 'react-bootstrap';

const kartuItem = ({project}) => { 
	return (
		<Card>
                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text>
                    {project.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Footer</small>
                </Card.Footer>
         </Card>
	);
};

export default kartuItem;