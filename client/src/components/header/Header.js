import React from 'react';


function Header() {
    return (
      <div>
            <Banner />
            <div className="row">
                <div className="col justify-content-md-center">hello</div>
                <div className="col justify-content-md-center">hello</div>
                <div className="col justify-content-md-center">hello</div>
            </div>
      </div>
    );
}


function Banner() {
    return(
        <div className="banner"></div>
    )
}

export default Header;