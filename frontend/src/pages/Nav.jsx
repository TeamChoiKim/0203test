import { useNavigate } from "react-router"
import { useAuth } from "@hooks/AuthProvider.jsx"

const Nav = () => {

	const nav = useNavigate()
	const { isLogin, clearAuth } = useAuth()


	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">TEAM2</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{
							!isLogin &&
							<>
								<li className="nav-item">
									<button type="button" className="nav-link" onClick={() => nav("/login")}>로그인</button>
								</li>
								<li className="nav-item">
									<button type="button" className="nav-link" onClick={() => nav("/signup")}>회원가입</button>
								</li>
							</>
						}
						{
							isLogin &&
							<>
								<li className="nav-item">
									<button type="button" className="nav-link" onClick={() => clearAuth()} >로그아웃</button>
								</li>
								<li className="nav-item">
									<button type="button" className="nav-link" onClick={() => nav("/userview")}>회원정보</button>
								</li>
							</>
						}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Nav