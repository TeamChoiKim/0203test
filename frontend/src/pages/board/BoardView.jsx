const BoardView = ()=>{
    return(
        <div className="container mt-3">
			<h1 className="display-1 text-center">게시글 상세</h1>
			<form>
				<div className="mb-3 mt-3">
					<label htmlFor="title" className="form-label">제목</label>
					<input type="text" className="form-control" id="title" name="title" readOnly="readOnly"/>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="name" className="form-label">작성자</label>
					<input type="text" className="form-control" id="name" name="name" readOnly="readOnly"/>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="content" className="form-label">내용</label>
					<textarea type="text" className="form-control h-50" rows="10" id="content" name="content" readOnly="readOnly"></textarea>
				</div>
			</form>
			<div className="d-flex">
				<div className="p-2 flex-fill d-grid">
					<a href="./board_edit.html" className="btn btn-primary">수정</a>
				</div>
				<div className="p-2 flex-fill d-grid">
					<a href="../index.html" className="btn btn-primary">삭제</a>
				</div>
				<div className="p-2 flex-fill d-grid">
					<a href="../index.html" className="btn btn-primary">취소</a>
				</div>
			</div>
		</div>
    )
}

export default BoardView