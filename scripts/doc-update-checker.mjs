import Aigle from 'aigle'
import axios from 'axios'
import cheerio from 'cheerio'
import { differenceInWeeks as diff, sub } from 'date-fns'

const instance = axios.create({
    baseURL: 'https://docs.just-mining.com'
})

const checkPageUpdates = async (link) => {
    console.log(`💠 Checking ${link}...`)

    try {
        const { data } = await instance.get(link)
        const $ = cheerio.load(data)

        const $lastUpdate = $('div[class*=pageEditedDate]').text()

        if (!$lastUpdate) {
            console.log(`  ❗ Last update was not found on page`)

            return true
        }

        const matches = $lastUpdate.matchAll(/(?<num>\d+) ?(?<tempo>year(?:s)?|month(?:s)?|day(?:s)|hour(?:s)?|second(?:s)?)/g)

        for (const match of matches) {
            if (match.groups.num && match.groups.tempo) {
                const lastUpdate = sub(new Date(), {
                    [match.groups.tempo]: match.groups.num,
                })

                if (diff(new Date(), lastUpdate) < 6) {
                    console.log(`  🚩 Change detected`)
                }
            }
        }
    } catch (err) {
        console.log(`  ❌ An error occurred: ${err.message}`)

        return true
    }
}

const { data: rootHtml } = await instance.get()
const $root = cheerio.load(rootHtml)

const links = $root('div[class*=sidebarInner] a:not([href="/"])').map((i, el) => $root(el).attr('href')).toArray()
const hasUpdates = await Aigle.reduce(links, (acc, link) => checkPageUpdates(link) || acc, false)

if (hasUpdates) {
    process.exit(1)
}

console.log('-----\n🎉 Everything seems up-to-date!')
