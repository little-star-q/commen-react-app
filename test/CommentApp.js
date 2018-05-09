import React from 'react';
import CommentInput from './CommentInput'
import CommentList from './CommentList'

export default class CommentApp extends React.Component{
    constructor(){
        super()
        this.state = {
            comments: []
        }
    }
    handleSubmit(comment){
        if(!comment) return
        if(!comment.username){
            return alert('请输入用户名')
        }
        if(!comment.content){
            return alert('请输入评论内容')
        }
        this.state.comments.push(comment)
        this.setState({comments: this.state.comments})
        this._setComment(this.state.comments)
    }
    _setComment(comments){
        localStorage.setItem('COMMENTS', JSON.stringify(comments))
    }
    componentWillMount(){
        this._loadContent()
    }
    _loadContent(){
        let comments = localStorage.getItem('COMMENTS')
        if(comments){
            comments = JSON.parse(comments)
            this.setState({comments})
        }
    }

    handleDeleteComment(index){
        let comments = this.state.comments
        comments.splice(index,1)
        this.setState({comments})
        this._setComment(comments)
    }

    render(){
        return (
            <div className='wrapper'>
                <CommentInput onClick={this.handleSubmit.bind(this)}/>
                <CommentList onDeleteComment={this.handleDeleteComment.bind(this)} comments={this.state.comments}/>
            </div>
        )
    }
}