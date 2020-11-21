import { GetStaticProps } from 'next'
import Head from 'next/head'

type OrgData = {
	name: string
	location: string
	html_url: string
}

export default function Home({ org }) {

	return (
		<>
			<Head>
				<title>ProtoNext</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1>{org.name} - {org.location}</h1>

			<h3><a href={org.html_url} target="_blank">{org.html_url}</a></h3>
		</>
	)
}

// PAGINA QUE NÃO MUDA CONSTANTEMENTE (POST NO BLOG, PAGINA DE PRODUTO NO E-COMMERCE, POSTS)
export const getStaticProps: GetStaticProps = async () => {
	const response = await fetch('https://api.github.com/orgs/ancap-dev')
	const data: OrgData = await response.json()

	if (!data)
		return { notFound: true }

	return {
		props: {
			org: data
		},
		revalidate: 10
	}
}