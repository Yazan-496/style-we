"use client"

import React, { useRef, useState} from "react"
import InfiniteScroll from "react-infinite-scroller"
import FeatureProduct from "components/Pages/HomePage/FeatureProduct"
import {LoadMoreFeaturedProducts} from "helpers/actions/fetchServer"
import LoadingComponent from 'components/LoadingComponent/desktop';


export default function LoadFeatureProducts({initialItems}) {
    const fetching = useRef(false)
    const [pages, setPages] = useState([initialItems])
    const [hasMore, setHasMore] = useState(true)
    const items = pages.flatMap((page) => page)

    const delay = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms))

    const loadMore = async (page) => {
        if (!fetching.current) {
            try {
                fetching.current = true
                // await delay(2000)
                const fetchedFeature = await LoadMoreFeaturedProducts(page)
                // console.log(fetchedFeature, "fetchedFeature")
                if (fetchedFeature.length === 0) {
                    setHasMore(false)
                }
                setPages((prev) => [...prev, fetchedFeature])
            } finally {
                fetching.current = false
            }
        }
    }

    return (
        <InfiniteScroll
            hasMore={hasMore}
            pageStart={2}
            loadMore={loadMore}
            loader={
                <LoadingComponent/>
            }
            element="main"
        >
            <FeatureProduct
                featureProductArr={items}
                titleAe='منتج مميز'
                titleEn='Feature Product'
            />
        </InfiniteScroll>
    )
}
