import ChartBar from 'components/Chart/ChartBar';

type Props = {
  goodReviews: Review[]
  badReviews: Review[]
  normalReviews: Review[]
  uncategorisedReviews: Review[]
}

function ReviewsRatings({
  goodReviews,
  badReviews,
  normalReviews,
  uncategorisedReviews,
}: Props) {
  const options = {
    indexAxis: 'y' as const,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };
  const labels = ['Rating'];
  const data = {
    labels,
    datasets: [
      {
        label:"Good",
        data: [goodReviews.length],
        backgroundColor: ['#4caf50'],
      },
      {
        label: "Bad",
        data: [badReviews.length],
        backgroundColor: ['#ffc107'],
      },
      {
        label: "Normal",
        data: [normalReviews.length],
        backgroundColor: ['#f44336'],
      },
      {
        label: "Uncategorised",
        data: [uncategorisedReviews.length],
        backgroundColor: ['#b2b9e1'],
      },
    ],
  };

  const scoring = Math.round((goodReviews.length / (goodReviews.length + badReviews.length + normalReviews.length)) * 100)

  return (
    <div className='self-stretch flex justify-center items-center'>
      <div className='flex flex-col'>
        <span className='text-4xl'>{scoring}%</span>
        <span>Scoring</span>
      </div>
      <ChartBar
        options={options}
        data={data} 
      />
    </div>
  )
}

export default ReviewsRatings
