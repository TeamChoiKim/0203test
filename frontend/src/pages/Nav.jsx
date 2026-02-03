import { useNavigate } from "react-router"
import { useAuth } from "../hooks/AuthProvider"

const Nav = () => {

	const nav = useNavigate()
	const { checkAuth } = useAuth()


	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">TEAM3</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<button className="nav-link" onClick={() => nav('/login')} >{checkAuth ? '로그인' : '로그아웃'}</button>
						</li>
						<li className="nav-item">
							<button className="nav-link" onClick={()=>nav('/signup')}>회원가입</button>
						</li>
						{/* <li className="nav-item">
							<a className="nav-link" href="./user/user_view.html">회원정보</a>
						</li> */}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Nav