import React, {Component} from 'react'


class Chat extends Component {
  constructor(props, context){
    super(props,context)
    this.updateMessage = this.updateMessage.bind(this)
    // this.submitMessage = this.submitMessage.bind(this)
    this.state = {
      posts: [],
      message: {
        username:'',
        text: ''
      }
    }
  }

  submitMessage(event){
    console.log('Submit Message:', JSON.stringify(this.state.message))

    var preparedMessage = Object.assign({}, this.state.message)
    preparedMessage['id'] = this.state.posts.length

    firebase.database().ref('posts/' + preparedMessage.id).set(preparedMessage)

    // var updateList = Object.assign([], this.state.posts)
    // updateList.push(this.state.message)
    // this.setState({
    //   posts: updateList
    // })
  }

  componentDidMount(){
    console.log('componentDidMount')
    const fbref =  firebase.database().ref('posts/').on('value', (snapshot)=>{
      console.log(JSON.stringify(snapshot.val()))
      this.setState({
        posts: snapshot.val()
      })
    })
  }

  updateMessage(event){
    // console.log(event.target.id +  '==' + event.target.value)

    var updateMessage = Object.assign({}, this.state.message)
    updateMessage[event.target.id] = event.target.value
    this.setState({
      message : updateMessage
    })

    console.log(JSON.stringify(updateMessage))
  }

  render(){
    var currentMessages = this.state.posts.map((post, i)=>{
      return (
          <li key={i}>
            <strong>{post.username}</strong>,
            {post.text}
          </li>
      ) 
    })

    return(
       <div className= 'container'>
       <h3>Messages</h3>
        <ol>
          {currentMessages}
        </ol>
        <h3>Submit Message</h3>
        <input onChange={this.updateMessage} className="form-control" style={styles.textInput} type="text" id="username" placeholder="Username" /><br/>
        <textarea onChange={this.updateMessage} className="form-control" style={styles.textInput} id="text" placeholder="Message"></textarea> <br/>
        <button onClick={() => this.submitMessage()} className="btn btn-success">Submit Comment</button>
       </div> 
    )
  }
}

const styles ={
  textInput: {
    background: '#f9f9f9'
  }
}

export default Chat