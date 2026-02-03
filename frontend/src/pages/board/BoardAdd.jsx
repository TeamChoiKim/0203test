import { api } from '@utils/network.js'
import { useState } from "react"
import { useNavigate } from "react-router"
import { useEffect } from 'react'

const BoardAdd = ()=>{
	const nav = useNavigate()
	const [userName, setUserName] = useState("")
	useEffect(() => {
		api.post('/username').then(res => {
			if (res.data.name) setUserName(res.data.name)
		})
	}, [])

	const submitEvent = e => {
		e.preventDefault()
		const title = e.target.title.value
		const content = e.target.content.value
		api.post('/boardadd', {title: title, content: content})
		.then(res => console.log("성공", res), nav("/"))
		.catch(err => console.log("실패", err))
	}

    return(
        <div className="container mt-3">
			<h1 className="display-1 text-center">게시글 작성</h1>
			<form onSubmit={submitEvent}>
				<div className="mb-3 mt-3">
					<label htmlFor="title" className="form-label">제목</label>
					<input type="text" className="form-control" id="title" placeholder="제목을 입력하세요." name="title"/>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="name" className="form-label">작성자</label>
					<input type="text" className="form-control" id="name" value={userName} disabled/>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="content" className="form-label">내용</label>
					<textarea type="text" className="form-control h-50" rows="10" placeholder="내용을 입력하세요." name="content"></textarea>
				</div>
				<div className="d-flex">
					<div className="p-2 flex-fill d-grid">
						<button type='submit' className="btn btn-primary">등록</button>
					</div>
					<div className="p-2 flex-fill d-grid">
						<button type='button' onClick={()=>nav('/')} className="btn btn-primary">취소</button>
					</div>
				</div>
			</form>
		</div>
    )
}
export default BoardAdd