var Fetch=React.createClass({

	getInitialState:function(){
		return (
			{data:[],
				start:0}
			);
	},

	next:function(){
		this.fetch("n");		
	},

	prev:function(){
		this.fetch("p");
	},

	componentWillMount() {
	      this.fetch();
	},

	handleDelete: function(event){

		console.log(event);
        
        var id=event.target.parentElement.parentElement.firstChild.textContent;
        var deleteRow=event.target.parentElement.parentElement;
             $.ajax({
                type:'DELETE',
                url: '/Players/'+id,
                dataType: 'json',
                cache: false,
                success: function(){
                        alert("Successfully deleted");
                        deleteRow.remove();             
                    }.bind(this) 
                });
    },

	fetch :function(s){
		var start1=this.state.start;
		
		if (s=="n") 
		{
			start1=start1+10;
		}
		if(s=="p")
		{
			start1 = start1-10;
		}

		$.ajax({
			url:'/Players/?_start='+start1+'&_limit=10',
			dataType:'json',
			type:'get',
			success:function(data1){
				this.setState({data:data1, start:start1});

			}.bind(this)
		})
	},

	render:function(){
		var rows=this.state.data.map(function(row){
			return(
				<tr>
				<td>{row.id}</td>	
				<td>{row.name}</td>
				<td>{row.foot}</td>
				<td>{row.age}</td>
				<td>{row.gender}</td>
				<td>{row.sponser}</td>
				<td>{row.email}</td>
				<td>{row.phone}</td>
				<td>{row.address}</td>
				<td><input type="button" value="Update" className="btn btn-info" onClick={this.handleUpdate}/></td>
				<td><input type="button" value="Delete" className="btn btn-danger" onClick={this.handleDelete}/></td>
				</tr>
				);
		}.bind(this));
		return (
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
						<th>Operations</th>
					</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				<h1>
				<span className="pull-left">{(this.state.start+10)/10}</span></h1>
				<nav>
				<ul className="pager">
					<li><a onClick={this.prev}>Prev</a></li>
					<li><a onClick={this.next}>Next</a></li>
				</ul>
				</nav>
			</div>	
			);
	}
});

var App=React.createClass({
    handleClick: function(){
        ReactDOM.render(<Fetch />,document.getElementById("content"));
    },
	handleCreate: function(){
		ReactDOM.render(<Create/>,document.getElementById("create"));
	},
    render: function () {
        return(
            <div>
                <input type="button" value="Fetch All Records" className="btn btn-primary" onClick={this.handleClick}/>
                <input type="button" value="Create A New Record" className="btn btn-warning" onClick={this.handleCreate}/>
            </div>
        );
    }
});

var Create = React.createClass({
	handleCreate:function(){
		 var name=document.getElementById('name').value,
		   foot=document.getElementById('foot').value,
           age=document.getElementById('age').value,
           gender=document.getElementById('gender').value,
		   sponser=document.getElementById('sponser').value,
           email=document.getElementById('email').value,
           phone=document.getElementById('phone').value;
		   address=document.getElementById('address').value,
               $.ajax({
                       type: 'POST', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
                       dataType: 'json', // Set datatype - affects Accept header
                       url: "http://localhost:8080/emp", // A valid URL
                       headers: {"Content-Type": "application/json"}, // X-HTTP-Method-Override set to PUT.
                       data: JSON.stringify({
                           name: name,
                           age: age,
                           gender: gender,
                           email: email,
                           phone: phone
                       }), 
                       success: function(){
                           alert('Created successfully');
                       }
                   });
   },
	render:function(){
		return(
			<div>
			<table>
				<thead>
					<tr>
						<td>Name</td>
						<td>Foot</td>
						<td>Age</td>
						<td>Gender</td>
						<td>Sponser</td>
						<td>Email</td>
						<td>Phone</td>
						<td>Address</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><input id="name"/></td>
						<td><input id="foot"/></td>
						<td><input id="age"/></td>
						<td><input id="gender"/></td>
						<td><input id="sponser"/></td>
						<td><input id="email"/></td>
						<td><input id="phone"/></td>
						<td><input id="address"/></td>
					</tr>
				</tbody>
			</table>
			<center>
				<input type="button" value="Create New Record" className="btn btn-info" onClick={this.handleCreate}/>
			</center>
			</div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById("content"));


