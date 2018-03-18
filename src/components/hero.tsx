import * as React from "react";

type PropsType = {
    title: string;
    subtitle?: string;
    center?: boolean;
};

export default (props: PropsType) => (
    <section className="hero">
        <div className="hero-body">
            <div className="container">
                <h1 className="title">{props.title}</h1>
                {props.subtitle && <h2 className="subtitle">{props.subtitle}</h2>}
            </div>
        </div>
    </section>
);
