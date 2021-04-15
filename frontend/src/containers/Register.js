import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/auth';

const register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: ' '
    });

    const { username, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password == re_password) {

        }
    };

    return (
        <div>
            Register
        </div>
    );

};

export default connect(null, )(register);