import React from 'react';
import CommentInput from '../components/CommentInput'
import PropTypes from 'prop-types'
import { addComment } from '../reducers/comments'
import { connect } from 'react-redux'

class CommentInputContainer extends React.Component{
    static propTypes = {
        comments: PropTypes.array,
        onSubmit: PropTypes.func
    }
    constructor(){
        super()
        this.state = {
            username: ''
        }
    }

    _saveUsername(username){
        localStorage.setItem('username',username)
    }

    handleSubmitComment(comment){
        if(!comment) return
        if(!comment.username) {
            return alert('请输入用户名')
        }
        if(!comment.content) {
            return alert('请输入评论内容')
        }
        const { comments } = this.props
        const newComments = [...comments, comment]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if(this.props.onSubmit){
            this.props.onSubmit(comment)
        }
    }

    componentWillMount(){
        this._loadUsername()
    }

    _loadUsername(){
        const username = localStorage.getItem('username')
        if(username){
            this.setState({ username })
        }
    }
    render(){
        return (
            <CommentInput username={this.state.username}
                          onUserNameInputBlur={this._saveUsername.bind(this)}
                          onSubmit={this.handleSubmitComment.bind(this)}
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
        onSubmit: (comment) => {
            dispatch(addComment(comment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer)