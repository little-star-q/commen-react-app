import React from 'react';
import Comment from "./Comment";

export default class CommentList extends React.Component{

    static defaultProps = {
        comments: []
    }

    handleDeleteComment(index){
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(index)
        }
    }
    render(){
        return (
            <div>
                {
                    this.props.comments.map((comment, index) => (
                        <Comment onDeleteComment={this.handleDeleteComment.bind(this)} key={index} index={index} comment={comment}/>
                    ))
                }
            </div>
        )
    }
}