import TableBase from 'components/Table/TableBase';
import REVIEW_TABLE_HEADER_ID from 'enums/ReviewTableHeaderId';

type Props = {
  headers: Header[],
  body: Row[],
  defaultSorting?: DefaultSorting,
}

function ReviewTable({ headers, body, defaultSorting }: Props) {
  function getCell(row:Row, headerId:string) {
    switch (headerId) {
      case REVIEW_TABLE_HEADER_ID.RECOMMENDED_COUNTS: 
        const recommendedCounts = row[headerId]
        if(recommendedCounts >= 100 ) {
          return <div className='text-red-600 text-right'>爆</div>
        } else if(recommendedCounts >= 10) {
          return <div className='text-yellow-400 text-right'>{recommendedCounts}</div>
        } else if (recommendedCounts < 0) {
          const times = Math.abs(recommendedCounts / 10);
          return <div className='text-gray-400 text-right'>{`X${times}`}</div>
        } else {
          return <div className='text-green-400 text-right'>{recommendedCounts}</div>
        }
      case REVIEW_TABLE_HEADER_ID.TITLE:
        return (
          <a
            href={row.link}
            target="_blank"
            rel="external noopener noreferrer"
            className='link'
          >
            {row[headerId]}
          </a>
        )
  
      default:
        return row[headerId]
    }
  }

  function getColGroup() {
    return (
      <colgroup>
        <col className='w-[1%]' /> 
      </colgroup>
    )
  }

  return (
    <TableBase
      defaultSorting={defaultSorting}
      headers={headers}
      body={body}
      getCell={getCell}
      getColGroup={getColGroup}
      isSticky
    />
  )
}

export default ReviewTable
