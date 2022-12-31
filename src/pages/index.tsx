import Image from 'next/image'
import { Footer } from 'src/common/components/footer/footer'
import styles from 'src/common/styles/finicio.module.css'

const check = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-check-lg"
    viewBox="0 0 16 16"
  >
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
  </svg>
)

export default function Inicio({}) {
  return (
    <div className="container-fluid ">
      <div className="container-fluid py-5 ">
        <div
          className="overlay "
          style={{ width: '100%', height: '600px', position: 'relative' }}
        >
          <Image
            src="/imagenes/bussi.jpg"
            layout="fill"
            className={styles.cabecera}
            alt="No se encontro la imagen chamo"
          />
          <div className={styles.centrado}>
            <h1 className="text-center">Bienvenido a UNITJob</h1>
            <h2 className="text-center">
              La pagina para encontrar tu primer trabajo{' '}
            </h2>
          </div>
        </div>
      </div>
      {/*este es el container principal */}
      <div className="container-fluid py-5 bg-primary bg-opacity-25">
        <h2 className="text-center">
          Si buscas trabajo UNITJob es tu mejor aliado!
        </h2>
        <h5 className="text-center">
          Miles de ofertas de empleo están esperándote{' '}
        </h5>
        <div className="row py-4">
          <div className="col-2"></div>
          <div
            className="container-fluid col-4 justify-content-end "
            style={{ width: '20%', height: '300px', position: 'relative' }}
          >
            <Image
              src="/imagenes/traba.png"
              layout="fill"
              alt="No se encontro la imagen chamo"
            />
          </div>
          <div className="container-fluid col-6 ">
            <div>{check}Te ayudamos a encontrar un empleo mejor</div>
            <div>
              {check}Haz que tu currículum sea visible para miles de empresas en
              nuestra bolsa de trabajo
            </div>
            <div>
              {check}Registro gratuito. Encuentra tu próximo trabajo hoy.
            </div>
            <div>
              {check}Ofertas cada día. Empleos que se ajustan a tu perfil.
            </div>
            <div>
              {check}Alertas personalizadas. Tú crea alertas de empleo y
              nosotros te avisaremos
            </div>
            <div>
              {check}Completa tu perfil. Muéstrate profesional y ganarás
              visibilidad.
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid my-5"></div>
      <div>
        <div className="container-fluid col-9 ">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleSlidesOnly"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleSlidesOnly"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleSlidesOnly"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner  ">
              <div
                className="carousel-item active"
                style={{ width: '100%', height: '550px', position: 'relative' }}
              >
                <Image
                  src="/imagenes/car1.jpg"
                  className={styles.cabecera}
                  layout="fill"
                  alt="No se encontro la imagen chamo"
                />
                <div className={styles.centrado}>
                  <h2 className="text-center">MISIÓN</h2>
                  <p className="text-center h6">
                    Somos una empresa de servicios de consultoría especializada
                    en la optimización de los procesos operativos, que vincula
                    todas las propuestas de mejora a una reducción de los costes
                    fijos asociados, con la máxima capacitación de las personas
                    que los desarrollan, con absoluta orientación a la
                    satisfacción de los clientes y un compromiso de mejora
                    continua de su rentabilidad.
                  </p>
                </div>
              </div>
              <div
                className="carousel-item "
                style={{ width: '100%', height: '550px', position: 'relative' }}
              >
                <Image
                  src="/imagenes/car2.jpg"
                  className={styles.cabecera}
                  layout="fill"
                  alt="No se encontro la imagen chamo"
                />
                <div className={styles.centrado}>
                  <h2 className="text-center h2">VISIÓN</h2>
                  <p className="text-center h6">
                    Ser considerada como la primera consultora líder en las
                    Comunidades en las que opera por su aportación a la Mejora
                    en la Eficacia y Eficiencia de los procesos que optimiza,
                    así como por el Compromiso y la Capacitación del las
                    personas que la integran.
                  </p>
                </div>
              </div>
              <div
                className="carousel-item  "
                style={{ width: '100%', height: '550px', position: 'relative' }}
              >
                <Image
                  src="/imagenes/car3.jpg"
                  className={styles.cabecera}
                  layout="fill"
                  alt="No se encontro la imagen chamo"
                />
                <div className={styles.centrado}>
                  <h2 className="text-center">VALORES</h2>
                  <p className="text-center h6">
                    Seremos reconocidos por nuestra valía profesional, por
                    nuestro compromiso con el Cliente y nuestra orientación a
                    sus expectativas. Trabajaremos en equipo reforzando y
                    apoyando cada individualidad, haciendo del desarrollo
                    profesional y personal de cada uno de nosotros, el éxito de
                    todos. Estaremos dispuestos a incorporar toda innovación que
                    surja en cualquiera de las áreas que desarrollamos,
                    estableciendo cuantas alianzas sean necesarias para ello.
                    Aplicaremos los principios básicos de Honestidad,
                    Confidencialidad y Buen Hacer, a todos y cada uno de
                    nuestros actos.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid my-5"></div>

      <div className="container-fluid py-5 bg-primary bg-opacity-25">
        <div className="row justify-content-center ">
          <h2 className="text-center col-8">
            Publica tus ofertas en el portal de empleo con mayor audiencia en
            Latinoamérica
          </h2>
        </div>
        <div className="container-fluid py-4 ">
          <div className="row justify-content-center">
            <div className="col-3 py-4">
              <h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-lightning-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z" />
                </svg>{' '}
                Publica tu vacante
              </h5>
              <div>
                Crea fácilmente tu oferta de trabajo y publícala en un click.
              </div>
            </div>
            <div className="col-3 py-4">
              <h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>{' '}
                Revisa las postulaciones
              </h5>
              <div>
                Selecciona a los mejores candidatos entre todos los CVs
                recibidos.
              </div>
            </div>
            <div className="col-3 py-4">
              <h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-star"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>{' '}
                Contrata
              </h5>
              <div>
                Encuentra al candidato que mejor se adapta al perfil buscado.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Aqui ira lo que es el footer */}
      <Footer />
    </div>
  )
}
