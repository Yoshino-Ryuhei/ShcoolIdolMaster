import React, { FC, memo, useEffect, useState } from "react";
import { Card } from "../../class/PrimaryCards/Card.ts";

type Props = {
    card: Card
    onClick: () => void
}

export const PrimaryCard:FC<Props> = memo((props) => {
    const {card, onClick} = props
    return(
        <div className={"card"} onClick={onClick}>
            <div>plan:{card.plan}</div>
            <div>type:{card.type}</div>
            <div>name:{card.name}</div>
            <div>cost:{card.cost}</div>
            <div>parameter:{card.parameter}</div>
        </div>
    )
})