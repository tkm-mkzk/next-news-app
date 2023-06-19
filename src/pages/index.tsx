import Head from 'next/head'
import MainLayout from '@/layouts'
import styles from '@/styles/Home.module.scss'
import Article from '@/components/article'
import Nav from '@/components/nav'
import WeatherNews from '@/components/weather-news'
import PickupArticle from '@/components/pickup-article'

// test

type HomeProps = {
  topArticles: any
  weatherNews: any
  pickupArticles: any
}

export default function Home(props: HomeProps) {
  console.log(props.topArticles)
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main}>
          <Article title="headlines" articles={props.topArticles} />
        </div>
        <div className={styles.aside}>
          <WeatherNews weatherNews={props.weatherNews} />
          <PickupArticle articles={props.pickupArticles} />
        </div>
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

  // OpenWeatherMapの天気の情報を取得
  const lat = 35.4122
  const lon = 139.413
  const exclude = 'hourly,minutely'
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  )
  const weatherJson = await weatherRes.json()
  const weatherNews = weatherJson

  // NewsAPIのピックアップ記事の情報を取得
  const keyword = 'software' // キーワードで検索(ソフトウェア)
  const sortBy = 'popularity' // 表示順位(人気順)
  const pickupPageSize = 5 // ページサイズ(5)
  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&language=jp&sortBy=${sortBy}&pageSize=${pickupPageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  )
  const pickupJson = await pickupRes.json()
  const pickupArticles = pickupJson?.articles

  return {
    props: {
      topArticles,
      weatherNews,
      pickupArticles,
    },
    revalidate: 60 * 10,
  }
}
