import classes from "./Card.module.scss";
import type React from "react";

const Card: React.FC<{ children: React.ReactNode; className: string }> = (
  props
) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
