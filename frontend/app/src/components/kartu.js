import React from 'react';
import  { CardColumns, Container }  from 'react-bootstrap';
import KartuItem from './kartuItem';

const cardDeck = ({projects}) => {
      const renderedList = projects.map(project => {
            return (
                  <KartuItem 
                  key = {project._id}
                  project = {project}
                  />
            );
      });

      return (
            <Container>
            <CardColumns>
              {renderedList}
            </CardColumns>
            </Container>
        );
      }


export default cardDeck;