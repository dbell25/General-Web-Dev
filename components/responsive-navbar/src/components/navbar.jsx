/**
 * @fileoverview Displays a responsive hamburger menu navbar.
 * @author Daniel Bell
 */
import React, { Component } from 'react';
import '../_common/assets/css/navbar.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            className: 'navbar-body'
        }
    }
    /**
     * Checks to see if the user clicked outside the menu to dismiss.
     */
    componentDidMount = () => {
        const self = this;
        window.addEventListener('click', function (e) {
            let clickId = e.target.id;
            let inside = clickId.includes('resNav');
            let buttonClicked = (clickId.includes('resNavItem') || clickId.includes('resNav-header')) ? true : false;
            if ((!inside || buttonClicked) && self.state.className === "navbar-body responsive") self.switchNavMode();
        });
    }
    /**
     * Toggles the navbar between normal and responsive modes
     */
    switchNavMode = () => {
        let name = "navbar-body";
        if (this.state.className === "navbar-body") name += " responsive";
        this.setState({ className: name });
    }

    render() {
        return (
            <div id="resNav" className={this.state.className}>
                <button id="resNav-header" className="navbar-header" >Home</button>
                <button id="resNavItem1" className="navbar-item">Option #1</button>
                <button id="resNavItem2" className="navbar-item">Option #2</button>
                <button id="resNavItem3" className="navbar-item">Option #3</button>
                <button id="resNavItem4" className="navbar-item">Option #4</button>
                <button id="resNavItem5" className="navbar-item">Option #5</button>
                <button id="resNavToggle" className="navbar-menu-icon" onClick={() => this.switchNavMode()}>&#9776;</button>
            </div>
        );
    }
}