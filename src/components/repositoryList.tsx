import React from "react";
import gql from "graphql-tag";
import { RepositoryConnection, RepositoryEdge } from "api/graphql";

type PropsType = {
    projects: RepositoryConnection;
};

class RepositoryList extends React.Component<PropsType> {
    static fragment = gql`
        fragment RepositoriesFragment on User {
            projects: repositories(first: 10, orderBy: { field: STARGAZERS, direction: DESC }) {
                totalCount
                edges {
                    node {
                        name
                        description
                        stargazers {
                            totalCount
                        }
                    }
                }
            }
        }
    `;

    constructor(props: PropsType) {
        super(props);
        this.getStars = this.getStars.bind(this);
    }

    getStars(project: RepositoryEdge) {
        if (!project.node) {
            return null;
        }

        const stars = project.node!.stargazers.totalCount;
        let result = [];

        for (let i = 0; i < stars; i++) {
            result.push(
                <span key={i} className="icon">
                    <i className="fa fa-star" />
                </span>
            );
        }
        return result;
    }

    render() {
        if (!this.props.projects.edges) {
            return <p>Repository not found</p>;
        }

        const lines = this.props.projects.edges.map((repo: any, index: number) => (
            <tr key={index}>
                <td>{repo.node.name}</td>
                <td>{this.getStars(repo)}</td>
            </tr>
        ));

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Stars</th>
                        </tr>
                    </thead>
                    <tbody>{lines}</tbody>
                </table>
                {/* TODO: Load more items */}
                <button className="button is-primary">Load more</button>
            </div>
        );
    }
}

export default RepositoryList;
