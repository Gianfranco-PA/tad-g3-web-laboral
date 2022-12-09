import PrincipalLayout from 'src/common/components/layouts/principal'
import styles from 'src/common/styles/buscar.module.css'
import { useFetch } from '../hook/useFetch'
export default function Buscar() {
  // const{data} = useFetch('http://localhost:3000/api/oferta')
  // console.log(data[0])
  // const{titulo, descripcion} = data[0]

  return (
    <div className={styles.cuerpo}>
      <section className={styles.layout}>
        <div className={styles.leftSide}>Lateral Izquierdo</div>
        <div className={styles.body}>
          <section className={styles.cuerpo_medio}>
            <div className="card">
              {/* <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">
                  {descripcion}
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div> */}
            </div>
          </section>
        </div>
        <div className={styles.rightSide}>Lateral Derecho</div>
        <div className={styles.footer}>Footer</div>
      </section>
    </div>
  )
}
