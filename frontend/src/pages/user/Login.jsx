import { useNavigate } from "react-router"
import { useAuth } from "@hooks/AuthProvider"
import { useState } from "react"
import { api } from '@utils/network.js'

const Login = () => {
	const nav = useNavigate()
	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const { setAuth } = useAuth()
	const submitEvent = (e) => {
		e.preventDefault()
		const params = { email, pwd }
		api.post("/login", params)
			.then(res => {
				if (res.data.status) {
					setAuth(true)
					alert(res.data.msg)
					nav('/')
				} else {
					setAuth(false)
					alert(res.data.msg)
					setEmail("")
					setPwd("")
				}
			})
			.catch(err => console.error(err))
	}
	return (
		<div className="container mt-3">
			<h1 className="display-1 text-center">로그인</h1>
			<form onSubmit={submitEvent}>
				<div className="mb-3 mt-3">
					<label htmlFor="email" className="form-label">이메일</label>
					<input type="email" className="form-control" id="email" placeholder="이메일를 입력하세요." name="email"
						value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
				</div>
				<div className="mb-3">
					<label htmlFor="pwd" className="form-label">비밀번호</label>
					<input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력하세요." name="pwd"
						value={pwd} onChange={(e) => setPwd(e.target.value)} required={true} />
				</div>
				<div className="d-flex">
					<div className="p-2 flex-fill d-grid">
						<button className="btn btn-primary" type="submit">로그인</button>
					</div>
					<div className="p-2 flex-fill d-grid">
						<a href="../index.html" className="btn btn-primary">취소</a>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Login