export const HomePageContent = () => (
  <div>
    <section className="mt-16">
      <h2 className="mb-4 text-2xl font-bold text-neutral-300">One builder, every day, forever</h2>
      <div>
        <p className="my-4">
          Polkadot Builders is a community owned DAO, making a positive impact in the Polkadot
          ecosystem by funding the creation of public goods and proliferating Nounish culture. From
          designers, to developers, to marketers, anyone can be a builder.
        </p>
        <p className="my-4">
          Every 24h, a Crest NFT is auctioned to the highest bidder, this is the entry to the DAO.
          All funds are sent to the DAO treasury, to be distributed back to builders creating Open
          Source software for the Polkadot Ecosystem.
        </p>
      </div>
    </section>
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold text-neutral-300">wtf?</h2>
      <div>
        <p className="my-4">
          We believe there are a lot of skilled people in the ecosystem that WANT to build, but
          don’t know WHAT to build, or have a team to work with. Polkadot Builders is an
          experimental attempt to bring together creative minds regardless of their skills /
          professions to create public goods.
        </p>
        <p className="my-4">
          <a className="underline hover:text-neutral-300" href="https://nouns.wtf">
            Nouns
          </a>{" "}
          have done an amazing job at bootstrapping culture, community and governance to create one
          of the most well known web3 brands. The noggles in the crest are a tip to the Nouns and
          Lil-Nouns communities, a way to bring the eyes in Polkadot to amazing projects like Nouns
          and as a reminder to create, try, iterate and be nounish.
        </p>
      </div>
    </section>
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold text-neutral-300">Summary</h2>
      <div>
        <ul className="list-disc pl-5">
          <li>All Crest NFT holders are members of Polkadot Builders DAO.</li>
          <li>One Crest is equal to one vote.</li>
          <li>One Crest is trustlessly auctioned every 24 hours, forever.</li>
          <li>100% of crest auction proceeds are trustlessly sent to the treasury.</li>
          <li>Settlement of one auction kicks off the next.</li>
          <li>No explicit rules exist for attribute scarcity; all Crests are equally rare.</li>
          <li>
            Founders received the first six Crest NFTs and rewards in the form of Crests (10% of
            supply for first 2000 crests).
          </li>
          <li>
            The treasury will be controlled exclusively by Polkadot Builders via{" "}
            <a
              className="underline hover:text-neutral-300"
              href="https://www.tally.xyz/gov/polkadot-builders"
            >
              governance
            </a>
          </li>
          <li>Artwork is generative and stored directly on-chain (no IPFS involved).</li>
          <li>
            Polkadot Builders artwork is in the{" "}
            <a
              className="underline hover:text-neutral-300"
              href="https://creativecommons.org/publicdomain/zero/1.0/"
            >
              public domain.
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
)
