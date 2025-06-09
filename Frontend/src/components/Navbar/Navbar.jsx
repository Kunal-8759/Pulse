import "./Navbar.css"
import { HomeIcon, ListTodoIcon, TrophyIcon, CodeIcon, GearIcon, BookOpenIcon } from "./Icons"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <NavLink to="/">Pulse</NavLink>
        </div>
        <div className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <HomeIcon />
            <span>Home</span>
          </NavLink>
          <NavLink 
            to="/tasks" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <ListTodoIcon />
            <span>Tasks</span>
          </NavLink>
          <NavLink 
            to="/contests" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <TrophyIcon />
            <span>Contests</span>
          </NavLink>
          <NavLink 
            to="/hackathons" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <CodeIcon />
            <span>Hackathons</span>
          </NavLink>
          <NavLink 
            to="/revision" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <BookOpenIcon />
            <span>Revision</span>
          </NavLink>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <GearIcon />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar