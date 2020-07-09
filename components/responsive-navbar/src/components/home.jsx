/**
 * @fileoverview Displays default home screen.
 * @author Daniel Bell
 */
import React, { Component } from 'react';
import Navbar from './navbar';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
            </div>
        );
    }
}