import { useEffect, useState } from "react"
import { api } from '@utils/network.js'
import { useNavigate } from "react-router"


const Home = () => {
	const [boardList, setBoardList] = useState([])
	const nav = useNavigate()

	useEffect(() => {
		api.get('/getList').then(res => {
			if (res.data.status) setBoardList([...res.data.boardList])
		})
	}, [])
	const boardClick= (i) => {
		const boardNo = {"boardNo": boardList[i]["no"]}
		
		nav(`/boardview/${boardNo["boardNo"]}`)
	}
	return (
		<div className="container mt-3">
			<h1 className="display-1 text-center">게시판</h1>
			<div className="d-flex justify-content-between align-items-center mt-4">
				<div className="btn-group">
					<a href="./board/board_add.html" className="btn btn-primary">게시글 작성</a>
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
								<tr className="cursor-pointer" onClick={()=>boardClick(i)} key={i}>
									<td>{i+1}</td>
									<td>{v.title}</td>
									<td>{v.name}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>

			{/* <!-- Pagination 영역  --> */}
			<nav aria-label="Page navigation example">
				<ul className="pagination justify-content-center mt-4">
					<li className="page-item">
						<a className="page-link" href="#" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					<li className="page-item"><a className="page-link" href="#">1</a></li>
					<li className="page-item"><a className="page-link" href="#">2</a></li>
					<li className="page-item"><a className="page-link" href="#">3</a></li>
					<li className="page-item">
						<a className="page-link" href="#" aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Home