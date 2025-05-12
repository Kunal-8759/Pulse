import "./Navbar.css"
import { HomeIcon, ListTodoIcon, TrophyIcon, CodeIcon, GearIcon, BookOpenIcon } from "./Icons"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <a href="/">Pulse</a>
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link">
            <HomeIcon />
            <span>Home</span>
          </a>
          <a href="/tasks" className="nav-link">
            <ListTodoIcon />
            <span>Tasks</span>
          </a>
          <a href="/contests" className="nav-link">
            <TrophyIcon />
            <span>Contests</span>
          </a>
          <a href="/hackathons" className="nav-link">
            <CodeIcon />
            <span>Hackathons</span>
          </a>
          <a href="/revision" className="nav-link">
            <BookOpenIcon />
            <span>Revision</span>
          </a>
          <a href="/settings" className="nav-link">
            <GearIcon />
            <span>Settings</span>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
