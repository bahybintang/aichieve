import React, { Component } from 'react';
import Navbar from './nav';

class Header extends Component {
    shouldComponentUpdate = () => {
        return false
    }

    render() {
        return (
            <div>
                <div className="jumbotron" style={{ padding: "30px 20px 30px 20px", marginBottom: "0px" }}>
                    <table>
                        <tbody>
                            <tr>
                                    <td>
                                    <h2>AICHIEVE</h2>
                                    <p>Get your idea!</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                <Navbar />
            </div>
        );
    }
}

export default Header;