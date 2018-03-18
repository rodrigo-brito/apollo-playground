import * as React from "react";
import { User } from "api/graphql";

export type InfoType = {
    user: User;
};

class Info extends React.Component<InfoType> {
    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <article className="media">
                        <p className="media-left image is-128x128">
                            <img src={this.props.user.avatarUrl} />
                        </p>
                        <div className="media-content">
                            <div className="content">
                                <h1 className="title">{this.props.user.name}</h1>
                                <p>{this.props.user.bio}</p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}

export default Info;
