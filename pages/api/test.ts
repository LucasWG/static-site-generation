// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	test: boolean
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {

	return res.status(200).json({ test: true })
}
