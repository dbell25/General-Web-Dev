/**
 * @fileoverview Displays the navigation sidebar panel.
 * @author Daniel Bell
 */
import React, { Component } from 'react';
import '../_common/assets/css/sidebar.css';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: true
        }
    }
    /**
     * Checks to see if the user clicked outside the menu to dismiss.
     */
    componentDidMount = () => {
        const self = this;
        window.addEventListener('click', function (e) {
            let clickId = e.target.id;
            let inside = clickId.includes('sidebar');
            if(!inside && self.state.collapsed !== true) self.toggleSidebar();
        });
    }
    /**
     * Open and closes the sidebar component.
     */
    toggleSidebar = () => {
        if (this.state.collapsed) {
            document.getElementById("sidebar-toggle").style.marginLeft = '200px';
            document.getElementById("sidebar-body").style.width = '200px';
            document.getElementById("sidebar-body").style.color = 'white';
        }
        else {
            document.getElementById("sidebar-toggle").style.marginLeft = '0px';
            document.getElementById("sidebar-body").style.width = '0px';
            document.getElementById("sidebar-body").style.color = 'transparent';

        }
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        return (
            <div className="sidebar">
                <div id="sidebar-toggle" onClick={() => this.toggleSidebar()}>
                    <div id="sidebar-toggle-text">Menu</div>
                </div>
                <div id="sidebar-body">
                    <ul hidden={this.state.collapsed} className="sidebar-menu">
                        <li className="sidebar-menu-header">Options</li>
                        <li className="sidebar-menu-item">Option #1</li>
                        <li className="sidebar-menu-item">Option #2</li>
                        <li className="sidebar-menu-item">Option #3</li>
                        <li className="sidebar-menu-item">Option #4</li>
                        <li className="sidebar-menu-item">Option #5</li>
                    </ul>
                </div>
            </div>
        );
    }    
}

