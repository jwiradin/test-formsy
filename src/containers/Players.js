import React from "react";
import {Nav, NavItem} from "react-bootstrap";

export const Players = (props) => (
    <Nav>
        {
            props.players.map(p => (
                <NavItem eventKey={p.number}><Link to={`/roster/${p.number}`}>{p.name}</Link></NavItem>
            ))
        }
    </Nav>
)
