var Fetch = React.createClass({
    getInitialState:function(){
        return(
            {data:[],
            start:0,
            pages:0,
            page:1}
        );
    },
    componentWillMount(){
        this.fetch();
    },
    
    next:function(){
        this.fetch("n");
    },

    previous:function(){
        this.fetch("p");
    },

    fetch:function(s){
        var p=this.state.page;
       if(s=="n")
       {
           this.state.start = this.state.start+10;
           p=p+1;
            if(p>this.state.pages+1)
            {
                p=1;
            }
       } 

       else if(s=="p")
       {
           this.state.start = this.state.start-10;
                       p=p-1;
            if(p<1)
            {
                p=Math.round(this.state.pages);
            }
       }
        $.ajax({
            url:'/Players/?_start='+this.state.start+'&_limit=10',
            dataType:'json',
            type:'get',
            success:function(datav,type,xhr){
                
                var p1=xhr.getAllResponseHeaders().split('\n')[13].split(':')[1].split(" ")[1];
                this.setState({data:datav,pages:p1/10,page:p});
            }.bind(this)
        })
    },

    handleDelete:function(id,event){
        // var identity = event.target.parentElement.paremtElement.firstChild.targetContent;
        // var toBeDeleted = event.target.parentElement.parentElement;

        $.ajax({
            type:'DELETE',
            url:'/Players/+id',
            datType:'json',
            cache:false,
            success:function(){
                alert('Record Deleted');
                this.fetch();
                toBeDeleted.remove();
            }.bind(this)
        }); 
    },
    render:function(){
        var style={width:(this.state.page/Math.round(this.state.pages))*100+'%'};
		var rows=this.state.data.map(function(row,index){
			return(
				
                <Row row={row}/>
			);
		}.bind(this));
        return(
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Foot</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Sponser</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <h1>
                    <span className="badge pull-left">{(this.state.page)}</span>
                </h1>
                <nav>
                <ul className="pager">
                    <li><a onClick={this.previous}>Previous</a></li>
                    <li><a onClick={this.next}>Next</a></li>
                </ul>
                <div className="progress">
                    <div className="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={style}>
                     </div>
                </div>
                </nav>
            </div>
        );
    }
});

var Row=React.createClass({
    getInitialState:function(){
        return(
            {data:this.props.row}
        );
    },

    mainChange:function(str,e){
       var name = this.state.data; 
       name[str]= e.target.value;
       this.setState({data:name});
    },

    handleUpdate: function(){
        $.ajax({
           url:'/Players/'+this.state.data.id,
           dataType:'json',
           type:'PUT',
           data:this.state.data,
           success(){
               console.log('Updated');
           },
       });

    },
    render: function(){
        var rowStyle={background: '#DAF7A6', 
               color: '#333', 
               border: '0px solid #666' };
        return(
            <tr style={rowStyle}>
				<td><input style={rowStyle} defaultValue={this.props.row.id} /></td>	
				<td><input style={rowStyle} defaultValue={this.props.row.name} onChange={this.mainChange.bind(this,'name')} onBlur={this.handleUpdate.bind(this,this.props.row.id)} /></td>
				<td><input style={rowStyle} defaultValue={this.props.row.foot} onChange={this.mainChange.bind(this,'foot')} onBlur={this.handleUpdate.bind(this,this.props.row.id)} /></td>
				<td><input style={rowStyle} defaultValue={this.props.row.age} onChange={this.mainChange.bind(this,'age')} onBlur={this.handleUpdate.bind(this,this.props.row.id)} /></td>
				<td><input style={rowStyle} defaultValue={this.props.row.gender} onChange={this.mainChange.bind(this,'gender')} onBlur={this.handleUpdate.bind(this,this.props.row.id)}/></td>
				<td><input style={rowStyle} defaultValue={this.props.row.sponser} onChange={this.mainChange.bind(this,'sponser')} onBlur={this.handleUpdate.bind(this,this.props.row.id)}/></td>
				<td><input style={rowStyle} defaultValue={this.props.row.email} onChange={this.mainChange.bind(this,'email')} onBlur={this.handleUpdate.bind(this,this.props.row.id)}/></td>
				<td><input style={rowStyle} defaultValue={this.props.row.phone} onChange={this.mainChange.bind(this,'phone')} onBlur={this.handleUpdate.bind(this,this.props.row.id)}/></td>
				<td><input style={rowStyle} defaultValue={this.props.row.address} onChange={this.mainChange.bind(this,'address')} onBlur={this.handleUpdate.bind(this,this.props.row.id)}/></td>
				<td><input type="button" value="Delete" className="btn btn-danger" onClick={this.props.delete.bind(this, this.props.data.id)}/> </td>
			</tr>
        );
    }
});

ReactDOM.render(<Fetch/>,document.getElementById('content'));