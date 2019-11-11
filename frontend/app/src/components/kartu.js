import React from 'react';
import  { CardDeck, Container }  from 'react-bootstrap';
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
            <CardDeck>
              {renderedList}
            </CardDeck>
            </Container>
        );
      }


export default cardDeck;