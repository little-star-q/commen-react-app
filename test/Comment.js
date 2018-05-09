import React from 'react';

export default class Comment extends React.Component{
    constructor(){
        super()
        this.state = {
            timeString: ''
        }
    }
    componentWillMount(){
        this._loadTime()
        this._timer = setInterval(this._loadTime.bind(this),5000)
    }
    _loadTime(){
        let duration = (+Date.now() - this.props.comment.createdTime)/1000
        this.setState({
            timeString : duration > 60 ? Math.round(duration/60)+'分钟前' : Math.round(Math.max(duration,1)) + '秒前'
        })
    }

    componentWillUnmount(){
        clearInterval(this._timer)
    }

    handleDeleteComment(){
        this.props.onDeleteComment(this.props.index)
    }
    render(){
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.username}</span> :
                </div>
                <p>{this.props.comment.content}</p>
                <span className='comment-createdtime'>{this.state.timeString}</span>
                <span onClick={this.handleDeleteComment.bind(this)} className='comment-delete'>删除</span>
            </div>
        )
    }
}