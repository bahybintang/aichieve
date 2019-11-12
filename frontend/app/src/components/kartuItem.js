import React from 'react';
import {Card,Button} from 'react-bootstrap';

const KartuItem = ({project}) => { 
  var butAccept= {
    position: "absolute",
    right: "10%",
    bottom: "5px"
  };

  var kartu1 = {
    marginBottom: "60px", 
    border: "none",
    boxShadow: "0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.09), 0px 8px 20px 7px rgba(0, 0, 0, 0.02)"
  };

  const renderedList2 = project.skills_required.map(skill => {
            return (
                  <ol >
                    <li style={{listStyleType: "circle"}}>
                      {skill}
                    </li>
                  </ol>
            );
    });


  	return (
		<Card style={kartu1}>
                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text>
                    {project.description}
                  </Card.Text>
                  <hr />
                  <h5> Skills Required : </h5>
                  {renderedList2}
                </Card.Body>
                  <Button variant="primary" style={butAccept}>Offer</Button>
                <Card.Footer>
                <small className="text-muted">oleh : {project.userID}</small>
                </Card.Footer>
         </Card>
	);
};

export default KartuItem;