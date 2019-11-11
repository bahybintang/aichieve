import React from 'react';
import {Card} from 'react-bootstrap';

const KartuItem = ({project}) => { 
	return (
		<Card>
                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text>
                    {project.description}
                  </Card.Text>
                </Card.Body>
         </Card>
	);
};

export default KartuItem;