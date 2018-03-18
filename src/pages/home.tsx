import * as React from "react";
import Info from "../components/info";

import { graphql, QueryOpts } from "react-apollo";
import gql from "graphql-tag";

import { User as UserType, RepositoryConnection } from "../../typings/api/graphql";
import Hero from "../components/hero";
import RepositoryList from "../components/repositoryList";
import Footer from "../components/footer";

type OwnPropsType = {
    userName: string;
};

type VariablesType = {
    userName: string;
};

interface Result extends UserType {
    projects: RepositoryConnection;
}

type QueryType = {
    data: {
        user: Result;
        projects: UserType;
        loading: boolean;
        error: string;
        refetch: (vars: VariablesType) => void;
    };
};

type StateType = {
    userName: string;
};

type PropTypes = QueryType & OwnPropsType & VariablesType;

class Home extends React.Component<PropTypes, StateType> {
    private debounceTimer: NodeJS.Timer;

    constructor(props: PropTypes) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.refetch = this.refetch.bind(this);
        this.updateUserName = this.updateUserName.bind(this);
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const defaultTimeout = 350;
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(this.updateUserName, defaultTimeout, e.target.value);
    }

    updateUserName(userName: string) {
        this.setState({ userName }, this.refetch);
    }

    refetch() {
        this.props.data.refetch({
            userName: this.state.userName
        });
    }

    render() {
        const user = this.props.data.user;
        let content = null;

        if (this.props.data.loading) {
            content = <p>Loading...</p>;
        } else if (this.props.data.error) {
            content = <p>Error: {this.props.data.error}</p>;
        } else if (user) {
            content = (
                <div className="content">
                    <Info user={user} />
                    <RepositoryList projects={this.props.data.user.projects} />
                </div>
            );
        } else {
            content = <p>User not found</p>;
        }

        return (
            <div className="container">
                <Hero
                    title="Playground: GraphQL + Apollo + Typescript"
                    subtitle="A simple example of integration with GithHub API."
                />
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="ex: rodrigo-brito"
                            onChange={this.onChange}
                        />
                    </div>
                </div>
                {content}
                <Footer />
            </div>
        );
    }
}

const query = gql`
    query User($userName: String!) {
        user(login: $userName) {
            id
            name
            bio
            avatarUrl
            repositories {
                totalCount
            }
            followers {
                totalCount
            }
            ...RepositoriesFragment
        }
    }
    ${RepositoryList.fragment}
`;

export default graphql<QueryType, OwnPropsType, VariablesType>(query, {
    options: {
        errorPolicy: "ignore"
    } as QueryOpts
})(Home);
