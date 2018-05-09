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
        const createdTime = this.props.comment.createdTime
        let duration = (+Date.now() - createdTime)/1000
        this.setState({
            timeString : duration > 60 ? `${Math.round(duration/60)}分钟前` : `${Math.round(Math.max(duration,1))}秒钟前`
        })
    }

    handleDeleteComment(){
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(this.props.index)
        }
    }
    componentWillUnmount(){
        clearInterval(this._timer)
    }

    _getProcessedContent(content){
        return content
            .replace(/`([\S\s]+?)`/g,'<code>$1</code>')
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#039;')
    }

    render(){
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.username} </span>：
                </div>
                <p dangerouslySetInnerHTML={{__html: this._getProcessedContent(this.props.comment.content)}}>{/*{this.props.comment.content}*/}</p>
                <span className='comment-createdtime'>{this.state.timeString}</span>
                <span
                    onClick={this.handleDeleteComment.bind(this)}
                    className='comment-delete'>删除</span>
            </div>
        )
    }
}