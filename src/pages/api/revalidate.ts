import { NextApiResponse } from "next"
import { withAxiom } from "next-axiom"
import { AxiomAPIRequest } from "next-axiom/dist/withAxiom"

async function handler(req: AxiomAPIRequest, res: NextApiResponse) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  
    try {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      await res.revalidate('/businesses')
      return res.json({ revalidated: true })
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      req.log.error(String(err).toString());
      return res.status(500).send('Error revalidating')
    }
}

export default withAxiom(handler)
