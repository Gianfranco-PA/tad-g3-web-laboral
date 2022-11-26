import PrincipalLayout from 'src/common/components/layouts/principal'
import styles from 'src/common/styles/buscar.module.css'

export default function Buscar() {
  return (
    <div className={styles.cuerpo}>
      <section className={styles.layout}>
        <div className={styles.leftSide}>Lateral Izquierdo</div>
        <div className={styles.body}>
          <section className={styles.cuerpo_medio}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </section>
        </div>
        <div className={styles.rightSide}>Lateral Derecho</div>
        <div className={styles.footer}>Footer</div>
      </section>
    </div>
  )
}
