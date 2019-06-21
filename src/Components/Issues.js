import React, {Component} from "react";

class Issues extends Component {
    handleLogout = () => {
        this.props.cookies.remove("access_token");
        this.props.history.push('/login');
    };

    render() {
        return (
            <div className="container">
                <h2>Add new issue</h2>
                <form>
                    <div className="row">
                        <div className="col-4">
                            <div className="form-row">
                                <input className="form-control" placeholder="Name" name="name" required/>
                            </div>
                            <div className="form-row">
                                <div className="col-6 mt-2">
                                    <input type=" submit" value=" Add" className="form-control btn btn-success"/>
                                </div>
                                <div className=" col-6 mt-2">
                                    <input type=" button" value="Clear" className="form-control btn btn-warning"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <textarea className="form-control h-100" placeholder="Description"
                                      required>
                        </textarea>
                        </div>
                    </div>
                </form>
                <button onClick={this.handleLogout}>Log out</button>
            </div>
        );
    }
}

export default Issues;
