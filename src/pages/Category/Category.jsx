import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setCategory } from '../../store/slices/categorySlice';

function Category() {

    const { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCategory(slug ? slug : "All"));
    }, [slug, dispatch]);
  return (
    <div>
      
    </div>
  )
}

export default Category
