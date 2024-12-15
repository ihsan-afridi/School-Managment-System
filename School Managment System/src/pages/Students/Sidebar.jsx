import { Link } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaClipboardList,
  FaBullhorn,
  FaCalendarAlt,
  FaUserShield,
  FaBars,
  FaUserGraduate,
} from "react-icons/fa";
// import { GrDocumentPerformance } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePayment } from "react-icons/md";
import "./SidebarModule.css";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`sidebar-container ${
          isOpen ? "open" : "closed"
        } d-flex flex-column flex-shrink-0 p-3 text-bg-dark`}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <FaUserShield className="bi pe-none me-2" size={40} />
          <span className="fs-4">Student</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/student/dashboard" className="nav-link">
              <FaHome className="bi pe-none icon-margin-right" />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/student/exams" className="nav-link" exact>
              <FaBook className="bi pe-none icon-margin-right" />
              Exams
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/student/students" className="nav-link" exact>
              <FaUserGraduate className="bi pe-none icon-margin-right" />
              Students
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/student/attendance" className="nav-link" exact>
              <FaClipboardList className="bi pe-none icon-margin-right" />
              Attendance
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/student/communication" className="nav-link" exact>
              <FaBullhorn className="bi pe-none icon-margin-right" />
              Notice Board
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/student/fee" className="nav-link" exact>
              <MdOutlinePayment className="bi pe-none icon-margin-right" />
              Fee Management
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/student/event" className="nav-link" exact>
              <FaCalendarAlt className="bi pe-none icon-margin-right" />
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/student/profile" className="nav-link" exact>
              <CgProfile className="bi pe-none icon-margin-right" />
              Profile
            </Link>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
      <FaBars className="sidebar-toggle" size={30} onClick={toggleSidebar} />
    </>
  );
};

export default Sidebar;
