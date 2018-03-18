import * as React from "react";
import Info from "../components/info";
import Hero from "../components/hero";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { User as UserType } from "../../typings/api/graphql";

type OwnPropsType = {
    userName: string;
};

type VariablesType = {
    userName: string;
};

type QueryType = {
    data: {
        user: UserType;
        loading: boolean;
        error(): Error;
    };
};

type PropTypes = QueryType & OwnPropsType & VariablesType;

class Home extends React.Component<PropTypes> {
    constructor(props: PropTypes) {
        super(props);
    }
    render() {
        const user = this.props.data.user;
        if (this.props.data.loading) {
            return <p>Carregando...</p>;
        }
        return (
            <div className="container">
                <div className="field">
                    <label className="label">User login</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="ex: rodrigo-brito" />
                    </div>
                </div>
                <figure className="image is-128x128">
                    <img src={user.avatarUrl} alt={user.name || ""} />
                </figure>

                <Hero title={user.name || ""} subtitle={user.bio || ""} />
                <Info
                    commits={1321}
                    followers={user.followers.totalCount}
                    projects={user.repositories.totalCount}
                    stars={3}
                />
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
        }
    }
`;

export default graphql<QueryType, OwnPropsType, VariablesType>(query)(Home);
