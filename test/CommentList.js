import React from 'react';
import Comment from './Comment'

export default class CommentList extends React.Component{
    constructor(){
        super()
        this.state = {
            comment: []
        }
    }

    handleDeleteComment(index){
        this.props.onDeleteComment(index)
    }
    render(){

        return (
            <div> {
                this.props.comments.map((comment, index) => (
                    <Comment index={index} onDeleteComment={this.handleDeleteComment.bind(this)} key={index} comment={comment}/>
                ))
            }
            </div>
        )
    }
}