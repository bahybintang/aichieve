import React from 'react';
import  { CardDeck, Container }  from 'react-bootstrap';
import kartuItem from './kartuItem';

const cardDeck = ({projects}) => {
      const renderedList = projects.map(project => {
            return (
                  <kartuItem 
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