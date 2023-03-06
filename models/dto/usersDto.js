class UserDto {
  constructor(product) {
    this.id = product.id || product._id;
    this.email = product.email;
    this.fullname = product.fullname;
    this.tel = product.tel;
    this.admin = product.admin;
  }
}

export default UserDto;
