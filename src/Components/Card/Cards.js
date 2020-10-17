import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import './Card.css'
const Cards = props => {
    const {task, colors, handleColorIndex, handleSelectedTask} = props;

  return (
    <Link to="/register">
      <Card onClick={() => handleSelectedTask(task)} className="custom_card">
        <Card.Img className="card_img" variant="top" src={task.img_link} />
        <Card.Body style={{ backgroundColor: colors[handleColorIndex()],minHeight:"6rem", color:'white'}}>
          <Card.Title>{task.title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Cards;
