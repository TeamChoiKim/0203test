import { useEffect, useState } from "react"
import { api } from '@utils/network.js'
import { useParams } from "react-router"
import { useAuth } from "@hooks/AuthProvider.jsx"
import { useNavigate } from "react-router"

const BoardView = () => {

	const nav = useNavigate()
	const { isLogin } = useAuth()

	const [content, setContent] = useState({ "title": "", "name": "", "content": "" })
	const [modAcc, setModAcc] = useState(false)
	const param = useParams().id

	const params = { "params": param }

	useEffect(() => {
		if (!isLogin) {
			nav('/login')
		}
		api.post(`/boardview`, params).then(res => {
			const boardEmail = res.data.boardData.user_email
			const userEmail = res.data.login.email
			if(boardEmail === userEmail ) setModAcc(true)
			setContent(res.data.boardData)
		}).catch(err => console.log(err))
	}, [])

	const modClick = () => {
		if(modAcc){
			nav("/boardedit")
		}else{
			alert("수정 권한이 없습니다")
		}
	}

	return (
		<div className="container mt-3">
			<h1 className="display-1 text-center">게시글 상세</h1>
			<form>
				<div className="mb-3 mt-3">
					<label htmlFor="title" className="form-label">제목</label>
					<input type="text" className="form-control" id="title" name="title" value={content.title} readOnly="readOnly" />
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="name" className="form-label">작성자</label>
					<input type="text" className="form-control" id="name" name="name" readOnly="readOnly" value={content.name} />
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="content" className="form-label">내용</label>
					<textarea type="text" className="form-control h-50" rows="10" id="content" name="content" readOnly="readOnly" value={content.content}></textarea>
				</div>
			</form>
			<div className="d-flex">
				<div className="p-2 flex-fill d-grid">
					<button onClick={() => modClick()} className="btn btn-primary">수정</button>
				</div>
				<div className="p-2 flex-fill d-grid">
					<button className="btn btn-primary">삭제</button>
				</div>
				<div className="p-2 flex-fill d-grid">
					<button className="btn btn-primary">취소</button>
				</div>
			</div>
		</div>
	)
}

export default BoardView