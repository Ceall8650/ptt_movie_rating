import * as cheerio from 'cheerio';
import { NextRequest, NextResponse } from 'next/server'

function getMaxPageNumber(domString: string):number {
  const $ = cheerio.load(domString)
  const DEFAULT_PAGE_NUMBER = 0
  
  // First link represents the link redirect the to page has the oldest discussion
  const oldestDiscussionLink = $('.btn-group-paging').find('a').attr('href');

  if(!oldestDiscussionLink) {
    return DEFAULT_PAGE_NUMBER
  }

  const pageParam = oldestDiscussionLink
    .split('?')[1]
    .split('&')
    .find(item => item.includes('page'))
  
  if(!pageParam) {
    return DEFAULT_PAGE_NUMBER
  }

  return Number(pageParam.split('=')[1]) || DEFAULT_PAGE_NUMBER
}

async function handleFetch(url: string):Promise<string> {
  const res = await fetch(url);
  return await res.text()
}

async function getAllDiscussion(maxPageNumber:number, keyword:string) {
  const urlList = []

  for(let i=1;i<=maxPageNumber;i++){
    urlList.push(handleFetch(`https://www.ptt.cc/bbs/movie/search?page=${i}&q=${keyword}`))
  }

  const allRes = await Promise.all(urlList)
  const data = allRes.map((res) => {
    const $ = cheerio.load(res)
    const items = $('.r-ent')

    return items
      .map((key, item) => {
        let nrec = $(item).find('.nrec').text().trim();
        let convertedNrec = Number(nrec)

        if(Number.isNaN(convertedNrec)) {
          if(nrec === '爆') {
            convertedNrec = 100
          } else if(/X.*/.test(nrec)){
            const [_, times] = nrec.split('X') 

            convertedNrec = -(Number(times)*10 )
          } else {
            convertedNrec = 0
          }
        }

        return {
          category: $(item).find('.title').text().match(/(\[［)(.*?)(\]］)/g), 
          nrec: convertedNrec,
          title: $(item).find('.title').text().trim(),
          author: $(item).find('.author').text().trim(),
          date: $(item).find('.date').text(),
          link: "https://www.ptt.cc" + $(item).find('.title a')?.attr('href')?.trim(),
        }
      })
      .get()
      .filter(item => !(/Re:/.test(item.title)))
  })

  return data.reduce((sum, elem) => sum.concat(elem), [])
}


export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const movie = params.get('movie');

  if(!movie) {
    return NextResponse
      .json({
        message: "The movie name is required"
      }, {
        status: 400,
      })
  }

  const encodedKeyword = encodeURIComponent(movie)
  const DOM = await handleFetch(`https://www.ptt.cc/bbs/movie/search?page=1&q=${encodedKeyword}`)
  const maxPageNumber = getMaxPageNumber(DOM)
  const allDiscussions = await getAllDiscussion(maxPageNumber, movie)

  return NextResponse.json({
    data: allDiscussions
  })

}
