import React, { useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
 
    const ingreso = { email, password };
    console.log(ingreso);
    const response = await axios.post(`/api/usuario/login`, ingreso);
    
	

	const mensaje = response.data.mensaje;
    
	console.log (mensaje);

	
    if (mensaje === "Bienvenido") {
      
		const token = response.data.token;
        localStorage.setItem("Token", token);
        window.location.href = "/index";
		
		
    }else{	
		Swal.fire({
			text: "Usuario o contraseña incorrectas..",
			icon: "error",
		  });
    }
  };

  return (
    <div>
      <main className="d-flex w-100">
        <div className="container d-flex flex-column">
          <div className="row vh-100">
            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="text-center mt-4">
                  <h1 className="h2">Welcome back!!</h1>
                  <p className="lead">Sign in to your account to continue</p>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="m-sm-3">
                      <form>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            className="form-control form-control-lg"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
							required 
                              onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input
                            className="form-control form-control-lg"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
							required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div>
                          <div className="form-check align-items-center">
                            <input
                              id="customControlInline"
                              type="checkbox"
                              className="form-check-input"
                              value="remember-me"
                              name="remember-me"
                              checked
                            />
                            <label
                              className="form-check-label text-small"
                              for="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                         
						  <button class="btn btn-lg btn-primary"  onClick={handleLogin}>
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="text-center mb-3">
                  Don't have an account? <a href="/register">Sign up</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
