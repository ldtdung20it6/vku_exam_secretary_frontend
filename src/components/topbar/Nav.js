import React, { Fragment } from "react";
import XLSX from 'xlsx';
import { Link } from "react-router-dom";

function Nav(){
    return(
        <Fragment>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                  {/* Nav Item - User Information */}
                  <li className="nav-item dropdown no-arrow">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                        Lê Diên Trung Dũng
                      </span>
                      <img
                        className="img-profile rounded-circle"
                        src="ASSETS/img/undraw_profile.svg"
                      />
                    </a>
                    {/* Dropdown - User Information */}
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <Link className="dropdown-item" to="/profile">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Trang cá nhân
                      </Link>
                      <div className="dropdown-divider" />
                      <a
                        className="dropdown-item"
                        href="#"
                        data-toggle="modal"
                        data-target="#logoutModal"
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
              {/* Logout Modal */}
<div
  className="modal fade"
  id="logoutModal"
  tabIndex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Ready to Leave?
        </h5>
        <button
          className="close"
          type="button"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        Select "Logout" below if you are ready to end your current
        session.
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-secondary"
          type="button"
          data-dismiss="modal"
        >
          Cancel
        </button>
        <Link className="btn btn-primary" to="/login">
          Logout
        </Link>
      </div>
    </div>
  </div>
</div>
        </Fragment>
    )
}

export default Nav;