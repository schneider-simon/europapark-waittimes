import React from 'react';
import Api from './../services/Api';

export default class CommentBox extends React.Component{
    constructor(){
        super();
        this.api = new Api();
    }

    componentDidMount(){
        this.api.waitingTimes((result) => {
            alert('Result');
            console.log(result);
        });
    }

    render() {
        return (
            <div className="commentBox">
                vv2
            </div>
        );
    }
}