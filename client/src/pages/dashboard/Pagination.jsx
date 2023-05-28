import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Pagination = (props) => {
    let { page, pageLimit, totalCount } = props
    page = parseInt(page)
    let active = parseInt(page)
    let location = useLocation()
    let startRecord = ""
    if (page !== 1) {
        startRecord = (page - 1) * pageLimit + 1
    } else {
        startRecord = page
    }

    let totalPage = Math.ceil(totalCount / pageLimit)

    var start, end;
    start = page - 2;
    end = page + 2;

    if (end > totalPage) {
        start -= (end - totalPage);
        end = totalPage;
    }
    if (start <= 0) {
        end += ((start - 1) * (-1));
        start = 1;
    }
    end = end > totalPage ? totalPage : end;
    // pagination
    const PaginationCount = () => {
        let content = [];
        for (let i = start; i <= end; i++) {
            if (true) {
                if (i === 1) {
                    content.push(<Link to={`${location.pathname}?page=${i}`} className={`
                    ${active===i && `bg-blue-400 text-white`}
                    relative z-10 cursor-pointer inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20`}key={i} > {i}</Link >
                    );
                } else {
                    content.push(<Link to={`${location.pathname}?page=${i}`} className={`
                    ${active===i && `bg-blue-400 text-white`}
                    relative z-10 cursor-pointer inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20`}key={i} > {i}</Link >
                    );
                }
            }
        }
        return content;
    };
    return (
        <>
        {
        totalCount>pageLimit &&
        (
        <div className="flex items-center justify-between border-t mt-5 border-gray-200 px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing
                        <span className="font-medium"> {startRecord} </span>
                        to
                        <span className="font-medium"> {(totalCount < (page * pageLimit)) ? totalCount : page * pageLimit} </span>
                        of
                        <span className="font-medium"> {totalCount} </span>
                        results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Link to={`${location.pathname}?page=${page - 1}`}
                            className={`${page === 1 && 'hidden'} relative inline-flex items-center rounded-l-md border   px-2 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20`}>
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <PaginationCount />
                        <Link to={`${location.pathname}?page=${page + 1}`} className={`${page === totalPage && 'hidden'} relative inline-flex items-center rounded-r-md border px-2 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20`}>
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </nav>
                </div>
            </div>
        </div >
        )}
        </>
    )
}

export default Pagination


