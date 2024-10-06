import React, { Fragment } from "react";
import XLSX from 'xlsx';
import { Link } from "react-router-dom";

function Sidebar(){
    return(
        <Fragment>
            {/* Sidebar */}
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            {/* Sidebar - Brand */}
           
            <Link
              className="sidebar-brand d-flex align-items-center justify-content-center"
              to="/"
            >
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink"></i>
              </div>
              <div className="sidebar-brand-text mx-3">Admin</div>
            </Link>

            {/* Divider */}
            <hr className="sidebar-divider my-0" />

            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Trang chủ</span>
              </Link>
            </li>

            {/* Nav Item - Quản lý thư ký thi Dropdown */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#manageExamSecretary"
                aria-expanded="true"
                aria-controls="manageExamSecretary"
              >
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Quản lý thư ký thi</span>
              </a>
              <div
                id="manageExamSecretary"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  { <Link className="collapse-item" to="/exam-schedule-management">
                    Quản lý lịch thi
                  </Link> }
                  <Link className="collapse-item" to="/exam-secretary-management">
                    Quản lý thư ký thi
                  </Link>
                </div>
              </div>
            </li>

            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />

            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
              <button
                className="rounded-circle border-0"
                id="sidebarToggle"
              />
            </div>
          </ul>
          {/* End of Sidebar */}
        </Fragment>
    )
}

export default Sidebar;