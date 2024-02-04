import React from "react";

const Error404 = () => {
  return (
    <div>
      <main class="d-flex w-100">
        <div class="container d-flex flex-column">
          <div class="row vh-100">
            <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
              <div class="d-table-cell align-middle">
                <div class="text-center mt-4">
                  <h1 class="h2">Error 404!</h1>
                  <p class="lead">Page Not Found</p>
                </div>

                <div class="card">
                  <div class="card-body">
                    <div class="m-sm-3">
                      <img
                        src="img/photos/error-404-2b.jpg"
                        width="550"
                        height="550"
                        alt="Error 404"
                      />
                    </div>
                  </div>
                </div>
                <div class="text-center mb-3">
                  back to <a href="/index">Index Page</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Error404;
