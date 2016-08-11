var Fetch=React.createClass({
    getInitialState: function(){
        return({data:[],upper:10,lower:0,pages:0,page:1});
    },
    next: function(){
        this.fetch("n");
    },
    prev: function(){
        this.fetch("p");
    },
    componentWillMount: function(){
            this.fetch();
    },
    fetch: function(s){
        var u=this.state.upper,l=this.state.lower,p=this.state.page;
        if(s=="n")
        {
            u=u+10,
            l=l+10,
            p=p+1;
            if(p>this.state.pages+1)
            {
                p=1;
                l=0;
                u=10;
            }
        }
        else if(s=="p")
        {
            u=u-10,
            l=l-10,
            p=p-1;
            if(p<1)
            {
                p=Math.round(this.state.pages);
                u=Math.round(this.state.pages)*10;
                l=Math.round(this.state.pages-1)*10;
            }
        }
        $.ajax({
                url: '/Players?_start='+l+'&_end='+u,
                dataType: 'json',
                cache: false,
                success: function(data1,type,xhr){
                        
                        var p1=(xhr.getAllResponseHeaders().split('\n')[13].split(':')[1].trim())/10;
                        this.setState({data:data1,upper:u,lower:l,pages:p1,page:p});
                    }.bind(this) 
                });
    },
    head:['ID',
        'Name',
        'Age',
        'Gender',
        'Email',
        'Phone',
        'Delete'],
    render: function(){
        var style={width: (this.state.page/Math.round(this.state.pages))*100+'%'};
        
        var header=this.head.map(function(h,index){
            return(
                <th key={index}>{h}</th>
            );
        }.bind(this));
        
        var rows=this.state.data.map(function(d,index){
            return(
                <Row data={d} key={index} index={index}/>
            );
        });
        return(
            <div>
            <table className="table">
            <thead>
                <tr>
                    {header}
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
                
                <nav>
                  <ul className="pager">
                    <li><a id="1" type="button" onClick={this.prev}>Prev</a></li>
                    
                    <li><a id="1" type="button" onClick={this.next}>Next</a></li>
                  </ul>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={style}>
                        </div>
                    </div>
                </nav>
                <h4></h4>
                <span className="badge pull-right">{this.state.page}</span>
                <span className="badge">Showing {this.state.lower+1} to {this.state.upper} records</span>
                
                <center><h3>{this.state.pages*10} records in total</h3></center>
            </div>
        );//end of return
    }//end of render function
});

var Row=React.createClass({
    getInitialState: function(){
        return({data:this.props.data});
    },
    //function for updating data
    handleUpdate: function(){
            $.ajax({
                        type: 'PUT', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
                        dataType: 'json', // Set datatype - affects Accept header
                        url: "http://localhost:8080/Players/"+this.state.data.id, // A valid URL
                        headers: {"Content-Type": "application/json"}, // X-HTTP-Method-Override set to PUT.
                        data: JSON.stringify(this.state.data),
                        success: function(){
                                                    
                        }
                        });
    },
    //function for deleting data
    handleDelete: function(){
    },
    
    handleChange: function(str,e){
        console.log(str);
        var data = this.state.data;
        data[str] = e.target.value;
            this.setState({data: data});
    },
    render: function(){
        var style={borderStyle: 'none'};
        return(
            <tr key={this.props.index}>
                <td><input defaultValue={this.state.data.id} style={style}/></td>
                <td><input value={this.state.data.name} style={style} onChange={this.handleChange.bind(this,'name')} onBlur={this.handleUpdate} ref="name"/></td>
                <td><input value={this.state.data.age} style={style} onChange={this.handleChange.bind(this,'age')} onBlur={this.handleUpdate} ref="name"/></td>
                <td><input value={this.state.data.gender} style={style} onChange={this.handleChange.bind(this,'gender')} onBlur={this.handleUpdate} ref="name"/></td>
                <td><input value={this.state.data.email} style={style} onChange={this.handleChange.bind(this,'email')} onBlur={this.handleUpdate} ref="name"/></td>
                <td><input value={this.state.data.phone} style={style} onChange={this.handleChange.bind(this,'phone')} onBlur={this.handleUpdate} ref="name"/></td>
                <td><button className='btn btn-danger' onClick={this.handleDelete}>Delete</button></td>
            </tr>
        );
    }
});
ReactDOM.render(<Fetch/>,document.getElementById('content'));