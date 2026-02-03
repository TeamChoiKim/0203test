import { useEffect, useState } from "react"
import { api } from '@utils/network.js'
import { useNavigate } from "react-router"
import { useAuth } from "@hooks/AuthProvider"



const Paging = ({ total, page, pagingEvent }) => {

	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination justify-content-center mt-4">
				<li className="page-item">
					<button className={`page-link ${page == 1 ? "disabled" : ""}`} onClick={() => pagingEvent(page - 1)} aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
					</button>
				</li>
				{
					Array.from({ length: total }, (_, i) => i + 1).map((v) => (
						<li key={v} className="page-item">
							<button className="page-link">{v}</button>
						</li>
					))
				}
				<li className="page-item">
					<button className={`page-link ${page == total ? "disabled" : ""}`} onClick={() => pagingEvent(page + 1)} aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					</button>
				</li>
			</ul>
		</nav>
	)
}
const Home = () => {


	const [boardList, setBoardList] = useState([])
	const [page, setPage] = useState(1)
	const nav = useNavigate()
	const { checkAuth } = useAuth()
	const pagingEvent = (index) => {
		setPage(index)
	}

	useEffect(() => {
		api.get('/getList').then(res => {
			if (res.data.status) setBoardList([...res.data.boardList])
		})
	}, [])
	const boardClick = (i) => {
		const boardNo = { "boardNo": boardList[i]["no"] }

		nav(`/boardview/${boardNo["boardNo"]}`)
	}
	const boardAddButton = () => {
		if (checkAuth()) { nav("/boardadd") }
		else {
			alert('로그인이 필요합니다.')
			nav('/login')
		}
	}
	return (
		<div className="container mt-3">
			<h1 className="display-1 text-center">게시판</h1>
			<div className="d-flex justify-content-between align-items-center mt-4">
				<div className="btn-group">
					<button type="button" onClick={boardAddButton} className="btn btn-primary">게시글 작성</button>
				</div>
				<form className="d-flex">
					<input className="form-control me-2" type="search" placeholder="검색어를 입력하세요" />
					<button className="btn btn-outline-dark" type="submit">Search</button>
				</form>
			</div>
			<table className="table table-hover mt-3 text-center">
				<thead className="table-dark">
					<tr>
						<th>no</th>
						<th>게시글</th>
						<th>작성자</th>
					</tr>
				</thead>
				<tbody>
					{
						boardList.map((v, i) => {
							return (
								<tr className="cursor-pointer" onClick={() => boardClick(i)} key={i}>
									<td>{i + 1}</td>
									<td>{v.title}</td>
									<td>{v.name}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
			<Paging total={5} page={page} pagingEvent={pagingEvent} />
		</div>
	)
}

export default Home