import React, { Component } from 'react';

import './../App.css';
import Header from './Header';
import Search from './Search';
import TableData from './TableData';
import AddUser from './AddUser';
import DataUser from './Data.json';

const uuidv1 = require('uuid/v1');
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hienThiForm: false,
      data: DataUser,
      editUserStatus: false,
      userEditObject: {},
      searchText: '',
      data: []
    }
  }

  
  componentWillMount() {
    // kiem tra xem co localStorage này chưa
    if(localStorage.getItem('userData') === null){
      localStorage.setItem('userData',JSON.stringify(DataUser));
    }
    else{
      var temp = JSON.parse(localStorage.getItem('userData'));
      this.setState({
        data: temp
      });
    }
  }
  

  deleteUser = (idUser) => {

    //ham filter
    // var arr = [1,2,3];
    // var x = 2;
    // arr = arr.filter(item => item != x);// lọc những ptử khác 2
    // console.log(arr);
    
    
    var tempData = this.state.data.filter(item => item.id !== idUser);
    this.setState({
      data: tempData
    });
    // đẩy vào dữ liệu
    localStorage.setItem('userData', JSON.stringify(tempData));
  }

  getUserEditInfoApp = (info) => {
    //console.log('thong tin da sua xong la' + info.name);
    this.state.data.forEach((value,key) => {
      if(value.id === info.id){
        value.name = info.name;
        value.tel = info.tel;
        value.Permission = info.Permission;
      }
      
    })
    localStorage.setItem('userData', JSON.stringify(this.state.data));
  }

  changeEditUserStatus = () => {
    this.setState({
      editUserStatus: !this.state.editUserStatus
    });
  }

  editUser = (user) => {
    console.log("Da ket noi ok");
    this.setState({
      userEditObject: user
    });
    console.log(user);
    
  }

  getNewUserData = (name, tel, Permission) => {
    var item = {};
    item.id = uuidv1();
    item.name = name;
    item.tel = tel;
    item.Permission = Permission;
    var items = this.state.data;
    
    items.push(item);
    // để đẩy dữ liệu ra tableData.js và hiển thị ta phải đẩy dữ liệu lên state bằng setState
    this.setState({
      data:items
    });
    //console.log('ket noi ok');
    //console.log(this.state.data);
    localStorage.setItem('userData', JSON.stringify(items));
    
  }
  
  getTextSearch = (dl2) => {// component con muốn truyền dữ liệu cho bố phải qua tham số của hàm trong props
    this.setState({
      searchText: dl2
    });
  }

  doiTrangThai = () => {
    this.setState({
      hienThiForm: !this.state.hienThiForm
    });
  }

  // thongbao = () => {
  //   alert('Ket noi thanh cong');
  // }

  render() {
    // localStorage.setItem('userData', JSON.stringify(DataUser));
    var ketqua =[];
    this.state.data.forEach((item2)=> {
      if(item2.name.indexOf(this.state.searchText) !== -1){
        ketqua.push(item2);
      }
      //item2.name name là name trong Data.json
    });
    console.log(ketqua);
    
    return (
      <div >
        <Header/>
        <div className="searchForm">
            <div className="container">
              <div className="row">
                 <Search
                 getUserEditInfoApp = {(info) => this.getUserEditInfoApp(info)}
                 userEditObject = {this.state.userEditObject}
                  changeEditUserStatus = {() => this.changeEditUserStatus()}
                  editUserStatus ={this.state.editUserStatus}
                 checkConnectProps ={(dl) => this.getTextSearch(dl)}
                  ketNoi ={() => this.doiTrangThai()} hienThiForm={this.state.hienThiForm}/>
                 <TableData 
                 deleteUser = {(idUser) => this.deleteUser(idUser)}
                 changeEditUserStatus = {() => this.changeEditUserStatus()} 
                 editFunClick ={(user) => this.editUser(user)} dataUserProps={ketqua}/>
                 <AddUser add={(Name, tel, Permission) => this.getNewUserData(Name, tel, Permission) } hienThiForm={this.state.hienThiForm}/>
              </div>
            </div> 
        </div>
      </div>
    );
  }
}

export default App;
