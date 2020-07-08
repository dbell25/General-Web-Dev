/**
 * @fileoverview Displays default home screen.
 * @author Daniel Bell
 */
import React, { Component } from 'react';
import Sidebar from './Sidebar';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Sidebar />
            </div>
        );
    }
}