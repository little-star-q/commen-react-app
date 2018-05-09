import React from 'react';
import CommentList from '../components/CommentList'
import {initComments, deleteComment} from "../reducers/comments";
import { connect } from 'react-redux'

class CommentListContainer extends React.Component{

    handleDeleteComment(index){
        const { comments } = this.props
        const newComments = [
            ...comments.slice(0, index),
            ...comments.slice(index+1)
        ]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(index)
        }
    }

    componentWillMount(){
        this._loadComments()
    }

    _loadComments(){
        let comments = localStorage.getItem('comments')
        comments = comments ? JSON.parse(comments) : []
        this.props.initComments(comments)
    }

    render(){
        return (
            <CommentList comments={this.props.comments}
                         onDeleteComment={this.handleDeleteComment.bind(this)}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initComments: (comments) => {
            dispatch(initComments(comments))
        },
        onDeleteComment: (index) => {
            dispatch(deleteComment(index))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentListContainer)