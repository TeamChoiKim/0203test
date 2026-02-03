const UserEdit = ()=>{
    return(
        <div className="container mt-3">
			<h1 className="display-1 text-center">회원정보 수정</h1>
			<form>
				<div className="mb-3 mt-3">
					<label htmlFor="name" className="form-label">이름</label>
					<input type="text" className="form-control" id="name" placeholder="이름을 입력하세요." name="name" onChange/>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="email" className="form-label">이메일</label>
					<input type="email" className="form-control" id="email" placeholder="이메일를 입력하세요." name="email" onChange/>
				</div>
				<div className="mb-3">
					<label htmlFor="pwd" className="form-label">비밀번호</label>
					<input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력하세요." name="pwd" onChange/>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="regDate" className="form-label">가입일</label>
					<input type="text" className="form-control" id="regDate" placeholder="YYYY-MM-DD" name="regDate" disabled/>
				</div>
				<div className="d-flex">
					<div className="p-2 flex-fill">
						<div className="form-check">
							<input type="radio" className="form-check-input" id="radio1" name="gender" value="1" checked/>남성
							<label className="form-check-label" htmlFor="radio1"></label>
						</div>
					</div>
					<div className="p-2 flex-fill">
						<div className="form-check">
							<input type="radio" className="form-check-input" id="radio2" name="gender" value="2"/>여성
							<label className="form-check-label" htmlFor="radio2"></label>
						</div>
					</div>
				</div>
			</form>
			<div className="d-flex">
				<div className="p-2 flex-fill d-grid">
					<a href="./user_view.html" className="btn btn-primary">저장</a>
				</div>
				<div className="p-2 flex-fill d-grid">
					<a href="./user_view.html" className="btn btn-primary">취소</a>
				</div>
                <div className="p-2 flex-fill d-grid">
					<a href="../index.html" className="btn btn-primary">탈퇴</a>
				</div>
			</div>
		</div>
    )
}

export default UserEdit