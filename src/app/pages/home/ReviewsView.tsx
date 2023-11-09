'use client'

import { useCallback, useMemo } from 'react';
import REVIEW_RATING_TYPE from 'enums/ReviewRatingType';
import REVIEW_TABLE_HEADER_ID from 'enums/ReviewTableHeaderId';
import TabsPanel from 'components/Tabs/TabsPanel';
import LoadingAnimation from 'components/LoadingAnimation';
import ReviewTable from './ReviewTable';
import ReviewsRatings from './ReviewsRatings';

function ReviewsView() {
  const tabs = useMemo(() => {
    return [
      { id: REVIEW_RATING_TYPE.GOOD, label: "好評" },
      { id: REVIEW_RATING_TYPE.BAD, label: "負評" },
      { id: REVIEW_RATING_TYPE.NORMAL, label: "普評" },
      { id: REVIEW_RATING_TYPE.UNCATEGORISED, label: "不分類" },
    ]
  }, [])

  async function handleSearch(keyword:string) {
    try {

      // allReviews.forEach(review => {
      //   if(/好|爽|佳/.test(review.category?.join())) {
      //       setGoodReviews((prev) => {
      //         if(prev) {
      //           prev.push(review)
      //         } else {
      //           prev = [review]
      //         }
  
      //         return prev
      //       })
      //   } else if(/爛|負/.test(review.category?.join())) {
      //     setBadReviews((prev) => {
      //       if(prev) {
      //         prev.push(review)
      //       } else {
      //         prev = [review]
      //       }
  
      //       return prev
      //     })
      //   }
      //   else if(/普/.test(review.category?.join())) {
      //     setNormalReviews((prev) => {
      //       if(prev) {
      //         prev.push(review)
      //       } else {
      //         prev = [review]
      //       }
  
      //       return prev
      //     })
      //   }
      //   else {
      //     setUncategorisedReviews((prev) => {
      //       if(prev) {
      //         prev.push(review)
      //       } else {
      //         prev = [review]
      //       }
  
      //       return prev
      //     })
      //   }
      // });
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  // const getCurrentTab = useCallback((tabId:string) => {
  //   const tableHeaders = [
  //     { id: REVIEW_TABLE_HEADER_ID.RECOMMENDED_COUNTS, name: "推", sortable: true },
  //     { id: REVIEW_TABLE_HEADER_ID.TITLE, name: "文章標題", },
  //     { id: REVIEW_TABLE_HEADER_ID.AUTHOR, name: "作者", },
  //     { id: REVIEW_TABLE_HEADER_ID.DATE, name: "日期", sortable: true },
  //   ]
  //   const defaultSorting = { headerId: 'nrec', desc: true}
  //   const components: {[key:string]: JSX.Element} = {
  //     [REVIEW_RATING_TYPE.GOOD]: <ReviewTable headers={tableHeaders} defaultSorting={defaultSorting} body={goodReviews}/>,
  //     [REVIEW_RATING_TYPE.BAD]: <ReviewTable headers={tableHeaders} defaultSorting={defaultSorting} body={badReviews}/>,
  //     [REVIEW_RATING_TYPE.NORMAL]: <ReviewTable headers={tableHeaders} defaultSorting={defaultSorting} body={normalReviews}/>,
  //     [REVIEW_RATING_TYPE.UNCATEGORISED]: <ReviewTable headers={tableHeaders} defaultSorting={defaultSorting} body={uncategorisedReviews}/>,
  //   }

  //   return (
  //     components[tabId]
  //   )
  // }, [badReviews, goodReviews, normalReviews, uncategorisedReviews])

  // const getTabLabel = useCallback((tab: Tab):string => {
  //   switch (tab.id) {
  //     case REVIEW_RATING_TYPE.GOOD:
  //       return `${tab.label}(${goodReviews?.length || 0})`
  //     case REVIEW_RATING_TYPE.BAD:
  //       return `${tab.label}(${badReviews?.length || 0})`
  //     case REVIEW_RATING_TYPE.NORMAL:
  //       return `${tab.label}(${normalReviews?.length || 0})`
  //     case REVIEW_RATING_TYPE.UNCATEGORISED:
  //       return `${tab.label}(${uncategorisedReviews?.length || 0})`
  //     default:
  //       return tab.label
  //   }
  // }, [badReviews?.length, goodReviews?.length, normalReviews?.length, uncategorisedReviews?.length])

  return (
    <LoadingAnimation /> 
    // isLoading 
    // ? <LoadingAnimation /> 
    // : allReviews 
    //   && <>
    //       <ReviewsRatings 
    //         goodReviews={goodReviews}
    //         badReviews={badReviews}
    //         normalReviews={normalReviews}
    //         uncategorisedReviews={uncategorisedReviews}
    //       />
    //       <TabsPanel
    //         className="self-stretch flex-auto overflow-hidden"
    //         tabs={tabs}
    //         getCurrentTab={getCurrentTab} 
    //         getTabLabel={getTabLabel}
    //       />
    //     </> 
  )
}

export default ReviewsView
