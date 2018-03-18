import * as React from "react";

export type InfoType = {
    stars: number;
    projects: number;
    commits: number;
    followers: number;
};

class Info extends React.Component<InfoType> {
    render() {
        return (
            <nav className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Stars</p>
                        <p className="title">{this.props.stars}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Projects</p>
                        <p className="title">{this.props.projects}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Followers</p>
                        <p className="title">{this.props.followers}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Commits</p>
                        <p className="title">{this.props.commits}</p>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Info;
