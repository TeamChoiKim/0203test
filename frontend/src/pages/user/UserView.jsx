import { useState } from "react"

const UserView = () => {

	const [userData, setUserData] = useState({
		name: '',
		email: "",
		pwd: '',
		regDate: "",
		modDate: "",
		gender: 1
	})

	return (
		<div className="container mt-3">
			<h1 className="display-1 text-center">회원정보</h1>
			<form>
				<div className="mb-3 mt-3">
					<label htmlFor="name" className="form-label">이름</label>
					<input value={userData.name}
					type="text" className="form-control" id="name" name="name" readOnly="readOnly" />
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="email" className="form-label">이메일</label>
					<input value={userData.email} 
					type="email" className="form-control" id="email" name="email" readOnly="readOnly" />
				</div>
				<div className="mb-3">
					<label htmlFor="pwd" className="form-label">비밀번호</label>
					<input value={userData.pwd} 
					type="password" className="form-control" id="pwd" name="pwd" readOnly="readOnly" />
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="regDate" className="form-label">가입일</label>
					<input value={userData.regDate}
					type="text" className="form-control" id="regDate" name="regDate" readOnly="readOnly" />
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="modDate" className="form-label">회원정보 수정일</label>
					<input value={userData.modDate} 
					type="text" className="form-control" id="modDate" name="modDate" readOnly="readOnly" />
				</div>
				<div className="d-flex">
					<div className="p-2 flex-fill">
						<div className="form-check">
							<input type="radio" className="form-check-input" id="radio1" name="gender" value="1" checked={userData.gender == '0'} disabled />남성
							<label className="form-check-label" htmlFor="radio1"></label>
						</div>
					</div>
					<div className="p-2 flex-fill">
						<div className="form-check">
							<input type="radio" className="form-check-input" id="radio2" name="gender" value="2" checked={userData.gender == '1'} disabled />여성
							<label className="form-check-label" htmlFor="radio2"></label>
						</div>
					</div>
				</div>
			</form>
			<div className="d-flex">
				<div className="p-2 flex-fill d-grid">
					<a href="../index.html" className="btn btn-primary">취소</a>
				</div>
				<div className="p-2 flex-fill d-grid">
					<a href="./user_edit.html" className="btn btn-primary">수정</a>
				</div>
			</div>
		</div>
	)
}

export default UserView