import Head from 'next/head'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Article from '../components/article'

export default function Home(props) {
  console.log(props.topArticles)
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
      <div className={styles.main}>
        <Article title="headlines" articles={props.topArticles} />
      </div>
    </MainLayout>
  )
}

export const getStaticProps = async () => {
  // NewsApiのトップ記事の情報を取得
  const pageSize = 10
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  )
  const topJson = await topRes.json()
  const topArticles = topJson?.articles

  return {
    props: {
      topArticles,
    },
    revalidate: 60 * 10,
  }
}
