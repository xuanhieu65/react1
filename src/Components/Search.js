import React, { Component } from 'react';
import EditUser from './EditUser';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state ={
            tempValue: '',
            userObj: {}
        }
    }

    getUserEditInfo = (info) =>{
        this.setState({
            userObj: info
        });
        this.props.getUserEditInfoApp(info);
    }

    isShowEditForm = () => {
        if(this.props.editUserStatus === true){
            return <EditUser 
            getUserEditInfo = {(info) => this.getUserEditInfo(info)}
            userEditObject = {this.props.userEditObject}
            changeEditUserStatus={() => this.props.changeEditUserStatus()}/>
        }
        
    }
    
    isChange = (event) => {
        console.log(event.target.value);
        this.setState({
            tempValue: event.target.value
        });
        this.props.checkConnectProps(this.state.tempValue);
    }
    hienThiNut = () => {
        if(this.props.hienThiForm === true){
            return <div className="btn btn-block btn-outline-secondary" onClick={() => this.props.ketNoi()}>Đóng lại</div>
        }
        else {
            return <div className="btn btn-block btn-outline-info" onClick={() => this.props.ketNoi()}>Thêm mới</div>
        }
    }
    render() {
        return (
            <div className="col-12">
                {this.isShowEditForm()}
                <div className="form-group">
                    <div className="btn-group">
                    <input onChange={(eventt) => this.isChange(eventt)} type="text" className="form-control" placeholder="Nhập tên cần tìm" style={{width: 500}} />
                    <div className="btn btn-info" onClick={() => this.props.checkConnectProps(this.state.tempValue)}>Tìm</div>
                    </div>
                    <div className="btn-group1">
                        {this.hienThiNut()}
                    
                    </div>
                    
                </div>
                <hr/>
            </div>
            
        );
    }
}

export default Search;