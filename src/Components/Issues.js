import React, {Component} from "react";
import Service from "../Service";
import {NavLink} from "react-router-dom";


//TODO: список обновляется только при каком-то дйествии после отправки
class Issues extends Component {

    constructor(props) {
        super(props);
        this.service = new Service();
        this.state = {
            newIssueName: "",
            newIssueDescription: "",
            issues: []
        }
    }

    componentDidMount() {
        this.service.getResource("http://localhost:8085/spring-security-oauth-resource/issues", this.props.cookies.get("access_token"))
            .then((response) => {
                let issues = [];
                response.data.forEach(issue => {
                    issues.push(this.formatIssue(issue));
                });
                this.setState({
                    issues: issues
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    validateForm() {
        return this.state.newIssueName.length > 0 && this.state.newIssueDescription.length > 0;
    }

    formatIssue(responseIssue) {
        return (
            <div>
                <NavLink  className="list-group-item list-group-item-action btn-outline-dark" to="/">
                    <div className="row">
                        <div className="col-6">
                            {
                                responseIssue.name
                            }
                        </div>
                        <div className="col-3">
                            {
                                responseIssue.status
                            }
                        </div>
                        <div className="col-3">
                            {
                                responseIssue.timestamp
                            }
                        </div>
                    </div>
                </NavLink>
            </div>
        );
    }

    handleLogoutClick = event => {
        this.props.cookies.remove("access_token");
        this.props.history.push('/login');
    };

    handleAddIssue = event => {
        this.service.postResource(
            "http://localhost:8085/spring-security-oauth-resource/issues",
            this.props.cookies.get("access_token"),
            {
                name: this.state.newIssueName,
                description: this.state.newIssueDescription
            })
            .then(response => {
                this.state.issues.push(this.formatIssue(response.data));
            })
            .catch(error => {
                console.log(error);
            });
        event.preventDefault();
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleClearForm = event => {
        this.setState({
                newIssueName: "",
                newIssueDescription: ""
            }
        );
    };

    textAreaStyle = {
        resize: 'none'
    };

    render() {
        return (
            <div className="container">
                <button className="btn btn-danger" onClick={this.handleLogoutClick}>Log out</button>
                <h2>Add new issue</h2>
                <form onSubmit={this.handleAddIssue}>
                    <div className="row">
                        <div className="col-4">
                            <div className="form-row">
                                <input
                                    id="newIssueName"
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.newIssueName}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <div className="col-6 mt-2">
                                    <input
                                        type="submit"
                                        value="Add"
                                        className="form-control btn btn-success"
                                        disabled={!this.validateForm()}
                                        onClick={this.handleAddIssue}
                                    />
                                </div>
                                <div className=" col-6 mt-2">
                                    <input
                                        type="button"
                                        value="Clear"
                                        className="form-control btn btn-warning"
                                        disabled={!this.validateForm()}
                                        onClick={this.handleClearForm}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <textarea
                                id="newIssueDescription"
                                className="form-control h-100"
                                placeholder="Description"
                                style={this.textAreaStyle}
                                value={this.state.newIssueDescription}
                                onChange={this.handleChange}
                            >
                            </textarea>
                        </div>
                    </div>
                </form>
                <h2>Issues: {this.state.issues.length}</h2>
                {
                    this.state.issues.length === 0
                        ?
                        <p>Add first issue!</p>
                        :
                        <div className="list-group">
                            {
                                this.state.issues
                            }
                        </div>
                }
            </div>
        );
    }
}

export default Issues;
