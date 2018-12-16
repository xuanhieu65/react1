import React, { Component } from 'react';

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //id: "",
            name: "",
            tel: "",
            Permission: ""
        }
    }
    

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        //console.log(name);
        //console.log(value);
        // đẩy dữ liệu lấy về lên state
        this.setState({
            [name]: value
        });
        // đóng gói thành đối tượng để gửi lên App.js
        // var item = {};
        // item.id = this.state.id;
        // item.name = this.state.name;
        // item.tel = this.state.tel;
        // item.Permission = this.state.Permission;
        //console.log(item);
        
    }

    kiemTraTrangThai = () =>{
        if(this.props.hienThiForm === true){
            return(
                <div className="col">
                <form>
                    <div className="card border-primary mb-3 mt-2">
                    <div className="card-header">Thêm mới User vào hệ thống</div>
                    <div className="card-body">
                        <div className="form-group">
                        <input onChange={(event) => this.isChange(event)} name="name" type="text" className="form-control"  placeholder="Tên User" />
                        </div>
                        <div className="form-group">
                        <input onChange={(event) => this.isChange(event)} name="tel" type="text" className="form-control"  placeholder="Điện thoại" />
                        </div>
                        <div className="form-group">
                        <select onChange={(event) => this.isChange(event)} name="Permission" className="custom-select" required>
                            <option value>Chọn quyền mặc định</option>
                            <option value={1}>Admin</option>
                            <option value={2}>Moderator</option>
                            <option value={3}>Normal</option>
                        </select>
                        <div className="invalid-feedback">Example invalid custom select feedback</div>
                        </div>
                        <div className="form-group">
                        <input type="reset" className="btn btn-block btn-primary" onClick ={() => this.props.add(this.state.name, this.state.tel, this.state.Permission)} value ="Thêm mới"/>
                            
                        
                        </div>
                    </div>
                    </div>
                    </form>
                </div>
            );
        }
    }
    render() {
        //console.log(this.state);
        
        return (
            
                <div>
                    {
                        this.kiemTraTrangThai()
                    }
                </div>
            
        );
    }
}

export default AddUser;