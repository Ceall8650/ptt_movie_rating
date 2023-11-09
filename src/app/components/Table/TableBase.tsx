import { useState, useEffect, useCallback, useMemo } from 'react';
import { sortByProperty } from 'common/utilities';
import SORTING_ORDER from 'enums/SortingOrder';

type Props = {
  headers: Header[],
  body: Row[],
  isSticky?: boolean,
  defaultSorting?: DefaultSorting
  getCell?: (row:Row, headId: string) => string|JSX.Element,
  getColGroup?: Function,
}

function TableBase({ 
  headers,
  body,
  isSticky=false,
  defaultSorting,
  getCell,
  getColGroup,
}: Props) {
  const [extendedBody, setExtendedBody] = useState<Row[]>([])
  const extendedHeaders = useMemo(() => {
    return headers.map(header => ({
      ...header,
      sorting: SORTING_ORDER.NONE
    }))
  }, [headers])
  const sort = useCallback((index:number, sorting?: string) => {
    const sortingHeader = extendedHeaders[index];

    if(sortingHeader) {
      const newSorting = sorting ||
         sortingHeader.sorting === SORTING_ORDER.ASC 
          ? SORTING_ORDER.DESC
          : SORTING_ORDER.ASC

      // Update head to sort by
      sortingHeader.sorting = newSorting

      // Reset other heads
      extendedHeaders.forEach((header, headerIndex) => {
        if(headerIndex !== index) {
          header.sorting = SORTING_ORDER.NONE
        }
      })

      setExtendedBody(prev => {
        return sortByProperty(prev, sortingHeader.id ,newSorting)
      })
    }
  }, [extendedHeaders])

  function handleSort(header: Header, index: number) {
    if(header.sortable) {
      sort(index)
    }
  }

  function getSortingIcon(storing:string):JSX.Element {
    let className = ''

    switch (storing) {
      case SORTING_ORDER.ASC:
        className = 'icon-sorting-asc'
        break;
      case SORTING_ORDER.DESC:
        className = 'icon-sorting-desc'
        break;
      default:
        className = 'icon-sorting'
    }

    return (
      <i 
        className={`text-xl cursor-pointer ${className}`}
        aria-hidden="true" 
      />
    )
  }

  useEffect(() => {
    setExtendedBody(() => {
      return body.map(row => ({ ...row }))
    })

    if(defaultSorting) {
      const sorting = defaultSorting.desc ? SORTING_ORDER.DESC : SORTING_ORDER.ASC
      const index = extendedHeaders.findIndex(header => header.id === defaultSorting.headerId);

      sort(index, sorting)
    }
  }, [body, defaultSorting, extendedHeaders, sort])

  return (
    <div className={isSticky ? 'table-sticky' : undefined}>
      {
        extendedBody.length
        ? <table>
            { getColGroup && getColGroup() }
            <thead className="text-left">
              <tr>
                {
                  extendedHeaders.map((header, index) =>
                    <th
                      key={header.id}
                      onClick={() => handleSort(header, index)}
                    >
                      <div className='flex items-center'>
                        {header.name}
                        {
                          header.sortable && getSortingIcon(header.sorting)
                        }
                      </div>
                    </th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                extendedBody.map((row, index) => (
                  <tr key={index}>
                    {
                      extendedHeaders.map((header) => (
                        <td key={`${header.id}_${index}`}>
                          { (getCell && getCell(row, header.id)) || row[header.id]}
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        : <div className="text-center">無資料</div>

      }
    </div>
  )
}

export default TableBase
