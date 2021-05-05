import React, {  Component} from 'react';
import ReactDOM from 'react-dom';
import JwPagination from 'jw-react-pagination';
import './Employe.css';


class Employe extends Component {
  constructor(props) {
    super(props);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      userList: [],
      pageOfItems: [],
      loading: false,
      IsForm: false,
      FormDetails:{name: '', email:'' , position:''}
    };
    this.getUserList = this.getUserList.bind(this);
    this.saveUSerData = this.saveUSerData.bind(this);
    this.showForm = this.showForm.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.positionChange = this.positionChange.bind(this);
  }
  nameChange(event) {
    this.setState(prevState => {
      let FormDetails = Object.assign({}, prevState.FormDetails);  // creating copy of state variable jasper
      FormDetails.name = event.target.value;                     // update the name property, assign a new value                 
      return { FormDetails };                                 // return new object jasper object
    })
  }

  emailChange(event) {
    this.setState(prevState => {
      let FormDetails = Object.assign({}, prevState.FormDetails);  // creating copy of state variable jasper
      FormDetails.email = event.target.value;                     // update the name property, assign a new value                 
      return { FormDetails };                                 // return new object jasper object
    })
  }

  positionChange(event) {
     this.setState(prevState => {
      let FormDetails = Object.assign({}, prevState.FormDetails);  // creating copy of state variable jasper
      FormDetails.position = event.target.value;                     // update the name property, assign a new value                 
      return { FormDetails };                                 // return new object jasper object
    })
  }
  componentDidMount() {
    this.getUserList();
  }
  showForm(){
      this.setState({
        IsForm: true,
      });
  }
  saveUSerData(){
    console.log(this.state.FormDetails);
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state.FormDetails)
      };
      fetch('https://608a33928c8043001757fd4b.mockapi.io/api/v2/user', requestOptions)
      .then(response => response.json()).then(data =>{
        this.setState({ IsForm: false });
        this.getUserList();
      });
  }
  getUserList() {
    this.setState({
      loading: true,
      userList: [],
      pageOfItems: []
    });
    fetch("https://608a33928c8043001757fd4b.mockapi.io/api/v2/user")
      .then(res => res.json())
      .then(res => {
        setTimeout(() => {
          this.setState({
            loading: false,
            userList: res
          });
        }, 2000);
      });
  }
  onChangePage(pageOfItems) {
    // update local state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }
  render() {
    const { loading, IsForm } = this.state;

    return (
      <div class="container">
        <button class="btn btn-info float-right button" onClick={this.showForm}>Add User</button>
        {IsForm && (
            <div class="container-child">
              Add User Form
              <div class="container-child">
                  <form method="post">  
                      <label for="Name">Name: </label>
                      <input id="Name" type="text" value={this.state.name} onChange={this.nameChange} />

                      <label for="email">Email: </label>
                      <input id="email" type="email" value={this.state.email} onChange={this.emailChange} />

                      <label for="position">Position: </label>
                      <input id="position" type="text" value={this.state.position} onChange={this.positionChange} />
                      <button class="btn btn-info float-right button" type="button" onClick={this.saveUSerData}>Submit</button>
                </form>
            </div>
          </div>
        )}
        <div class="container">
          <table class="table mt-3">
            <tr class="thead-dark">
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
            </tr>
              {this.state.pageOfItems.map(x => (
                <tr>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                  <td>{x.position}</td>
                </tr>
              ))}
              <JwPagination items={this.state.userList} onChangePage={this.onChangePage}  />
              {this.state.pageOfItems.length == 0 &&  !loading && (
                <tr>
                  <td class="text-center" colSpan="3">
                    No data found to display.
                  </td>
                </tr>
              )}
              {loading && this.state.pageOfItems.length == 0 && (
                <tr>
                  <td class="text-center" colSpan="3">
                    User is loading....
                  </td>
                </tr>
              )}
          </table>
        </div>
      </div>
    );
  }
}
export default Employe;