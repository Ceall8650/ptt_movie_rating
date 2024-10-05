import Pagination from 'app/Pagination';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { changePage } from 'store/slices/movieSlice';

function MovieFooter() {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(state => state.movie.currentPage)
  const totalPages = useAppSelector(state => state.movie.totalPages)

  return (
    <footer className="flex justify-center">
      <Pagination
        total={totalPages}
        className="w-[600px]"
        currentPage={currentPage}
        changePage={(page: number) => dispatch(changePage({ pageNumber: page }))}
      />
    </footer>
  )
}

export default MovieFooter
