"use client";
import Image from "helpers/image";
import Link from "helpers/Link";
import { useDispatch } from 'react-redux';
import React from "react";

const ImageUrl = ({ img, className, objectClass, item }) => {
	function handleGetUrl(item) {
        const dispatch = useDispatch();
        let updatedUrl = item.url.replace(/https?:\/\/www\.clearance\.ae\/?/g, "/");
        if (updatedUrl.includes("www.clearance.ae")) {
            updatedUrl = item.url.replace("www.clearance.ae", "/");
        }
        if (item.resource_type === "brand") {
            dispatch({type:"RESET_CATEGORY"});
            updatedUrl = `/products/brands=${item.resource_id}`;
        }
        if (item.resource_type === "flash_deals") {
            updatedUrl = `/all-flash-deals`;
        }
        if (item.resource_type === "product") {
            updatedUrl = `/product/${item.resource_slug}`;
        }
        if (item.resource_type === "search") {
            // dispatch({type:"RESET_BRANDS"});
            dispatch({type:"RESET_CATEGORY"});
            updatedUrl = `/products/search_text=${item.search_keyword}`;
        }
        if (item.resource_type === "category") {
            // dispatch({type:"RESET_BRANDS"});
            updatedUrl = `/products/category=${item.resource_slug}`;
        }
        return updatedUrl;
    }
    return (
        <Link
            href={handleGetUrl(item)}
            className={`relative bg-gray-100 ${className} aspect-video`}
        >
            <Image
                src={img}
                alt="image"
                fill
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-contain ${objectClass}`}
            />
        </Link>
    );
}
export default ImageUrl;
