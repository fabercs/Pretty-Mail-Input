
var FormElement = React.createClass({
    
   render:function()
    {
            return(
            <p>
                <label>{this.props.label}</label>
                <input type={this.props.type} name={this.props.name} id={this.props.name}></input>
            </p>);
    }
    
});
var Form = React.createClass({

  
  render: function() {
      var elements = [{type:"text",name:"adsoyad", label:"Adı Soyadı"},
                      {type:"text",name:"adres", label:"Adres"},
                      {type:"text",name:"telefon", label:"Telefon"},
                      {type:"text",name:"email", label:"Email"},
                      {type:"text",name:"sube", label:"Şube"}];
      
    return(
        <div className="box">
        <form onSubmit={this.props.onSubmit}>
              
            {elements.map(function(item,i){
                
                return(<FormElement key={i+1} label={item.label} type={item.type} name={item.name} />)
            })}
            <p>
                <button>Save</button>
            </p>
        </form>
      </div>
    );
    
  }

    
});

var List = React.createClass({
    render: function()
    {
        if(this.props.listItems.length>0)
        {
            
            console.log(this.props.listItems.length)
            console.log(this.props.listItems)
            console.log(this.props.listItems[0])
            return(
                <div className="box">
                       {this.props.listItems.map(function(item){
                        return(<p>{item[0].adSoyad}</p>)
                    })}
                </div>
            );
        }
        else{
            return(<div className="box"></div>)
        }
        
        
    }
});



var Main = React.createClass({
    getInitialState:function()
    {
        return{
            items:[]
        }
    },
    handleSubmit: function(e)
    {
        e.preventDefault();
        /*
            ref ile nasıl uygulanacağı:
            http://stackoverflow.com/questions/25941585/react-refs-with-components
        */
        var form = e.target;
        var object = [].reduce.call(form,(data,element)=>{data[element.name] = element.value; return data;},{})
        delete object[""];
        console.log(JSON.stringify(object));
        
        $.ajax({
            type:"POST",
            contentType: "application/json",
            dataType:"json",
            url:"http://localhost:17344/api/Musteri/MusteriPost",
            data: JSON.stringify(object)
        })
        .done(function(data){
            console.log(data);
            //this.setState({itemAdded: this.state.itemAdded.concat(object) });
        })
        .fail(function(jqXhr)
        {
           console.log("fail"); 
        });
        
    },
    
    componentDidMount:function()
    { 
        var that = this;
        $.ajax({
            type:"GET",
            contentType: "application/json",
            dataType:"json",
            url:"http://localhost:17344/api/Musteri/TumMusteri",
        })
        .done(function(data){
            //console.log(data);
            var arr = that.state.items.slice();
            arr.push(data);
            that.setState({items: arr });
        })
        .fail(function(jqXhr)
        {
           console.log("fail"); 
        });  
    },
    render:function()
    {
     return(<div>
                <Form onSubmit={this.handleSubmit} />
                <hr />
                <List listItems = {this.state.items} />
            </div>);
    }
});

ReactDOM.render(<Main />,document.getElementById("app"))
