import React from "react";

export default class MetricsChartComponent extends React.Component {
    componentDidMount(){
        this.props.draw();
    }
    
    render(){
        this.props.draw();

        return (
            <div id={this.props.id}>

            </div>
        );
    }
}
