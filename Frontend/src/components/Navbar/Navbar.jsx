import "./Navbar.css"
import { HomeIcon, ListTodoIcon, TrophyIcon, CodeIcon, GearIcon, BookOpenIcon } from "./Icons"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">Pulse</Link>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <HomeIcon />
            <span>Home</span>
          </Link>
          <Link to="/tasks" className="nav-link">
            <ListTodoIcon />
            <span>Tasks</span>
          </Link>
          <Link to="/contests" className="nav-link">
            <TrophyIcon />
            <span>Contests</span>
          </Link>
          <Link to="/hackathons" className="nav-link">
            <CodeIcon />
            <span>Hackathons</span>
          </Link>
          <Link to="/revision" className="nav-link">
            <BookOpenIcon />
            <span>Revision</span>
          </Link>
          <Link to="/settings" className="nav-link">
            <GearIcon />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
