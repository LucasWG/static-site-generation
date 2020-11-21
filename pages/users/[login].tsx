import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Users({ user }) {
	const { isFallback } = useRouter()

	if (isFallback)
		return <p>Carregando...</p>

	return (
		<>
			{user.avatar_url ? (
				<>
					<Image src={user.avatar_url} width="400" height="400" alt={user.name} />
					<h1>{user.name}</h1>
					<p>{user.bio}</p>
				</>
			) : (
					<h1>API rate limit exceeded</h1>
				)}
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch(`https://api.github.com/orgs/rocketseat/members`)
	const data = await response.json()

	if (!Array.isArray(data)) {
		return {
			paths: [],
			fallback: true
		}
	}

	const paths = data.map(member => {
		return { params: { login: member.login } }
	})

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { login } = context.params
	const response = await fetch(`https://api.github.com/users/${login}`)
	const data = await response.json()

	if (!data)
		return { notFound: true }

	return {
		props: {
			user: data
		},
		revalidate: 60
	}
}