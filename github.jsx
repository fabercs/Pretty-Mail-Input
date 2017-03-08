var Card = React.createClass({
   getInitialState: function()
    {
        return{
            user:{},
            repo:[],
            IsDisabled: true
        };
    },
    
    componentDidMount: function()
    {
       var com = this;
       $.get("https://api.github.com/users/"+this.props.user,function(data)
       {
           console.log(data);
           //console.log(com.state);
          com.setState({user:data});
          $.get(data.repos_url,function(res){
              com.setState({repo:res});
              console.log(res);
          });
           
       }); 
        
    },
    render: function()
    {
        return(
            <div>
                <img src={this.state.user.avatar_url} width="80" />
                <h3>{(this.state.user.name)?(this.state.user.name):(this.state.user.login)}</h3>
                <hr/>
                <h5>Repos</h5>
                <ul>
                    {this.state.repo.map(function(d){
                      return <li>{d.name}</li>  
                    })}
                </ul>
            </div>
        );
        
    }
    
});

var Form = React.createClass({
    render: function(){
        return (
        <form onSubmit={this.handleClick}>
            <input type="text" ref="login" placeholder="github login">
            </input>
            <button>Add</button>
        </form>
    
    );
  },
  handleClick: function(e){
      e.preventDefault();
      var loginInput = this.refs.login;
      this.props.addCard(loginInput.value);
  }
    
});

var Main = React.createClass({
    getInitialState: function(){
        return {logins: []};
    },
    render: function()
    {
        var cards = this.state.logins.map(function(login){
                                          return(<Card user={login}></Card>);
        });
        return(
            <div>
            <Form addCard={this.addCard} /><br/>
            {cards}
            </div>
        )
    },
    addCard: function(login)
    {
        this.setState({logins:this.state.logins.concat(login) });
    }
});

ReactDOM.render(<Main></Main>,document.getElementById("app"));