import React from "react";
import axios from "axios";

export default class Login extends React.Component {
  state = { username: "", password: "", sender: "login" };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  setSender = ({ target: { name } }) => {
    this.setState({ sender: name });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { sender, ...body } = this.state;
    axios
      .get(
        `http://localhost:5000/api/${sender}?username=${this.state.username}&password=${this.state.password}`,
        //body,
        {
          withCredentials: true,
        }
      )
      .then(console.log);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='username'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button name='login' type='submit' /*onClick={this.setSender}*/>
          Log In
        </button>
        {/*<button name='register' type='submit' onClick={this.setSender}>
          Register
    </button>*/}
      </form>
    );
  }
}
