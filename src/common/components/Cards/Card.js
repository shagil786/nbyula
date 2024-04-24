import React from "react";
import styles from "./Card.module.css";

const Card = (props) => {
  const { container } = styles;

  return (
    <div
      className={container}
      style={{
        backgroundColor:
          props?.deadLine > 21
            ? "green"
            : props?.deadLine > 14
            ? "yellow"
            : "red",
      }}
    >
      <div>title: {props?.title}</div>
      <div>description: {props?.description}</div>
      <div>location: {props?.location}</div>
      <div>email: {props?.email}</div>
      <div>deadline: {props?.deadLine}</div>
    </div>
  );
};

export default Card;
