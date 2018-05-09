import React from 'react';

export default class CommentInput extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            content: ''
        }
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value})
    }

    handleContentChange(event){
        this.setState({content: event.target.value})
    }

    handleButton(){
        const {content} = this.state
        const username = localStorage.getItem('USERNAME')
        this.props.onClick({
            username,
            content,
            createdTime: +new Date()
        })
        this.setState({content: ''})
    }

    handleUsernameBlur(event){
        localStorage.setItem('USERNAME',event.target.value)
    }

    componentWillMount(){
        this._loadUsername()
    }

    _loadUsername(){
        const username = localStorage.getItem('USERNAME')
        if(username){
            this.setState({username})
        }
    }

    componentDidMount(){
        this.textarea.focus()
    }

    render(){
        return (
            <div>
                <div className="comment-input">
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input value={this.state.username}
                               onChange={this.handleUsernameChange.bind(this)}
                               onBlur={this.handleUsernameBlur.bind(this)}
                        />
                    </div>
                </div>
                <div className="comment-input">
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea ref={textarea => this.textarea = textarea} value={this.state.content} onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleButton.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}