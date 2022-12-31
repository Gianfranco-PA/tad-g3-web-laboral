export const Footer = () => {
  return (
    <div className="container-fluid bg-light bg-opacity-75">
      <footer className="page-footer font-small blue ">
        <div className="container-fluid text-center text-md-left py-4">
          <div className="row">
            <div className="col-md-4 mt-md-0 ">
              <h5 className="text-uppercase">Nuestras redes</h5>
              <ul className="list-unstyled">
                <li>Facebook</li>
                <li>Instagrams</li>
                <li>Gmail</li>
                <li>Linkedin</li>
              </ul>
            </div>
            <hr className="clearfix w-100 d-md-none " />
            <div className="col-md-4 mb-md-0 ">
              <h5 className="text-uppercase">Institucional</h5>
              <ul className="list-unstyled">
                <li>¿Quiénes somos?</li>
                <li>Contacto para personas</li>
                <li>UNITJob en otros países</li>
                <li>Aviso legal y privacidad</li>
              </ul>
            </div>
            <div className="col-md-4 mb-md-0 ">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled">
                <li>
                  <a href="#!">Link 1</a>
                </li>
                <li>
                  <a href="#!">Link 2</a>
                </li>
                <li>
                  <a href="#!">Link 3</a>
                </li>
                <li>
                  <a href="#!">Link 4</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center pb-4">
          © 2022 Copyright: Grupo3
        </div>
      </footer>
    </div>
  )
}
