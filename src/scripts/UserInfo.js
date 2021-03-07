class UserInfo {
  constructor({ userName, userJob }) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);

    this.getUserInfo = this.getUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  getUserInfo() {
    debugger;
    return {
      userName: this.userName.textContent,
      userJob: this.userJob.textContent,
    };
  }

  setUserInfo(userName, userJob) {
    this.userName.textContent = userName;
    this.userJob.textContent = userJob;
  }
}

export default UserInfo;
