import React from 'react';
import './style.scss'
import loginImg from '../../Assets/Login Pic.jpg';

export class Signup extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Signup</div>
            <br/>
            <div className="content">
                <div className="image">
                    <img src={loginImg} alt="login"/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" placeholder="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password"/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">Signup</button>
            </div>
        </div>
    }
}

// export default Signup;