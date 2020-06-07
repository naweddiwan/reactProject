import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import '../assets/css/box.css'
import '../assets/css/bootstrap.min.css'
import ModalTest from './Modal'




function FetchingData() {
    
    // States to keep for fetching api data
    const [posts, setPosts] = useState([])
    const [error, setError] = useState('')

    // States for querying API
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(5)

    // States for infinite scroll 
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(false)

    // Infinte Scroll Implementation
    const observer = useRef()
    const lastPostRef = useCallback(node => {
        if (loading)
            return
        if (observer.current)
            observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])


    // Fetching API data 
    useEffect(() => {
        setLoading(true)
        axios.get("https://api.github.com/orgs/octokit/repos", {
            params: {
                page: pageNumber,
                per_page: perPage
            }

        }).then(res => {
            console.log(res.data)
            setPosts(prevPosts => {
                return [...prevPosts, ...res.data]
            })
            setHasMore(res.data.length > 0)
            setLoading(false)

        }).catch(err => {
            setError('Error loading data')
        })

    }, [pageNumber, perPage])


    // State for Modal Open or Close 
    const [modalIsOpen, setModelisOpen] = useState(false)
    const [modalData, setModalData] = useState({})

    //  Setting isOpen Value to false to close the modal
    const CloseHandler = () => {
        setModelisOpen(false)
    }

    // On click to any item, Passing data to be viewed in modal, current state of modal(on/off) and closehandler to dismiss modal on button click
    const ClickHandler = (data) => {
        setModalData(data)
        setModelisOpen(true);
       
    }



    //  Mapping the fetched content
    const content = posts.length ? posts.map((post, index) => {

        const Details =
            <div className="textContent">
                <div >Full Name: <span> {post.full_name}</span></div>
                <div >Open Issues Count: <span>{post.open_issues_count}</span></div>
                <div >URL: <span>{post.url}</span></div>
                <div >Language: <span>{post.language}</span></div>
            </div>

        if (posts.length === index + 1) {
            return (<div
                className="item"
                key={post.id}
                ref={lastPostRef}
                onClick={() => ClickHandler(post)} >
                {Details}
            </div>)
        }
        else {
            return (<div
                className="item"
                key={post.id}
                onClick={() => ClickHandler(post)} >
                {Details}
            </div>)
        }
    }) : <div>{error}</div>

   // const modal = modalData.length?<ModalTest isOpen={modalIsOpen} dismissHandler={CloseHandler} details={modalData} />:null
    return (
        <div >
            <div className="container">
                {content}
                <div>
                    {loading && 'loading.....'}
                </div>
            </div>
            { Object.keys(modalData).length > 0 ? <ModalTest isOpen={modalIsOpen} dismissHandler={CloseHandler} details={modalData} /> : null }
        </div>
    )
}

export default FetchingData
