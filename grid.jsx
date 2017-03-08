
var FormElement = React.createClass({
    
   render:function()
    {
            return(
            <p>
                <label>{this.props.label}</label>
                <input type={this.props.type} name={this.props.name} id={this.props.name} ref={this.props.name} ></input>
            </p>);
    }
    
});
var Form = React.createClass({

  
  render: function() {
      var elements = [{type:"text",name:"adsoyad", label:"Adı Soyadı"},
                      {type:"text",name:"adres", label:"Adres"},
                      {type:"text",name:"tel", label:"Telefon"},
                      {type:"text",name:"email", label:"Email"},
                      {type:"text",name:"sube", label:"Şube"}];
      
    return(
        <div className="box">
        <form onSubmit={this.handleSubmit}>
              
            {elements.map(function(item){
                return(<FormElement label={item.label} type={item.type} name={item.name} />)
            })}
            <p>
                <button>Gonder</button>
            </p>
        </form>
      </div>
    );
    
  },

    handleSubmit: function(e)
    {
        e.preventDefault();
        console.log("geldi");
        
    }
});

var List = React.createClass({
    render: function()
    {
        return(
            <div className="box">
                <p>Liste Burada</p>    
            </div>
       );
        
    }
});



var Main = React.createClass({
    
    render:function()
    {
     return(<div>
                <Form onSubmit = {this.formOnSubmit} />
                <hr />
                <List />
            </div>);
    }
});

ReactDOM.render(<Main />,document.getElementById("app"))