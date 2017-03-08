var Counter = React.createClass({ 
            getInitialState:function() 
            { return {counter:0}; }, 
            render: function() { 
                return(<button onClick={this.props.localClickHandler}>+1</button> ) }
            
});

var Result = React.createClass({
           render: function()
            {
                return (<div>{this.props.localCounter}</div>)
            }
        });
        
var Main = React.createClass({
    getInitialState: function()
    {
        return {counter:0};
    },
    handleClick: function(){
        this.setState({counter: this.state.counter+1});
    },
    render:function()
    {
        return(
            <div>
            <Counter localClickHandler={this.handleClick}></Counter>
            <Result localCounter={this.state.counter}></Result>
           </div>
        )
    }
})
setInterval(function(){
    var messages = ["hi","hola","hello","merhaba"];
    var random = messages[Math.floor(Math.random()*3)];
    
    ReactDOM.render(
        <Result localCounter={random}></Result>,document.getElementById("greeting")
    );
},2000);
ReactDOM.render(<Main />, document.getElementById("app"));
