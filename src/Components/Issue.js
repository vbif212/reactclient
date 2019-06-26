import React, {Component} from "react";
import Service from "../Utils/Service";

class Issue extends Component {

    constructor(props) {
        super(props);
        this.service = new Service();
        this.state = {
            newStatus: 'ONGOING',
            newMessage: '',
            issue: {
                comments: []
            },
            exist: false
        };
    }

    componentDidMount() {
        this.getIssue();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.getIssue();
        }
    }

    getIssue = () => {
        this.setState({
            exist: false
        });
        const urlPath = "/" + this.props.match.params.id;
        this.service.getResource(urlPath, this.props.cookies.get("access_token"))
            .then((response) => {
                let comments = [];
                response.data.comments.forEach(comment => {
                    comments.push(this.formatComment(comment));
                });
                response.data.comments = comments;
                this.setState({
                    issue: response.data
                });
                this.setState({
                    exist: true
                });
            })
            .catch((error) => {
                console.log(error);
            })
    };

    handleAddComment = event => {
        const urlPath = "/" + this.props.match.params.id + "/comments";
        this.service.postResource(
            urlPath,
            this.props.cookies.get("access_token"),
            {
                status: this.state.newStatus,
                message: this.state.newMessage
            })
            .then(response => {
                this.state.issue.comments.push(this.formatComment(response.data));
                let newIssue = {
                    ...this.state.issue,
                    status: response.data.status
                };
                this.setState({
                    issue: newIssue
                });
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

    formatComment(responseComment) {
        return (
            <li className="list-group-item" key={responseComment.id}>
                <small>{new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                }).format(responseComment.timestamp)}</small>
                <br/>
                <small>Status changed to {responseComment.status}</small>
                <p className="lead">{responseComment.message}</p>
            </li>
        );
    }

    handleDeleteIssue = event => {
        const urlPath = "/" + this.props.match.params.id;
        this.service.deleteResource(urlPath, this.props.cookies.get("access_token"))
            .then(response => {
                this.props.history.push('/issues');
            })
            .catch(error => {
                console.log(error);
            });
    };

    validateForm = () => {
        return this.state.newMessage.length > 0;
    };

    handleClearForm = event => {
        this.setState({
                newStatus: "ONGOING",
                newMessage: ""
            }
        );
    };

    textAreaStyle = {
        resize: 'none'
    };

    render() {
        if (this.state.exist) {
            return (
                <div className='container'>
                    <button className="btn btn-danger" onClick={this.handleDeleteIssue}>DELETE</button>
                    <h2>{this.state.issue.name}</h2>
                    <p><b>Status:</b> {this.state.issue.status}</p>
                    <p><b>Start date:</b> {
                        new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric'
                        }).format(this.state.issue.timestamp)
                    }</p>
                    <p className="lead">{this.state.issue.description}</p>
                    <h4>Comments: {this.state.issue.comments.length}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            this.state.issue.comments
                        }
                    </ul>
                    <br/>
                    <form onSubmit={this.handleAddComment}>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-row">
                                    <select className="form-control" id="newStatus" required
                                            onChange={this.handleChange}
                                            value={this.state.newStatus}>
                                        <option value="ONGOING">Ongoing</option>
                                        <option value="READY">Ready</option>
                                    </select>
                                </div>
                                <div className="form-row mt-2">
                                    <div className="col-6">
                                        <input type="submit" value="Add" className="form-control btn btn-success"
                                               disabled={!this.validateForm()}/>
                                    </div>
                                    <div className="col-6">
                                        <input type="button" value="Clear" className="form-control btn btn-warning"
                                               onClick={this.handleClearForm} disabled={!this.validateForm()}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                            <textarea className="form-control h-100" id='newMessage' placeholder="Message"
                                      style={this.textAreaStyle}
                                      required onChange={this.handleChange}
                                      value={this.state.newMessage}>
                            </textarea>
                            </div>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className='container'>
                    <h1>Issue NOT FOUND!</h1>
                </div>
            );
        }
    }
}

export default Issue;
