import styles from "./page.module.css"
import Image from "next/image"

export default function Home() {
  return (
    <div>
      <section className={styles.hero}>
        <h1>Um Sushi</h1>
        <p>Descubra nossos deliciosos sushis artesanais preparados com os melhores ingredientes.</p>
      </section>
      <section className={styles.featured}>
        <Image
          src="/um-sushi-fachada.png"
          alt="Fachada do restaurante Um Sushi"
          width={1920}     
          height={1080}
          priority
          className={styles.featuredImage}
        />
      </section>
    </div>
  )
}
